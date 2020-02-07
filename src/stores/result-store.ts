import { reactive } from "@vue/composition-api";

export default function resultStore() {
  const state = reactive({
    timeMs: 0,
    typeCount: 0,
    missCount: 0,
  });
  return {
    get timeMs(): number {
      return state.timeMs;
    },
    updateTime(time: number) {
      state.timeMs = time;
    },
    get typeCount(): number {
      return state.typeCount;
    },
    updateTypeCount(count: number) {
      state.typeCount = count;
    },
    get missCount(): number {
      return state.missCount;
    },
    updateMissCount(miss: number) {
      state.missCount = miss;
    }
  };
}

export type ResultStore = ReturnType<typeof resultStore>;
