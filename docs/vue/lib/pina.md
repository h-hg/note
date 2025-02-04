# Pina

## 例子

::: code-group

```ts [src/main.ts]
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
const app = createApp(App);
app.use(createPinia());
app.mount("#app");
```

```ts [src/stores/user.ts]
import { defineStore } from "pinia";

interface State {
  firstName: string;
  lastName: string;
}

const userStore = defineStore("user", {
  state: (): State => {
    return {
      firstName: "",
      lastName: "",
    };
  },
  getters: {
    name: (state: State) => state.firstName + "-" + state.lastName,
  },
  actions: {
    setName(name: string) {
      [this.firstName, this.lastName] = name.split("-");
    },
  },
});

export default userStore;
```

```vue [TestView.vue]
<template>
  {{ userStore.name }}

  {{ userStore.firstName }} - {{ userStore.lastName }}
</template>

<script setup lang="ts">
import useUserStore from "@/stores/user.ts";
const userStore = useUserStore();
userStore.setName("xing-ming");
</script>
```

:::

可以采用组合式来定义 src/stores/user.ts

```ts
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const userStore = defineStore("user", () => {
  const firstName = ref("");
  const lastName = ref("");

  const name = computed(() => {
    return firstName.value + "-" + lastName.value;
  });

  function setName(name: string) {
    [firstName.value, lastName.value] = name.split("-");
  }

  return { firstName, lastName, name, setName };
});
export default userStore;
```

## pinia-plugin-persistedstate

::: code-group

```ts [src/main.ts]
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
```

```ts [选项式]
import { defineStore } from "pinia";

interface State {
  firstName: string;
  lastName: string;
}

const userStore = defineStore("user", {
  state: (): State => {
    return {
      firstName: "",
      lastName: "",
    };
  },
  getters: {
    name: (state: State) => state.firstName + "-" + state.lastName,
  },
  actions: {
    setName(name: string) {
      [this.firstName, this.lastName] = name.split("-");
    },
  },
  persist: {
    pick: ["firstName"], // 只持久化 firstName
    storage: localStorage, // 使用 localStorage 持久化
  },
});

export default userStore;
```

```ts [组合式]
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const userStore = defineStore(
  "user",
  () => {
    const firstName = ref("");
    const lastName = ref("");

    const name = computed(() => {
      return firstName.value + "-" + lastName.value;
    });

    function setName(name: string) {
      [firstName.value, lastName.value] = name.split("-");
    }

    return { firstName, lastName, name, setName };
  },
  {
    persist: {
      pick: ["firstName"], // 只持久化 firstName
      storage: localStorage, // 使用 localStorage 持久化
    },
  },
);
export default userStore;
```

:::

如果遇到 VSCode 提示 defineStore 类型不对的话，可以添加如下配置。

:::code-group

```ts [src/types/pinia.d.ts]
import "pinia";
import { PersistedStateOptions } from "pinia-plugin-persistedstate";

declare module "pinia" {
  export interface DefineStoreOptionsBase<S, Store> {
    // 添加 persist 选项的类型
    persist?: boolean | PersistedStateOptions;
  }
}
```

:::
