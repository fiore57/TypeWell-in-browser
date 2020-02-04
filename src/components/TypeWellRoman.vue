<template>
  <div class="roman">
    <div class="roman-line" v-for="roman in state.romanDataList" :key="roman.key">
      <div class="prev-roman">{{ roman.prev }}</div>
      <div :class="{ 'cur-roman': true, 'miss-roman': roman.missFlag }">{{ roman.cur }}</div>
      <div class="next-roman">{{ roman.next }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive, computed, inject} from "@vue/composition-api";
import ResultStoreKey from "./result-store-key";

type Props = {
  romanDataList: [{}];
}

export default createComponent({
  props: {
    romanDataList: {
      type: Array,
      default: []
    }
  },
  setup(props: Props) {
    const resultStore = inject(ResultStoreKey);
    if(!resultStore){
      throw new Error(`${ResultStoreKey} is not provided`);
    }

    const state = reactive({
      romanDataList: computed(() => props.romanDataList)
    });

    return {
      state,
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.roman {
  margin: 1rem auto;
  width: 58rem;
  height: 21.5rem;
  border: 0.1rem solid;
  border-color: gray;
  font-size: 1.8rem;
  font-family: 'Noto Sans Mono', sans-serif;
  background: white;
}
.roman-line {
  margin: 0.2rem 1rem;
  display: flex; /* 子要素をflexboxで揃える */
  flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  justify-content: flex-start; /* 子要素をflexboxにより左に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
  white-space: pre;
  word-break: break-all;
}
.prev-roman {
  color: #CCCCCC;
  margin-left: auto;
}
.cur-roman{
  color: black;
}
.miss-roman{
  color: red;
}
.next-roman {
  color: black;
  margin-right: auto;
}
</style>
