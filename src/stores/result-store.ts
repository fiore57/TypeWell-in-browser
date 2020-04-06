import { reactive } from "@vue/composition-api";

export const enum eLogType {
  Correct,
  Miss
}

export interface typingLogObj {
  /** ログの種類 */
  logType: eLogType;
  /** タイム（ミリ秒） */
  timeMs: number;
  /** その時点でのローマ字 */
  roman: string;
}

interface resultStoreObj {
  /** タイム（ミリ秒） */
  timeMs: number;
  /** 打鍵数 */
  typeCount: number;
  /** ミス数 */
  missCount: number;
  /** ログ */
  typingLog: typingLogObj[];
  /** ラップタイム（累積和配列） */
  lapTimeMsList: number[];
  /** ローマ字 */
  roman: string;
  /** リセットされた後、RAFLoop で store が書き換えられないようにする */
  lock: boolean;
}

export default function resultStore() {
  const state: resultStoreObj = reactive({
    timeMs: 0,
    typeCount: 0,
    missCount: 0,
    typingLog: [],
    lapTimeMsList: [],
    roman: "",
    additionalRomanCount: 0,
    lock: false
  });

  return {
    reset() {
      state.timeMs = 0;
      state.typeCount = 0;
      state.missCount = 0;
      state.typingLog = [];
      state.lapTimeMsList = [];
      state.roman = "";
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
    incTypeCount() {
      if (state.lock) return;
      ++state.typeCount;
      state.typingLog.push({
        logType: eLogType.Correct,
        timeMs: state.timeMs,
        roman: state.roman
      });
    },
    get missCount(): number {
      return state.missCount;
    },
    incMissCount() {
      if (state.lock) return;
      ++state.missCount;
      state.typingLog.push({
        logType: eLogType.Miss,
        timeMs: state.timeMs,
        roman: state.roman
      });
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
    },
    get typingLog(): typingLogObj[] {
      return state.typingLog;
    },
    get roman(): string {
      return state.roman;
    },
    setRoman(newRoman: string) {
      if (state.lock) return;
      state.roman = newRoman;
    }
  };
}

export type ResultStore = ReturnType<typeof resultStore>;
