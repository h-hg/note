import type { MarkdownRenderer } from "vitepress";
import pseudocode from "pseudocode";

export default function algoPlugin(md: MarkdownRenderer, Options = {}) {
  const defaultFence = md.renderer.rules.fence!;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];

    if (token.info.trim() === "algo") {
      try {
        const html = pseudocode.renderToString(token.content);
        return `<div class="pseudocode-container">${html}</div>`;
      } catch (e) {
        return `<pre class="language-error"><code>Error rendering pseudocode: ${e.message}</code></pre>`;
      }
      // const code = encodeURIComponent(token.content);
      // return `<algo code="${code}" id="algo-${idx}"/>`;
    }

    return defaultFence(tokens, idx, options, env, self);
  };
}
