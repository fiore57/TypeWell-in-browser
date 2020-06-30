<template>
  <div class="type-well-lap">
    <div class="lap" v-for="lap in state.lapTimeMsStrList" :key="lap.key">
      {{ lap.timeMs }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "@vue/composition-api";

type Props = {
  lapTimeMsList: number[];
};

export default defineComponent({
  props: {
    lapTimeMsList: {
      type: Array,
      default: [],
    },
  },
  setup(props: Props) {
    const state = reactive({
      lapTimeMsStrList: computed(() => {
        let ret: {}[] = [];
        // TODO: マジックナンバー
        for (let i = 0; i < 8; ++i) {
          let curLapStr = "";
          if (i < props.lapTimeMsList.length) {
            const curLap =
              i == 0
                ? props.lapTimeMsList[i]
                : props.lapTimeMsList[i] - props.lapTimeMsList[i - 1];

            curLapStr = (curLap / 1000).toFixed(3);
          }
          ret.push({
            timeMs: curLapStr,
            key: `lapTimeMsList${i}`,
          });
        }
        return ret;
      }),
    });

    return {
      state,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/variable.scss";
.type-well-lap {
  height: $roman-block-height;
  display: flex; // 子要素をflexboxで揃える
  flex-direction: column; // 縦方向
  justify-content: space-between; // 縦方向に広げて配置
}
.lap {
  @include white-block;
  width: 8rem;
  height: 2.3rem;
  font-size: 1.6rem;
  padding: 0.3rem;
}
</style>
