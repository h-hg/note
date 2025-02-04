import { promises as fs } from "node:fs";
import path from "node:path";

interface MarkdownItem {
  space: number;
  text: string;
  link?: string;
}

function parseLine(line: string): MarkdownItem {
  const match = /^(\s*)- \[(.*)\]\((.*)\)/.exec(line);
  if (match) {
    return {
      space: match[1].length,
      text: match[2],
      link: match[3],
    };
  }

  const textMatch = /^(\s*)- (.*)/.exec(line);
  if (textMatch) {
    return {
      space: textMatch[1].length,
      text: textMatch[2],
    };
  }

  throw new Error(`Unrecognized line: ${line}`);
}

async function scanLinkedFiles(
  rootDir: string,
  pattern: RegExp[] | RegExp,
  exclusive: RegExp[] | RegExp,
): Promise<string[]> {
  const markdownFiles = await collectFiles(rootDir, pattern, exclusive);
  const nodePaths: string[] = [];
  for (const mdPath of markdownFiles) {
    const content = await fs.readFile(path.posix.join(rootDir, mdPath), {
      encoding: "utf8",
    });
    const lines = content.split(/\r?\n/).filter((line) => line.trim() !== "");

    for (const line of lines) {
      const item = parseLine(line);
      if (!item.link) continue;

      const normalizedLink = item.link.replace("\\", "/");
      let relPath = path.posix.join(mdPath, "..", normalizedLink);

      if (relPath.endsWith("/")) {
        relPath += "index.md";
      } else if (!normalizedLink.endsWith(".md")) {
        relPath += ".md";
      }

      nodePaths.push(relPath);
    }
  }
  return nodePaths.sort();
}

async function scanRealFiles(
  rootDir: string,
  inclusive: RegExp[] | RegExp,
  exclusive: RegExp[] | RegExp,
): Promise<string[]> {
  const files = await collectFiles(rootDir, inclusive, exclusive);
  return files;
}

async function collectFiles(
  rootDir: string,
  inclusive: RegExp[] | RegExp,
  exclusive: RegExp[] | RegExp,
): Promise<string[]> {
  const curDir = process.cwd();
  process.chdir(rootDir);
  if (!Array.isArray(inclusive)) {
    inclusive = [inclusive];
  }
  if (!Array.isArray(exclusive)) {
    exclusive = [exclusive];
  }
  const files: string[] = [];
  await collectFilesHelper(".", inclusive, exclusive, files);
  process.chdir(curDir);
  return files.sort();
}

async function collectFilesHelper(
  currentDir: string,
  inclusive: RegExp[],
  exclusive: RegExp[],
  files: string[],
) {
  for (const file of await fs.readdir(currentDir)) {
    let filePath = path.posix.join(currentDir, file);
    if (exclusive.some((p) => p.test(filePath))) continue;

    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await collectFilesHelper(filePath, inclusive, exclusive, files);
    } else if (inclusive.some((p) => p.test(file))) {
      files.push(filePath);
    }
  }
}

function diff(realFiles: string[], linkedFiles: string[]) {
  let i = 0,
    j = 0;
  while (i < realFiles.length && j < linkedFiles.length) {
    const res = realFiles[i].localeCompare(linkedFiles[j]);
    if (res == 0) {
      ++i;
      ++j;
    } else if (res < 0) {
      console.log(`missing link: ${realFiles[i]}`);
      ++i;
    } else {
      console.log(`dead link: ${realFiles[j]}`);
      ++j;
    }
  }
  for (; i < realFiles.length; ++i) {
    console.log(`missing link: ${realFiles[i]}`);
  }
  for (; j < linkedFiles.length; ++j) {
    console.log(`dead link: ${realFiles[j]}`);
  }
}

(async () => {
  const linkedExclusive: RegExp[] = [
    /[\\/]\.git[\\/]?/,
    /[\\/]\.vitepress[\\/]?/,
    /^index\.md$/,
  ];
  const realExclusive = linkedExclusive
    .map((elem) => elem)
    .concat([/[\\/]?sidebar\.md$/, /[\\/]?navbar\.md$/]);

  const docs = "./docs";

  const realFiles = await scanRealFiles(docs, /\.md$/, realExclusive);
  const linkedFiles = await scanLinkedFiles(
    docs,
    [/sidebar\.md$/, /navbar\.md$/],
    linkedExclusive,
  );
  diff(realFiles, linkedFiles);
})();
