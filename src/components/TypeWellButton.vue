<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue'

type Props = {
  text: string
  isValid: boolean
  keyList: readonly string[]
}

const props = withDefaults(defineProps<Props>(), {
  text: 'button',
  isValid: true,
  keyList: () => [],
})

const emit = defineEmits<{
  click: []
}>()

function onClick(): void {
  emit('click')
}

function keyInput(event: KeyboardEvent): void {
  if (!props.isValid) {
    return
  }
  // 指定のショートカットキーで発火
  for (const key of props.keyList) {
    if (event.key === key) {
      onClick()
      return
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
  <div class="type-well-button">
    <button @click="onClick" :disabled="!isValid" :class="{ disabledButton: isValid }">
      {{ text }}
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/shared' as *;
button {
  padding: 0.2rem 2rem;
  font-size: $font-timer;
  margin: 1rem 2rem;
}
</style>
