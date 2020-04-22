<template>
  <div class="result">
    <h3>結果</h3>
    <p>Time: {{ state.time }} 秒</p>
    <p>Level: {{ state.level }}</p>
    <p>Miss: {{ state.missCount }}</p>

    <div class="inline-block-list">
      <ul>
        <li>{{ state.tpmStr }} 打/分</li>
        <li>{{ state.tpsStr }} 打/秒</li>
      </ul>
    </div>

    <p>正打率: {{ state.rateStr }} %</p>
    <p>e-typing換算スコア: {{ state.etypingScore }}</p>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  reactive,
  computed,
  inject,
} from "@vue/composition-api";
import ResultStoreKey from "./result-store-key";
import { getLevelStr } from "@/lib/typeWell";
import { calcUps, calcUpm } from "@/lib/typing-utils";

type Props = {
  timeMs: number;
};

export default createComponent({
  props: {
    timeMs: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const resultStore = inject(ResultStoreKey);
    if (!resultStore) {
      throw new Error(`${ResultStoreKey} is not provided`);
    }

    // TODO: romanLengthがマジックナンバーになっている
    const romanLength = 400;

    const state = reactive({
      // 結果
      timeMs: computed(() => resultStore.timeMs),
      time: computed((): string => (state.timeMs / 1000).toFixed(3)),
      level: computed((): string => getLevelStr(state.timeMs)),
      missCount: computed((): number => resultStore.missCount),
      tpm: computed((): number => calcUpm(romanLength, state.timeMs)),
      tps: computed((): number => calcUps(romanLength, state.timeMs)),
      tpmStr: computed((): string => state.tpm.toFixed(2)),
      tpsStr: computed((): string => state.tps.toFixed(3)),
      rate: computed(
        (): number => romanLength / (romanLength + state.missCount)
      ),
      rateStr: computed((): string => (state.rate * 100).toFixed(2)),
      etypingScore: computed((): number =>
        Math.round(state.tpm * Math.pow(state.rate, 3))
      ),
    });

    return {
      state,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.result {
  h3 {
    font-size: 2rem;
    margin-top: 1rem;
  }
  p {
    font-size: 1.9rem;
    margin: 1.2rem 0;
  }
  li {
    font-size: 1.9rem;
  }
  padding: 1rem 1rem 2rem 1rem;
  margin: 4rem auto;
  border: double 0.5rem #a0d0f0;
  width: 30rem;
}
</style>
