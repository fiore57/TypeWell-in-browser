import { reactive } from "@vue/composition-api";
import { eLevel, getTimeMs } from "@/lib/typeWell";

export default function configStore() {
  const state = reactive({
    countdownTime: 3,
    targetLevel: eLevel.None,
    targetTimeMs: 0,
    fastTargetBoxTimeMs: 500,
    slowTargetBoxTimeMs: 200,
    missMax: 99
  });
  return {
    get countdownTime(): number {
      return state.countdownTime;
    },
    setCountdownTime(time: number) {
      state.countdownTime = time;
    },

    get targetLevel(): eLevel {
      return state.targetLevel;
    },
    setTargetLevel(level: eLevel) {
      state.targetLevel = level;
      state.targetTimeMs = getTimeMs(level);
    },

    get targetTimeMs(): number {
      return state.targetTimeMs;
    },
    /*
    setTargetTimeMs(timeMs: number) {
      state.targetTimeMs = timeMs;
    },
    */

    get fastTargetBoxTimeMs(): number {
      return state.fastTargetBoxTimeMs;
    },
    setFastTargetBoxTimeMs(timeMs: number) {
      state.fastTargetBoxTimeMs = timeMs;
    },

    get slowTargetBoxTimeMs(): number {
      return state.slowTargetBoxTimeMs;
    },
    setSlowTargetBoxTimeMs(timeMs: number) {
      state.slowTargetBoxTimeMs = timeMs;
    },

    get missMax(): number {
      return state.missMax;
    },
    setMissMax(miss: number) {
      state.missMax = miss;
    }
  };
}

export type ConfigStore = ReturnType<typeof configStore>;
