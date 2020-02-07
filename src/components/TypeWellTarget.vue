<template>
  <div class="target">
    <div class="target-meter">
      <div class="meter-inner-box" v-for="gaugeData in state.gaugeStateList" :style="{ 'background-color': gaugeData.color }" :key="gaugeData.key">
      </div>
    </div>

    <p>{{ state.timeDiff }}</p>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive, computed, inject} from "@vue/composition-api";
import ResultStoreKey from "./result-store-key";

export default createComponent({
  setup() {
    const resultStore = inject(ResultStoreKey);
    if(!resultStore){
      throw new Error(`${ResultStoreKey} is not provided`);
    }

    const targetGaugeWidth = 20;
    const targetTimeMs = 50 * 1000;
    const targetGaugeTimeMs = 200;

    const state = reactive({
      curTimeMs: computed((): number => resultStore.timeMs),
      curTypeCount: computed((): number => resultStore.typeCount),

      estimatedTimeMs: computed((): number => state.curTimeMs + ((400) - state.curTypeCount) / (400 / targetTimeMs)),
      timeDiff: computed((): number => 50 * 1000- state.estimatedTimeMs),

      gaugeStateList: computed((): {}[] => {
        let ret: {}[] = [];
        for(let i = 0; i < targetGaugeWidth; ++i){
          if(state.timeDiff)
          if(Math.abs(state.timeDiff) / targetGaugeTimeMs > (i + 1)){
            ret.push({
              "color": (state.timeDiff > 0 ? "blue" : (i >= (targetGaugeWidth / 2) ? "red" : "yellow")),
              "key": `gaugeData${i}"`
            });
          }
          else {
            ret.push({
              "color": "transparent",
              "key": `gaugeData${i}"`
            });
          }
        }
        return ret;
      }),
    });

    return {
      state,
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.target-meter {

}
.meter-inner-box {
  display: inline-block;
  width: 1.4rem;
  height: 1.5rem;
  margin: 0.1rem;
  border: 0.1rem solid;
}
.roman {
  margin: 1rem auto;
  width: 58rem; /* 見た目用 */
  height: 21.5rem; /* 見た目用 */
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
