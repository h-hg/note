import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import Mermaid from "../plugin/mermaid/Mermaid.vue";
import Dot from "../plugin/graphviz/Dot.vue";
// import PlantUML from "../plugin/plantuml/PlantUML.vue";
import "./picture.css";
import "pseudocode/build/pseudocode.min.css";

export default <Theme>{
  extends: DefaultTheme,
  enhanceApp: async ({ app }) => {
    app.component("Mermaid", Mermaid);
    app.component("Dot", Dot);
    // app.component("PlantUML", PlantUML);
  },
};
