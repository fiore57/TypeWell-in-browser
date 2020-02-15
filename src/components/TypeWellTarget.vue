<template>
  <div class="target">
    <div class="target-meter">
      <div
        class="meter-inner-box"
        v-for="gaugeData in state.gaugeStateList"
        :style="{ 'background-color': gaugeData.color }"
        :key="gaugeData.key"
      ></div>
    </div>

    <div class="target-string">目標 -- {{ state.targetLevelStr }}</div>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  reactive,
  computed,
  inject
} from "@vue/composition-api";
import ResultStoreKey from "./result-store-key";
import ConfigStoreKey from "./config-store-key";
import { eLevel, convertLevelToString } from "@/lib/typeWell";

export default createComponent({
  setup() {
    const resultStore = inject(ResultStoreKey);
    if (!resultStore) {
      throw new Error(`${ResultStoreKey} is not provided`);
    }
    const configStore = inject(ConfigStoreKey);
    if (!configStore) {
      throw new Error(`${ConfigStoreKey} is not provided`);
    }

    const targetGaugeWidth = 20; // 目標ゲージのマスの数
    const targetGaugeTimeMs = 200; // 目標ゲージ1マスあたりのタイム

    const state = reactive({
      // 目標タイム
      targetTimeMs: computed((): number => configStore.targetTimeMs),
      // 目標レベル（文字列）
      targetLevelStr: computed((): string => {
        const targetLevel = configStore.targetLevel;
        if (targetLevel === eLevel.None) {
          return convertLevelToString(targetLevel);
        } else {
          return `${convertLevelToString(targetLevel)}（${state.targetTimeMs /
            1000} 秒）`;
        }
      }),
      // 現在のタイム
      curTimeMs: computed((): number => resultStore.timeMs),
      // 現在の打鍵数
      curTypeCount: computed((): number => resultStore.typeCount),

      // 推定タイム
      estimatedTimeMs: computed(
        (): number =>
          state.curTimeMs +
          (400 - state.curTypeCount) / (400 / state.targetTimeMs)
      ),
      // 推定タイムと現在のタイムの差
      // 正なら速く、負なら遅い
      timeDiff: computed(
        (): number => state.targetTimeMs - state.estimatedTimeMs
      ),

      // ゲージ1マスあたりの秒数
      fastTargetBoxTimeMs: computed(
        (): number => configStore.fastTargetBoxTimeMs
      ),
      slowTargetBoxTimeMs: computed(
        (): number => configStore.slowTargetBoxTimeMs
      ),

      // ゲージの各マスの色
      gaugeStateList: computed((): {}[] => {
        let ret: {}[] = [];
        for (let i = 0; i < targetGaugeWidth; ++i) {
          if (state.targetTimeMs === 0) {
            // 目標なしの場合
            ret.push({
              color: "transparent",
              key: `gaugeData${i}"`
            });
          } else if (state.timeDiff > 0) {
            // 目標より速いペースの場合
            ret.push({
              color:
                Math.abs(state.timeDiff) / state.fastTargetBoxTimeMs > i + 1
                  ? "blue"
                  : "transparent",
              key: `gaugeData${i}`
            });
          } else {
            // 目標より遅いペースの場合
            ret.push({
              color:
                Math.abs(state.timeDiff) / state.slowTargetBoxTimeMs > i + 1
                  ? i >= targetGaugeWidth / 2
                    ? "red"
                    : "yellow"
                  : "transparent",
              key: `gaugeData${i}"`
            });
          }
        }
        return ret;
      })
    });

    return {
      state
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.target {
  display: flex; /* 子要素をflexboxで揃える */
  flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  justify-content: flex-start; /* 子要素をflexboxにより左に配置する */
  align-items: center; /* 子要素をflexboxにより中央に配置する */
}
.target-meter {
  margin: 0.1rem 5rem 0.1rem 3rem;
}
.meter-inner-box {
  display: inline-block;
  width: 1.4rem;
  height: 1.5rem;
  margin: 0.1rem;
  border: 0.1rem solid;
}
.target-string {
  margin: 0.1rem 5rem;
  font-size: 1.8rem;
  color: red;
}
</style>
