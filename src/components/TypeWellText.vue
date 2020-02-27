<template>
  <div class="text">
    <div class="text-line" v-for="text in state.textDataList" :key="text.key">
      <div class="prev-text">{{ text.prev }}</div>
      <div :class="{ 'cur-text': true, 'miss-text': text.missFlag }">{{
        text.cur
      }}</div>
      <div class="next-text">{{ text.next }}</div>
      <div class="invalid-text">{{ text.invalid }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive, computed } from "@vue/composition-api";
import ResultStoreKey from "./result-store-key";

type Props = {
  textDataList: {}[];
};

export default createComponent({
  props: {
    textDataList: {
      type: Array,
      default: []
    }
  },
  setup(props: Props) {
    const state = reactive({
      textDataList: computed(() => props.textDataList)
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
.text {
  @include white-block;
  margin: 1rem auto;
  width: 80rem;
  height: 20rem;
  font-size: 1.8rem;
}
.text-line {
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;

  display: flex; /* 子要素をflexboxで揃える */
  flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  justify-content: flex-start; /* 子要素をflexboxにより左に配置する */
  align-items: center; /* 子要素をflexboxにより中央に配置する */
  white-space: pre;
  word-break: break-all;
}
.prev-text {
  color: #cccccc;
  margin-left: auto;
}
.cur-text {
  color: #000000;
}
.miss-text {
  color: #ff0000;
}
.next-text {
  color: #000000;
}
.invalid-text {
  color: #cccccc;
  margin-right: auto;
}
</style>
