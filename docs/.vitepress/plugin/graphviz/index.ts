import type { MarkdownRenderer } from "vitepress";

export default function dotPlugin(md: MarkdownRenderer, Options = {}) {
  const defaultFence = md.renderer.rules.fence!;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];

    if (token.info.trim() === "dot") {
      const code = encodeURIComponent(token.content);
      console.log(code);
      return `<Dot code="${code}" id="dot-${idx}"/>`;
    }

    return defaultFence(tokens, idx, options, env, self);
  };
}
