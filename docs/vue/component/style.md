# 组件的样式

## Scoped CSS

- 表示样式只会在当前组件生效，父组件的 style 将不会泄露到子组件

```vue
<style scoped>
</style>
```

局部样式的泄露，下面的例子中，虽然使用了 `scoped`，但是子组件的**根节点**会受到父组件 `style`（这是有意设计） 以及本身的 `style` 的影响。
也就是 `Sub` 的 `h4` 也会 `text-docoration: underline;`。

::: code-group

```vue [app.vue]
<script>
import Sub from 'sub.vue'
</script>
<template>
  <Sub></Sub>
</template>
<style scoped>
  h4 {
    text-docoration: underline;
  }
</style>
```

```vue [sub.vue]
<template>
  <h4> text </h3>
</template>
```

:::

但是这种情况，在子组件有多个根节点时候不存在。

vue 3 提供了 `:deep()` 在父组件中显示修改子组件的样式。

::: code-group

```vue [app.vue]
<script>
import Sub from 'sub.vue'
</script>
<template>
  <Sub></Sub>
</template>
<style scoped>
  :deep(.mgs) {
    text-docoration: underline;
  }
</style>
```

```vue [sub.vue]
<template>
  <h4 class=".msg"> text </h3>
</template>
```

:::

## CSS Modules

标签被编译为 CSS Module，并以 `$style` 被传入到组件中。

```vue
<template>
  <div :class="$style.red"></div>
</template>
<style module>
  .red {
    color: red
  }
</style>
```

## v-bind

```vue
<script setup>
const color = ref<string>('red')
</script>
<style>
.red {
  color: v-bind(color)
}
</style>
```
