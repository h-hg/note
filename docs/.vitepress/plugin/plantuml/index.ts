import type { MarkdownRenderer } from "vitepress";

export default function plantumlPlugin(md: MarkdownRenderer) {
  const defaultFence = md.renderer.rules.fence!;

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];

    if (token.info.trim() === "plantuml") {
      const code = encodeURIComponent(token.content);
      return `<PlantUML code="${code}" id="plantuml-${idx}"/>`;
    }

    return defaultFence(tokens, idx, options, env, self);
  };
}
