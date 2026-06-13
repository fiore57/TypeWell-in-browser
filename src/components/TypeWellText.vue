<script setup lang="ts">
import type { TextData } from '@/lib/typing'
import { TEXT_LINE_NUM, TEXT_LINE_PLACEHOLDER } from '@/constants'
type Props = {
  textDataList: TextData[]
}

withDefaults(defineProps<Props>(), {
  textDataList: () => [],
})
</script>

<template>
  <div class="text">
    <div v-if="textDataList.length === 0" class="text-line" v-for="i in TEXT_LINE_NUM" :key="i">
      {{ TEXT_LINE_PLACEHOLDER }}
    </div>
    <div v-else class="text-line" v-for="text in textDataList" :key="text.key">
      <div class="prev-text">{{ text.prev }}</div>
      <div :class="{ 'cur-text': true, 'miss-text': text.missFlag }">{{ text.cur }}</div>
      <div class="next-text">{{ text.next }}</div>
      <div class="invalid-text">{{ text.invalid }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/shared' as *;
.text {
  @include white-block;
  // index.htmlでM PLUS 1p（日本語が等幅のフォント）を読み込み
  width: fit-content;
  font-family: 'M PLUS 1p', system-ui, sans-serif;
  font-size: $font-text;
  margin: 0.3rem auto;
  padding: 0.1em 0.3em;
}
.text-line {
  width: fit-content;
  padding: 0.1em;
  display: flex; // 子要素をflexboxで揃える
  flex-direction: row; // 横方向
  justify-content: flex-start; // 水平方向左揃え
  align-items: center; // 垂直方向中央揃え
  white-space: pre;
  word-break: break-all;
}
.prev-text {
  color: #cccccc;
  margin-left: auto;
}
.cur-text {
  color: black;
}
.miss-text {
  color: red;
}
.next-text {
  color: black;
}
.invalid-text {
  color: #cccccc;
  margin-right: auto;
}
</style>
