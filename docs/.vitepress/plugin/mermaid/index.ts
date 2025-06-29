import type { MarkdownRenderer } from "vitepress";

export default function mermaidPlugin(md: MarkdownRenderer, Options = {}) {
  const defaultFence = md.renderer.rules.fence!;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];

    if (token.info.trim() === "mermaid") {
      const code = encodeURIComponent(token.content);
      return `<Mermaid code="${code}" id="mermaid-${idx}"/>`;
    }

    return defaultFence(tokens, idx, options, env, self);
  };
}
