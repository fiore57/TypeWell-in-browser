<template>
  <!--<div class="result" v-if="state.inResult">-->
  <div class="result">
    <h3>結果</h3>
    <p>Time: {{ state.time }} 秒</p>
    <p>Level: {{ state.level }}</p>
    <p>Miss: {{ state.missCount }}</p>

    <div class="inline-block-list">
      <ul>
        <li>{{ state.tpm }} 打/分</li>
        <li>{{ state.tps }} 打/秒</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive, computed, inject, onBeforeMount, onBeforeUnmount} from "@vue/composition-api";
import ResultStoreKey from "./result-store-key";
import { getLevelStr } from '@/lib/typeWell';

type Props = {
  timeMs: number;
}

export default createComponent({
  props: {
    timeMs: {
      type: Boolean,
      default: false
    }
  },
  setup(props: Props) {
    const resultStore = inject(ResultStoreKey);
    if(!resultStore){
      throw new Error(`${ResultStoreKey} is not provided`);
    }

    const state = reactive({
      // 結果
      timeMs: computed(() => resultStore.timeMs),
      time: computed((): string => (state.timeMs / 1000).toFixed(3)),
      level: computed((): string => getLevelStr(state.timeMs)),
      missCount: computed((): number => resultStore.missCount),
      m_tpm: computed((): number => state.m_tps * 60),
      // TODO: romanLengthがマジックナンバーになっている
      m_tps: computed((): number => (state.timeMs === 0 ? 0 : 400 / state.timeMs * 1000)),
      tpm: computed((): string => state.m_tpm.toFixed(2)),
      tps: computed((): string => state.m_tps.toFixed(3)),
    })

    return {
      state,
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.result {
  h3{
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
  border: double 0.5rem #A0D0F0;
  width: 30rem;
}
</style>
