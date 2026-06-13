<script setup lang="ts">
import { inject } from 'vue'
import type { RomanData } from '@/lib/typing'
import ResultStoreKey from '@/stores/result-store-key'
import { ROMAN_LINE_NUM, ROMAN_LINE_PLACEHOLDER } from '@/constants'

type Props = {
  romanDataList: RomanData[]
}
defineProps<Props>()

const resultStore = inject(ResultStoreKey)
if (!resultStore) {
  throw new Error('ResultStoreKey is not provided')
}
</script>

<template>
  <div class="roman">
    <div v-if="romanDataList.length === 0" class="roman-line" v-for="i in ROMAN_LINE_NUM" :key="i">
      {{ ROMAN_LINE_PLACEHOLDER }}
    </div>
    <div v-else class="roman-line" v-for="roman in romanDataList" :key="roman.key">
      <div class="prev-roman">{{ roman.prev }}</div>
      <div :class="{ 'cur-roman': true, 'miss-roman': roman.missFlag }">{{ roman.cur }}</div>
      <div class="next-roman">{{ roman.next }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/shared' as *;
.roman {
  @include roman;
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
