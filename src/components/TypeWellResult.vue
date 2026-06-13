<script setup lang="ts">
import { reactive, computed, inject } from 'vue'
import ResultStoreKey from '@/stores/result-store-key'
import { getLevelStr } from '@/lib/type-well'
import { calcUps, calcUpm } from '@/lib/typing-utils'

const resultStore = inject(ResultStoreKey)
if (!resultStore) {
  throw new Error('ResultStoreKey is not provided')
}

// TODO: romanLengthがマジックナンバーになっている
const romanLength = 400
const today = new Date().toLocaleDateString('ja-JP')

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
  rate: computed((): number => romanLength / (romanLength + state.missCount)),
  rateStr: computed((): string => (state.rate * 100).toFixed(2)),
  etypingScore: computed((): number => Math.round(state.tpm * Math.pow(state.rate, 3))),
})
</script>

<template>
  <div class="result">
    <h2>結果</h2>
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
    <div class="date">ブラウザ版タイプウェル国語R {{ today }}</div>
  </div>
</template>

<style scoped>
.result {
  h2 {
    text-align: center;
    font-size: 1.9rem;
    font-weight: 500;
  }
  p {
    font-size: 1.7rem;
    margin: 0.5rem 2rem;
  }
  li {
    font-size: 1.7rem;
    margin: 0 2rem;
  }
  .date {
    color: #ccc;
    font-size: 0.9rem;
    text-align: right;
    margin-top: 2rem;
  }
  font-family: 'M PLUS 1p', system-ui, sans-serif;
  padding: 1rem 2rem 0.5rem 2rem;
  margin: 4rem auto;
  border: double 0.5rem #a0d0f0;
  width: 30rem;
}
</style>
