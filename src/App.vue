<template>
  <div id="app">
    <h2>{{ title }}</h2>
    <p class="warn">{{ description }}</p>

    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <TypeWellProvider>
      <TypeWell msg="test" />
    </TypeWellProvider>
    <Help />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
} from "@vue/composition-api";
import TypeWell from "./components/TypeWell.vue";
import TypeWellProvider from "./components/TypeWellProvider.vue";
import Help from "./components/Help.vue";

export default defineComponent({
  components: {
    TypeWell,
    TypeWellProvider,
    Help,
  },
  setup() {
    // 非リアクティブ
    const title = "ブラウザ版 タイプウェル国語R";
    const description = "※このアプリは非公式です";

    function keyInput(event: KeyboardEvent) {
      const ignoreKeyList: string[] = [" ", "F1", "F2", "F3", "F4"];
      for (const ignoreKey of ignoreKeyList) {
        if (event.key === ignoreKey) {
          event.preventDefault(); // デフォルトアクションを止める
        }
      }
    }

    onBeforeMount(() => {
      window.addEventListener("keydown", keyInput, true);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("keydown", keyInput, true);
    });

    return {
      title,
      description,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/style.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.warn {
  color: red;
  font-weight: bold;
}
</style>
