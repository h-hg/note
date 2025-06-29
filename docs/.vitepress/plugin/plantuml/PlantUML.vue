<!-- .vitepress/theme/PlantUML.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { encode } from 'plantuml-encoder';

const props = defineProps<{
  code: string;
}>();

const { isDark } = useData();

// 计算最终的 PlantUML 图片 URL
const plantumlUrl = computed(() => {
  // 1. 解码从 markdown 插件传递过来的 code
  const decodedCode = decodeURIComponent(props.code);

  // 2. 根据深色模式，在源码前部注入主题指令
  //    !theme puml-dark 是一个不错的深色主题
  const themeDirective = isDark.value ? `!theme puml-dark\n` : '';
  const finalCode = themeDirective + decodedCode;
  
  // 3. 使用 plantuml-encoder 对最终代码进行编码
  const encodedCode = encode(finalCode);

  // 4. 构建完整的请求 URL
  //    我们使用官方的渲染服务器，并请求 SVG 格式
  return `https://www.plantuml.com/plantuml/svg/${encodedCode}`;
});

</script>

<template>
  <div class="plantuml-container">
    <img :src="plantumlUrl" alt="PlantUML Diagram" />
  </div>
</template>

<style scoped>
.plantuml-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  overflow-x: auto; /* 如果图表过宽，允许水平滚动 */
  padding: 1rem;
  background-color: var(--vp-code-block-bg);
}

.plantuml-container img {
  max-width: 100%;
  object-fit: contain;
}
</style>