<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue'
import TypeWell from './components/TypeWell.vue'
import TypeWellProvider from './components/TypeWellProvider.vue'
import TypeWellHelp from './components/TypeWellHelp.vue'

function keyInput(event: KeyboardEvent) {
  const ignoreKeyList: string[] = [' ', 'F1', 'F2', 'F3', 'F4']
  for (const ignoreKey of ignoreKeyList) {
    if (event.key === ignoreKey) {
      event.preventDefault() // デフォルトアクションを止める
    }
  }
}

onBeforeMount(() => {
  window.addEventListener('keydown', keyInput, true)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', keyInput, true)
})
</script>

<template>
  <header class="app-header">
    <h1>ブラウザ版 タイプウェル国語R</h1>
    <p class="warn">※このアプリは非公式です</p>
  </header>

  <main class="app">
    <TypeWellProvider>
      <TypeWell msg="test" />
    </TypeWellProvider>

    <TypeWellHelp />
  </main>
</template>

<style scoped lang="scss">
.app-header {
  text-align: center;
}
.warn {
  color: red;
  font-weight: bold;
}
</style>
