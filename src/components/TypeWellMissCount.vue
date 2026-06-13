<script setup lang="ts">
type Props = {
  missCount: number
}

withDefaults(defineProps<Props>(), {
  missCount: 0,
})
</script>

<template>
  <div class="miss-count">Miss: {{ missCount }}</div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/shared' as *;
.miss-count {
  margin: 0.2rem 3rem 0.2rem auto;
  font-size: $font-miss-count;
}
</style>
