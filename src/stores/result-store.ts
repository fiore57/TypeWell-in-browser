import { reactive } from "@vue/composition-api";

interface resultStoreObj {
  /** タイム（ミリ秒） */
  timeMs: number;
  /** 打鍵数 */
  typeCount: number;
  /** ミス数 */
  missCount: number;
  typingLog: {}[];
  /** ラップタイム（累積和配列） */
  lapTimeMsList: number[];
  /** リセットされた後、RAFLoop で store が書き換えられないようにする */
  lock: boolean;
}

export default function resultStore() {
  const state: resultStoreObj = reactive({
    timeMs: 0,
    typeCount: 0,
    missCount: 0,
    typingLog: [{}],
    lapTimeMsList: [],
    lock: false
  });

  const updateLog = () => {
    state.typingLog.push({
      timeMs: state.timeMs,
      typeCount: state.typeCount,
      missCount: state.missCount
    });
  };

  return {
    reset() {
      state.timeMs = 0;
      state.typeCount = 0;
      state.missCount = 0;
      state.typingLog = [];
      state.lapTimeMsList = [];
      state.lock = true;
    },
    /** resultStore をロックする */
    lock() {
      state.lock = true;
    },
    /** resultStore のロックを解除する */
    unlock() {
      state.lock = false;
    },
    get timeMs(): number {
      return state.timeMs;
    },
    updateTimeMs(time: number) {
      if (state.lock) return;
      state.timeMs = time;
    },
    get typeCount(): number {
      return state.typeCount;
    },
    updateTypeCount(count: number) {
      if (state.lock) return;
      state.typeCount = count;
      updateLog();
    },
    get missCount(): number {
      return state.missCount;
    },
    updateMissCount(miss: number) {
      if (state.lock) return;
      state.missCount = miss;
      updateLog();
    },
    /** 累積和配列を返す */
    get lapTimeMsList(): number[] {
      return state.lapTimeMsList;
    },
    addLapTimeMs(timeMs: number) {
      if (state.lock) return;
      state.lapTimeMsList.push(timeMs);
    },
    get curLineNum(): number {
      return state.lapTimeMsList.length;
    }
  };
}

export type ResultStore = ReturnType<typeof resultStore>;
