<script setup lang="ts">
import { computed } from 'vue'
type Props = {
  lapTimeMsList: number[]
}

const props = withDefaults(defineProps<Props>(), {
  lapTimeMsList: () => [],
})

type LapTimeData = {
  timeMs: string
  key: string
}

const lapTimeMsStrList = computed((): LapTimeData[] => {
  const ret: LapTimeData[] = []
  // TODO: マジックナンバー
  for (let i = 0; i < 8; ++i) {
    let curLapStr = ''
    if (i < props.lapTimeMsList.length) {
      const curLap =
        i == 0 ? props.lapTimeMsList[i]! : props.lapTimeMsList[i]! - props.lapTimeMsList[i - 1]!

      curLapStr = (curLap / 1000).toFixed(3)
    }
    ret.push({
      timeMs: curLapStr,
      key: `lapTimeMsList${i}`,
    })
  }
  return ret
})
</script>

<template>
  <div class="type-well-lap">
    <div class="lap" v-for="lap in lapTimeMsStrList" :key="lap.key">
      {{ lap.timeMs || '\u00a0' }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/shared' as *;
.type-well-lap {
  display: flex; // 子要素をflexboxで揃える
  gap: 1px;
  flex-direction: column; // 縦方向
  justify-content: center; // 中央に集めて配置
}
.lap {
  @include white-block;
  width: 5rem;
  margin: 0rem 0rem;
  text-align: center;
  font-size: $font-roman;
}
</style>
