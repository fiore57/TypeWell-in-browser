<script setup lang="ts">
import { provide, onMounted, ref } from 'vue'

import resultStore from '@/stores/result-store'
import configStore from '@/stores/config-store'
import ResultStoreKey from '@/stores/result-store-key'
import ConfigStoreKey from '@/stores/config-store-key'
import TypingWords from '@/lib/word'

const isLoaded = ref(false)
const isLoadFailed = ref(false)

provide(ResultStoreKey, resultStore())
provide(ConfigStoreKey, configStore())

// 初回読み込み時に単語データを読み込む
onMounted(async () => {
  try {
    await TypingWords.load()
    isLoaded.value = true
  } catch (error) {
    console.error(error)
    isLoadFailed.value = true
  }
})
</script>

<template>
  <slot v-if="isLoaded" />
  <p v-else-if="isLoadFailed">単語データの読み込みに失敗しました</p>
  <p v-else>Loading...</p>
</template>
