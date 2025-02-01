# 组件通信

## 父子组件通信

### props

:::code-group

```vue [Sub1.vue]
<template>
<div>{{title}} - {{content}}</div>
</template>
<script>
export default {
  props: ['title', 'content']
}
</script>
```

```vue [Sub2.vue]
<template>
<div>{{title}} - {{content}}</div>
</template>
<script>
export default {
  props: {
    title: String,
    content: {
      type: String,
      required: true,
      default: ""
    }
  }
}
</script>
```

```vue [App.vue]
<template>
  <!-- method 1 -->
  <Sub1 :title="title" :content="content"></Sub1>
  <!-- method 2 -->
  <Sub1 v-model="obj"></Sub1>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      obj: {
        title: '',
        content: '',
      }
    }
  }
}
</script>
```

:::

属性继承：父组件还经常为子组件传递 id、class 等属性。

:::code-group

```vue [Sub.vue]
<template>
<div>会继承 test 的 class</div>
</template>
```

```vue [App.vue]
<template>
<Sub class="test"></Sub>
</template>
```

### emits

1. 子组件定义触发事件名称，例如 emits["add"]
2. 父组件中，以 v-on 的方式传入要监听的事件名称，并绑定到对应的方法中，如`@add="addCallBack`
3. 在子组件中发生事件时，根据事件名称，使用 `$emit` 函数出发对应的事件，如 `this.emit("add", 1)`


:::code-group

```vue [Sub.vue]
<template>
<button @click="increment">+1</button>
</template>
<script>
export default {
  emits: ["add"]
  methods: {
    increment() {
      this.$emit("add", 10)
    }
  }
}
</script>
```

```vue [App.vue]
<template>
  <div>{{ counter }}</div>
  <Sub @add="addCallBack"></Sub>
</template>
<script>
export default {
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    addCallBack(val) {
      this.counter += val;
    }
  }
}
</script>
```

:::

同时 `emits` 支持对象写法，对 $this.emits$ 的参数进行校验。

```vue [Sub.vue]
<template>
<button @click="increment">+1</button>
</template>
<script>
export default {
  emits: {
    add: (num) => {
      return num < 10
    }
  }
  methods: {
    increment() {
      this.$emit("add", 10) // num < 10 失败，console 出现警告
    }
  }
}
</script>
```

## 非父子组件的相互通信

例如用于组件树木（祖孙组件）等通信，不支持兄弟组件通信。

### provide/inject

:::code-group

```vue [App.vue]
<template>
<div>
  <Sub></Sub>
</div>
</template>
<script>
export default {
  provide: {
    title: "",
    contetn: ""
  }
}
<script>
```

```vue [Sub.vue]
<template>
<SubSub><SubSub>
<template>
```

```vue [SubSub.vue]
<template>
<div>
  {{title}} - {{content}}
</div>
</template>
<script>
export default {
  inject: ["title", "content"]
}
</script>
```

:::


如果想要传递响应数据

:::code-group

```vue [App.vue]
<template>
<div @click="update">
  <Sub></Sub>
</div>
</template>
<script>
export default {
  provide() {
    return {
      title: this.title
      content: this.content
    }
  },
  data(): {
    return {
      title: "",
      content: ""
    }
  },
  methods: {
    update() {
      title = "a"
    }
  }
}
<script>
```

```vue [Sub.vue]
<template>
<SubSub><SubSub>
<template>
```

```vue [SubSub.vue]
<template>
<div>
  {{title}} - {{content}}
</div>
</template>
<script>
export default {
  inject: ["title", "content"],
}
</script>
```

:::