import { reactive } from "@vue/composition-api";

export default function timeStore() {
  const state = reactive({
    timeMs: 0,
  });
  return {
    get timeMs(): number {
      return state.timeMs;
    },
    updateTime(time: number) {
      state.timeMs = time;
    },

  };
}

export type TimeStore = ReturnType<typeof timeStore>;
