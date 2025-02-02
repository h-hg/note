import { defineConfig } from 'vitepress'
import path from 'node:path'
import url from 'url'
import { parseMd, scanMdFiles } from 'vitepress-parse-bar'

const __filename = url.fileURLToPath(new url.URL(import.meta.url));
const workspace = path.resolve(__filename, '..', '..');
const base = '/note'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-Hans',
  title: "好干的小屋",
  description: "学海无涯",
  base: base,
  srcExclude: [
    '**/sidebar.md',
    '**/navbar.md'
  ],
  lastUpdated: true,
  themeConfig: {
    nav: parseMd(path.join(workspace, 'navbar.md')),
    sidebar: scanMdFiles(workspace, '/', 'sidebar.md'),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/h-hg' }
    ],
    search: {
      provider: 'local'
    },
  }
})
