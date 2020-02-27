<template>
  <div class="roman">
    <div
      class="roman-line"
      v-for="roman in state.romanDataList"
      :key="roman.key"
    >
      <div class="prev-roman">{{ roman.prev }}</div>
      <div :class="{ 'cur-roman': true, 'miss-roman': roman.missFlag }">{{
        roman.cur
      }}</div>
      <div class="next-roman">{{ roman.next }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  reactive,
  computed,
  inject
} from "@vue/composition-api";
import ResultStoreKey from "./result-store-key";

type Props = {
  romanDataList: [{}];
};

export default createComponent({
  props: {
    romanDataList: {
      type: Array,
      default: []
    }
  },
  setup(props: Props) {
    const resultStore = inject(ResultStoreKey);
    if (!resultStore) {
      throw new Error(`${ResultStoreKey} is not provided`);
    }

    const state = reactive({
      romanDataList: computed(() => props.romanDataList)
    });

    return {
      state
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/variable.scss";
.roman {
  @include white-block;
  margin: 1rem;
  width: 58rem;
  height: $roman-block-height;
  font-size: 1.8rem;
  font-family: "Noto Sans Mono", sans-serif;
  display: flex; // 子要素をflexboxで揃える
  flex-direction: column; // 縦方向
  justify-content: space-between; // 縦方向に広げて配置
}
.roman-line {
  margin: 0 0 0.1rem 0;
  display: flex; // 子要素をflexboxで揃える
  flex-direction: row; // 横方向
  justify-content: flex-start; // 水平方向左
  align-items: center; // 垂直方向中央
  white-space: pre;
  word-break: break-all;
}
.prev-roman {
  color: #cccccc;
  margin-left: auto;
}
.cur-roman {
  color: black;
}
.miss-roman {
  color: red;
}
.next-roman {
  color: black;
  margin-right: auto;
}
</style>
