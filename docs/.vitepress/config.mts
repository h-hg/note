import { defineConfig, type DefaultTheme } from "vitepress";
import path from "node:path";
import url from "url";
import { figure } from "@mdit/plugin-figure";
// import { footnote } from "@mdit/plugin-footnote";
import { mark } from "@mdit/plugin-mark";
import { sub } from "@mdit/plugin-sub";
import { sup } from "@mdit/plugin-sup";
import { tasklist } from "@mdit/plugin-tasklist";
// import { katex } from "@mdit/plugin-katex";
import { parseMd, scanMdFiles } from "vitepress-parse-bar";
import mermaidPlugin from "./plugin/mermaid/index.ts";
import dotPlugin from "./plugin/graphviz/index.ts";
import plantumlPlugin from "./plugin/plantuml/index.ts";
import algoPlugin from "./plugin/pseudocode/index.ts";

const __filename = url.fileURLToPath(new url.URL(import.meta.url));
const workspace = path.resolve(__filename, "..", "..");
const base = "/note";

export default defineConfig({
  lang: "zh-Hans",
  title: "好干的小屋",
  description: "学海无涯",
  base: base,
  srcExclude: ["**/sidebar.md", "**/navbar.md"],
  lastUpdated: true,
  markdown: {
    math: true,
    config: (md) => {
      md.use(figure);
      // md.use(footnote);
      md.use(mark);
      md.use(sup);
      md.use(sub);
      md.use(tasklist);
      // md.use(katex);
      md.use(mermaidPlugin, {});
      md.use(dotPlugin);
      // md.use(plantumlPlugin);
      md.use(algoPlugin);
      // const defaultRender = md.renderer.rules.fence;

      // md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      //   const token = tokens[idx];

      //   if (token.info.trim() === "mermaid") {
      //     return `<Mermaid id="mermaid-${idx}" code="${encodeURIComponent(token.content)}" />`;
      //   }

      //   return defaultRender(tokens, idx, options, env, self);
      // };
    },
    image: {
      lazyLoading: true,
    },
  },
  themeConfig: {
    nav: parseMd(path.join(workspace, "navbar.md")),
    sidebar: scanMdFiles(workspace, "/", "sidebar.md"),
    socialLinks: [{ icon: "github", link: "https://github.com/h-hg" }],
    search: {
      provider: "local",
      options: searchOptions(),
    },
    editLink: {
      pattern: "https://github.com/h-hg/note/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      message: "基于 Apache 2.0 许可发布",
      copyright: `版权所有 © 2017-${new Date().getFullYear()} HunterHwang`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      level: "deep",
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
    },

    notFound: {
      title: "页面未找到",
      quote:
        "但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。",
      linkLabel: "前往首页",
      linkText: "带我回首页",
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    skipToContentLabel: "跳转到内容",
  },
});

function searchOptions(): Partial<DefaultTheme.AlgoliaSearchOptions> {
  return {
    placeholder: "搜索文档",
    translations: {
      button: {
        buttonText: "搜索文档",
        buttonAriaLabel: "搜索文档",
      },
      modal: {
        searchBox: {
          resetButtonTitle: "清除查询条件",
          resetButtonAriaLabel: "清除查询条件",
          cancelButtonText: "取消",
          cancelButtonAriaLabel: "取消",
        },
        startScreen: {
          recentSearchesTitle: "搜索历史",
          noRecentSearchesText: "没有搜索历史",
          saveRecentSearchButtonTitle: "保存至搜索历史",
          removeRecentSearchButtonTitle: "从搜索历史中移除",
          favoriteSearchesTitle: "收藏",
          removeFavoriteSearchButtonTitle: "从收藏中移除",
        },
        errorScreen: {
          titleText: "无法获取结果",
          helpText: "你可能需要检查你的网络连接",
        },
        footer: {
          selectText: "选择",
          navigateText: "切换",
          closeText: "关闭",
          searchByText: "搜索提供者",
        },
        noResultsScreen: {
          noResultsText: "无法找到相关结果",
          suggestedQueryText: "你可以尝试查询",
          reportMissingResultsText: "你认为该查询应该有结果？",
          reportMissingResultsLinkText: "点击反馈",
        },
      },
    },
  };
}
