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
            levelData.string
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
    </ul>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  reactive,
  computed,
  inject,
  onBeforeMount,
  onBeforeUnmount
} from "@vue/composition-api";
import { eLevel, convertLevelToEnum, levelDataList } from "@/lib/typeWell";
import ConfigStoreKey from "./config-store-key";

export default createComponent({
  setup() {
    const configStore = inject(ConfigStoreKey);
    if (!configStore) {
      throw new Error(`${ConfigStoreKey} is not provided`);
    }

    const state = reactive({
      countdownTime: computed({
        get: (): number => {
          return configStore.countdownTime;
        },
        set: (newVal: number) => {
          configStore.setCountdownTime(newVal);
        }
      }),
      targetLevel: computed({
        get: (): string => {
          return eLevel[configStore.targetLevel];
        },
        set: (newLevelStr: string) => {
          const enumTargetLevel: eLevel = convertLevelToEnum(newLevelStr);
          configStore.setTargetLevel(enumTargetLevel);
        }
      }),
      missMax: computed({
        get: (): number => {
          return configStore.missMax;
        },
        set: (newVal: number) => {
          configStore.setMissMax(newVal);
        }
      })
    });

    return {
      state,
      levelDataList
    };
  }
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
