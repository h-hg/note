# v-model

一种双向绑定的机制，是一种语法糖，底层采用

- v-bind 为 value 绑定属性
- v-on 绑定 DOM input 事件

```vue
<template>
  <inpit v-model="变量名" />
  <textarea v-model="变量名" />
  <select v-model="变量名">
    <option value="变量取值1"></option>
    <option value="变量取值2"></option>
    <option value="变量取值3"></option>
  </select>
</template>
```

```vue
<template>
  <!-- right: 语法糖 -->
  <input v-model="val" />
  <!-- error -->
  <input v-model="val.value" />
  <!-- error  -->
  <input v-model="val2.ref" />
  <!-- right -->
  <input v-model="val2.ref.value" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
const val = ref<string>('xxx')
const val2 = { name: 'name', ref: ref<string>('abc') }
</script>

```

## 修饰符

- `.lazy`：会将绑定事件切换为 `change` 事件
- `.number`：将输入框的值自动转为纯数字类型
- `.trim`：自动过滤掉内容首尾的空白字符串
