# 模板语法、内置命令

## 插值语法

```vue
<template>
  {{ 表达式 }}
</template>
<script>

</script>
```

## 基本命令

## v-once

```vue
<template>
  <div v-once> </div>
</template>
```

`v-once` 表示指令用于指定元素或组件只渲染一次，当数据变化时，元素或组件及其所有的子组件将被视为静态内容，跳过更新。

### v-text

```vue
<template>
  <div v-text="变量名"></div>
</template>
```

等价于

```vue
<template>
  <div> {{ 变量名 }} </div>
</template>
```

### v-html

```vue
<template>
  <div v-html="变量名"></div>
</template>
```

将字串变量的值当作 HTML 进行渲染。

### v-pre

```vue
<template>
  <div v-pre>{{ 变量名 }}</div>
</template>
```

不进行渲染，即浏览器展示 `{{ 变量名 }}`。

## v-bind

### 绑定基本属性。

```vue
<template>
  <img v-bind:src="url"></img>

  <!-- 简写为 -->
  <img :src="url"></img>

  <!-- 下面只是字符串赋值，不是变量赋值 -->
  <img src="url"></img>
</template>
```

### 绑定 class

```vue
<template>
  <img :class="变量名"></img>

  <!-- 使用对象（string 到 boolean 的 map），当 value 为 true 时，key 被绑定为 class 上 -->
  <img :class="{ 'night': 变量名, active: true }"></img>

  <!-- 绑定为数组 -->

  <img :class="[变量名, '常量值']"></img>

  <!-- 使用函数返回值 -->
  <img :class="func()"></img>
</template>
```

注意：如果有多个 class 绑定，则将这些规则生成的 class 都绑定。

### 绑定 style

用法与 class 类型，但是在使用数组绑定时，是将 `[{}, {}]` 里面多个对象都绑定到 style 上面去。

### 动态绑定属性

使用字符串变量的值来指定绑定的 HTML 元素的属性。

```vue
<template>
  <img :[变量名1]="变量名2"></img>
</template>
```

### 绑定一个对象

将一个对象的属性作为 HTML 元素的属性，值作为 HTML 元素属性的值。

```vue
<template>
  <img :="变量名"></img>
</template>
```

## v-on

绑定 DOM 事件。

```vue
<template>
  <button v-on:click="函数变量"></button>

  <!-- 简写为 -->
  <button @click="函数变量"></button>

  <!-- 其他形式 -->
  <button @click="func($event, other_args)"></button>
</template>
```

上面的 `函数变量` 支持一个有参（`event`） 或者无参函数，或者表达式。

同时 `v-on` 支持修饰符，具体见官方文档。

## 条件渲染

### v-if v-if-else v-else

根据变量的值渲染相关的组件。

```vue
<template>
  <button v-if="变量名1"></button>
  <button v-else-if="变量名2"></button>
  <button v-else></button>
</template>
```

v-if 指令时，必须将其添加到某一个元素上，例如 div 元素。
但是如果系统显示和隐藏多个元素，有两种常见方式。

1. 使用 div 包裹多个元素，然后 v-if 加到 div 上，但是这样的话 div 也会被渲染出来。
2. 使用 template 标签。

```vue
<template>
  <template v-if="变量">
    <img></img>
    <img></img>
  </template>
</template>
```

### v-show

通过 CSS 的 display 来控制 HTML 元素是否展示。

注：`v-if` 是直接从 DOM 树移除。

```vue
<template>
  <button v-show="变量"></button>
</template>
```

## 列表渲染

### v-for

```vue
<template>
  <ul>
    <!-- 遍历值 -->
    <li v-for="value in object"></li>

    <!-- 遍历键值对 -->
    <li v-for="(value, index) in object"></li>

    <!-- 遍历键值对及索引 -->
    <li v-for="(value, key, index) in object"></li>

    <!-- 遍历数字：value 从 1 开始，index 从 0 开始 -->
    <li v-for="value in number"></li>
    <li v-for="(value, index) in number"></li>

  </ul>
</template>
```

`object` 可以是数组、对象。
与 `v-if` 类似的，也可以使用 `template` 标签来实现某一块的 for。

