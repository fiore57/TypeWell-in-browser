<template>
  <div class="config">
    <h3>設定</h3>
    <ul>
      <li>
        カウントダウン（1～3秒）：
        <input
          class="number-input"
          v-model.number="state.countdownTime"
          type="number"
          min="1"
          max="3"
          step="1"
        />秒
      </li>
      <li>
        目標設定：
        <select v-model="state.targetLevel">
          <option disabled value="">目標レベル</option>
          <option v-for="levelData in levelDataList" :key="levelData.key">{{
            levelData.value
          }}</option>
        </select>
      </li>
      <li>
        ミス上限（0～255回）：
        <input
          class="number-input"
          v-model.number="state.missMax"
          type="number"
          min="0"
          max="255"
          step="1"
        />回
      </li>
      <li>
        目標インジケーター（青）：
        <input
          class="number-input"
          v-model.number="state.fastTargetBoxTime"
          type="number"
          min="0.01"
          max="10.00"
          step="0.01"
        />秒
      </li>
      <li>
        目標インジケーター（黄・赤）：
        <input
          class="number-input"
          v-model.number="state.slowTargetBoxTime"
          type="number"
          min="0.01"
          max="10.00"
          step="0.01"
        />秒
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  inject,
} from "@vue/composition-api";
import { eLevel, convertLevelToEnum, levelDataList } from "@/lib/typeWell";
import ConfigStoreKey from "./config-store-key";
import { clamp, step } from "@/lib/utils";

export default defineComponent({
  setup() {
    const configStore = inject(ConfigStoreKey);
    if (!configStore) {
      throw new Error(`${ConfigStoreKey} is not provided`);
    }

    const state = reactive({
      // カウントダウンの秒数（1以上3以下）
      countdownTime: computed({
        get: (): number => {
          return configStore.countdownTime;
        },
        set: (newVal: number) => {
          newVal = step(clamp(newVal, 1, 3), 1);
          configStore.setCountdownTime(newVal);
        },
      }),
      // 目標レベル
      targetLevel: computed({
        get: (): string => {
          return eLevel[configStore.targetLevel];
        },
        set: (newLevelStr: string) => {
          const enumTargetLevel: eLevel = convertLevelToEnum(newLevelStr);
          configStore.setTargetLevel(enumTargetLevel);
        },
      }),
      // ミスの上限回数（0以上255以下）
      missMax: computed({
        get: (): number => {
          return configStore.missMax;
        },
        set: (newVal: number) => {
          newVal = step(clamp(newVal, 0, 255), 1);
          configStore.setMissMax(newVal);
        },
      }),
      // 目標ゲージ（青）の秒数
      // ミリ秒ではない！！！
      fastTargetBoxTime: computed({
        get: (): number => {
          return configStore.fastTargetBoxTimeMs / 1000;
        },
        set: (time: number) => {
          let timeMs = time * 1000;
          timeMs = step(clamp(timeMs, 10, 10 * 1000), 10);
          configStore.setFastTargetBoxTimeMs(timeMs);
        },
      }),
      // 目標ゲージ（黄・赤）の秒数
      // ミリ秒ではない！！！
      slowTargetBoxTime: computed({
        get: (): number => {
          return configStore.slowTargetBoxTimeMs / 1000;
        },
        set: (time: number) => {
          let timeMs = time * 1000;
          timeMs = step(clamp(timeMs, 10, 10 * 1000), 10);
          configStore.setSlowTargetBoxTimeMs(timeMs);
        },
      }),
    });

    return {
      state,
      levelDataList,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.config {
  font-size: 1.6em;
  margin: 3em auto 1em auto;
  width: 400px;
}
.number-input {
  font-size: 1em;
}
</style>
