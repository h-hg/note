# 组件化

## 注册组件

### 全局注册

```html
<body>
  <div id="app"></div>
  <!-- 使用全局组件 -->
  <my-compoent></my-component>
  <template id="global-comp">
    <div> {{ message }} </div>
  </template>
</body>
<script>
  const App = {
    template: 'my-app',
    data() {
    },
  }
  const app = Vue.createApp(App)
  // 注册全局组件
  app.component("my-component", { // 全局组件的名称
    template: '#global-comp',     // 全局组件的定义，上面那个 template 标签
    data() {
      return {
        message: ''
      }
    }
  })
  app.mount('#app')
</script>
```

- 程序启动时，全局组件都会被注册，即使没有使用。
- webpack 等打包时，即使没有用到，也会被打包。

### 局部组件

- 注册的组件只能在当前组件的模板使用

```html
<body>
  <div id="app"></div>
  <!-- 使用全局组件 -->
  <my-compoent></my-component>
  <template id="local-comp">
    <div> {{ message }} </div>
  </template>
</body>
<script>
  const MyComp = {
    template: '#local-comp',
    data() {
      return {
       message: ''
      }
    }
  }
  const App = {
    template: 'my-app',
    components: {
      // 组件名 : 组件对象
      'my-component': MyComp
    },
    data() {
    },
  }
  const app = Vue.createApp(App)
  // 注册全局组件
  app.component("my-component", { // 全局组件的名称
    template: '#global-comp',     // 全局组件的定义，上面那个 template 标签
  })
  app.mount('#app')
</script>
```

## SFC

SFC = Single-File Components，即一个 `.vue`。

