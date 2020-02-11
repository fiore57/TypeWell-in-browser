import { reactive } from "@vue/composition-api";

export default function resultStore() {
  const state = reactive({
    timeMs: 0,
    typeCount: 0,
    missCount: 0,
    // リセットされた後、RAFLoop で store が書き換えられないようにする
    lock: false
  });
  return {
    reset() {
      state.timeMs = 0;
      state.typeCount = 0;
      state.missCount = 0;
      state.lock = true;
    },
    unlock() {
      state.lock = false;
    },
    get timeMs(): number {
      return state.timeMs;
    },
    updateTime(time: number) {
      if (state.lock) return;
      state.timeMs = time;
    },
    get typeCount(): number {
      return state.typeCount;
    },
    updateTypeCount(count: number) {
      if (state.lock) return;
      state.typeCount = count;
    },
    get missCount(): number {
      return state.missCount;
    },
    updateMissCount(miss: number) {
      if (state.lock) return;
      state.missCount = miss;
    }
  };
}

export type ResultStore = ReturnType<typeof resultStore>;
