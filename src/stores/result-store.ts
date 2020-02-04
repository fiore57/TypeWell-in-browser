import { reactive } from "@vue/composition-api";

export default function resultStore() {
  const state = reactive({
    timeMs: 0,
    missCount: 0,
  });
  return {
    get timeMs(): number {
      return state.timeMs;
    },
    updateTime(time: number) {
      state.timeMs = time;
    },
    get missCount(): number {
      return state.missCount;
    },
    setMissCount(miss: number) {
      state.missCount = miss;
    }
  };
}

export type ResultStore = ReturnType<typeof resultStore>;
