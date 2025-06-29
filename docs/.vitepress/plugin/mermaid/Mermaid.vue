<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useData } from 'vitepress';
import mermaid from 'mermaid';

const props = defineProps<{
  id: string;
  code: string;
}>();

const { isDark } = useData();
const svgCode = ref('');
const errorMessage = ref('');

const renderDiagram = async () => {
  try {
    
    // SSR: only execute on client
    if (typeof window !== 'undefined') {
      
      mermaid.initialize({ 
        theme: isDark.value ? 'dark' : 'default',
        securityLevel: 'loose',
        startOnLoad: false,
        fontFamily: 'inherit',
        flowchart: {
          useMaxWidth: true,
        },
        er: {
          useMaxWidth: true,
        },
        sequence: {
          useMaxWidth: true,
        },
      });
      
      const { svg } = await mermaid.render(props.id, decodeURIComponent(props.code));
      svgCode.value = svg;
      errorMessage.value = '';
    }
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
  <div class="mermaid-container">
    <div v-if="errorMessage" class="error">
      Mermaid Diagram Error: <br/>
      {{ errorMessage }}
    </div>
    <div v-else v-html="svgCode"></div>
  </div>
</template>

<style scoped>
.mermaid-container {
  margin: 1rem 0;
  padding: 1rem;
  overflow: auto;
}

.error {
  color: red;
}


</style>