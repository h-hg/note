
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useData } from 'vitepress';
import { instance } from '@viz-js/viz';

const props = defineProps<{
  id: string;
  code: string;
}>();

const { isDark } = useData();
const svgCode = ref('');
const errorMessage = ref('');


const renderDiagram = async () => {
  try {
    if (typeof window === 'undefined') return;
    const viz = await instance()
    const dotCode = decodeURIComponent(props.code);

    svgCode.value = viz.renderSVGElement(dotCode).outerHTML;

    errorMessage.value = '';
  } catch (e) {
    console.error('DOT rendering error:', e);
    errorMessage.value = e.message;
  }
};

watch(isDark, renderDiagram);

watch(() => props.code, renderDiagram);

onMounted(() => {
  renderDiagram();
});

</script>

<template>
  <div class="dot-container">
    <div v-if="errorMessage" class="error">
      DOT Diagram Error: {{ errorMessage }}
    </div>
    <div v-else v-html="svgCode"></div>
  </div>
</template>

<style scoped>
.dot-container {
  margin: 1rem 0;
  padding: 1rem;
  overflow: auto;
}

.error {
  color: red;
}
</style>