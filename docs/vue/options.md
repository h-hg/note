# options API

## computed

计算属性，与其他方法相比，它是有缓存的，当多次使用计算属性时，只会被计算一次，只有当依赖项被改变时，才会被重新计算。

```vue
<template>
  <div>{{ firstName + lastName }}</div>
  <div>{{ getFullName() }}</div>
  <div>{{ fullName }}</div>
</template>
<script>
  const App = {
    data() {
      return {
        firtName: 'firstName',
        lastName: 'lastName'
      }
    },
    methods: {
      getFullName() {
        return fistName + lastName;
      }
    },
    computed: {
      fullName() {
        return firstName + lastName;
      }
    }
  }
</script>
```

计算属性也支持 `getter` 和 `setter` 方法。

```vue
<script>
  const App = {
    computed: {
      fullName: {
        get: function() {
          
        },
        set: function(newValue) {
          
        }
      }
    }
  }
</script>
```

## watch

在某些情况下，需要监听某个响应式数据的变化，可以使用监听器（watch）来实现。

```vue
<script>
  const App = {
    data() {
      return {
        name: 'name'
      }
    },
    watch: {
      name: function(newValue, oldValue) {
        // ...
      },
      // 等价于
      function name(newValue, oldValue) {

      }
    }
  }
</script>
```

配置语法

```vue
<script>
  const App = {
    watch: {
        name: {
          handler: function(newValue, oldValue) {

          },
          deep: false, // 是否监听对象的属性变化
          immediate: false, // 是否立即执行回调函数
        }
    }
  }
</script>
```

监听对象的某个属性

```vue
<script>
  const App = {
    data() {
      return {
        info: { name: 'name'}
      }
    }
    watch: {
        "info.name": {
          handler: function(newValue, oldValue) {

          },
          deep: false, // 是否监听对象的属性变化
          immediate: false, // 是否立即执行回调函数
        }
    }
  }
</script>
