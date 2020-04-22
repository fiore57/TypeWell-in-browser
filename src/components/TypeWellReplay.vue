<template>
  <div class="typewell-replay">
    <div class="replay-header">
      <h3 class="title">リプレイ (β)</h3>
      <TypeWellButton
        @click="startReplay"
        text="PLAY"
        :isValid="!state.isRunning"
        :keyList="['R']"
      />
      <div class="timer">Time: {{ state.displayTime }}</div>
      <TypeWellMissCount :missCount="state.missCount" />
    </div>

    <div class="roman-and-lap">
      <div class="replay-roman">
        <div
          class="roman-line"
          v-for="romanLine in state.romanDataList"
          :key="romanLine.key"
        >
          <div
            v-for="roman in romanLine.list"
            :class="{
              'roman-char': true,
              'prev-roman': isPrevRoman(roman.status),
              'next-roman': isNextRoman(roman.status),
              'miss-roman': isMissRoman(roman.status),
            }"
            :key="roman.key"
            >{{ roman.char }}</div
          >
        </div>
      </div>
      <TypeWellLapTime :lapTimeMsList="state.lapTimeMsList" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  reactive,
  computed,
  inject,
  onBeforeMount,
  onBeforeUnmount,
} from "@vue/composition-api";
import TypeWellButton from "./TypeWellButton.vue";
import TypeWellMissCount from "./TypeWellMissCount.vue";
import TypeWellLapTime from "./TypeWellLapTime.vue";
import ResultStoreKey from "./result-store-key";
import { eLogType } from "@/stores/result-store";
import { eReplayRomanState } from "@/lib/typeWell";

interface typingLogObj {
  /** ログの種類 */
  logType: eLogType;
  /** タイム（ミリ秒） */
  timeMs: number;
  /** その時点でのローマ字 */
  roman: string;
}

interface ReplayRomanCharObj {
  char: string;
  status: eReplayRomanState;
  key: string;
}

interface ReplayRomanLineObj {
  list: ReplayRomanCharObj[];
  key: string;
}

export default createComponent({
  components: {
    TypeWellButton,
    TypeWellMissCount,
    TypeWellLapTime,
  },
  setup() {
    const resultStore = inject(ResultStoreKey);
    if (!resultStore) {
      throw new Error(`${ResultStoreKey} is not provided`);
    }

    const state = reactive({
      typingLog: computed(() => resultStore.typingLog),
      // 現在のtypingLog
      // eventIndex が typingLog の範囲外であれば、空のオブジェクトを返す
      curLog: computed(
        (): typingLogObj => {
          if (state.typingLog.empty()) {
            return {} as typingLogObj;
          }
          return state.eventIndex < state.typingLog.length
            ? state.typingLog[state.eventIndex]
            : state.typingLog.back();
        }
      ),
      roman: computed((): string => {
        return state.curLog.roman === undefined
          ? ""
          : state.curLog.roman.slice(state.curLog.roman.length - 400);
      }),
      additionalRomanCount: computed((): number =>
        Math.max(state.curLog.roman.length - 400, 0)
      ),
      romanDataList: computed((): ReplayRomanLineObj[] => {
        let ret: ReplayRomanLineObj[] = [];
        if (state.curLog.roman === undefined) return ret;
        [].forEach.call(state.curLog.roman, (c: string, allIndex: number) => {
          const showIndex = allIndex - state.additionalRomanCount;
          if (showIndex >= 0) {
            if (showIndex % 50 === 0) {
              ret.push({ list: [], key: `romanList${showIndex / 50}` });
            }

            if (allIndex < state.romanStateList.length) {
              if (c === " ") c = "_";
              ret.back().list.push({
                char: c,
                status: state.romanStateList[allIndex],
                key: `romanChar${showIndex}`,
              });
            } else {
              ret.back().list.push({
                char: c,
                status: eReplayRomanState.Next,
                key: `romanChar${showIndex}`,
              });
            }
          }
        });
        return ret;
      }),
      lapTimeMsList: computed(() => {
        let ret: number[] = [];
        const list = resultStore.lapTimeMsList;
        for (let lapTimeMs of list) {
          if (lapTimeMs <= state.elapsedTimeMs) ret.push(lapTimeMs);
        }
        return ret;
      }),
      romanStateList: [] as eReplayRomanState[],
      eventIndex: 0,
      isRunning: false,
      startTimeMs: 0,
      elapsedTimeMs: 0,
      displayTime: computed((): string =>
        (Math.floor(state.elapsedTimeMs / 100) / 10).toFixed(1)
      ),
      missCount: 0,
    });

    function startRAFLoop() {
      state.startTimeMs = Date.now();
      while (!state.romanStateList.empty()) {
        state.romanStateList.pop();
      }
      state.eventIndex = 0;
      window.requestAnimationFrame(loop);
    }
    function loop() {
      if (state.isRunning) {
        const nowTime = Date.now();
        state.elapsedTimeMs = nowTime - state.startTimeMs;
        window.requestAnimationFrame(loop);

        // 更新処理
        if (
          state.eventIndex < state.typingLog.length &&
          state.elapsedTimeMs >= state.typingLog[state.eventIndex].timeMs
        ) {
          switch (state.typingLog[state.eventIndex].logType) {
            // 正しい入力
            case eLogType.Correct:
              if (
                !state.romanStateList.empty() &&
                state.romanStateList.back() === eReplayRomanState.NextMiss
              ) {
                state.romanStateList.pop();
                state.romanStateList.push(eReplayRomanState.PrevMiss);
              } else {
                state.romanStateList.push(eReplayRomanState.Prev);
              }
              break;
            // ミス
            case eLogType.Miss:
              ++state.missCount;
              if (
                state.romanStateList.empty() ||
                state.romanStateList.back() !== eReplayRomanState.NextMiss
              ) {
                state.romanStateList.push(eReplayRomanState.NextMiss);
              }
              break;
            default:
              throw new Error("invalid logType");
          }
          ++state.eventIndex;
        }

        if (state.eventIndex >= state.typingLog.length) {
          state.isRunning = false;
        }
      }
    }

    function keyInput(event: KeyboardEvent) {
      if (event.key === "Escape") {
        state.isRunning = false;
      }
    }

    function startReplay() {
      state.isRunning = !state.isRunning;
      if (state.isRunning) {
        if (state.typingLog.length > 0) {
          startRAFLoop();
        } else {
          state.isRunning = false;
          alert("リプレイファイルがありません");
        }
      }
    }

    onBeforeMount(() => {
      window.addEventListener("keydown", keyInput, true);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("keydown", keyInput, true);
    });

    function isNextRoman(status: eReplayRomanState): boolean {
      return status === eReplayRomanState.Next;
    }
    function isPrevRoman(status: eReplayRomanState): boolean {
      return status === eReplayRomanState.Prev;
    }
    function isMissRoman(status: eReplayRomanState): boolean {
      return (
        status === eReplayRomanState.PrevMiss ||
        status === eReplayRomanState.NextMiss
      );
    }

    return {
      state,
      startReplay,
      isNextRoman,
      isPrevRoman,
      isMissRoman,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/variable.scss";
.typewell-replay {
  @include gray-block-shadow;
  width: 80rem;
  padding: 1rem;
  margin: 2rem auto 2rem auto;
}
.replay-header {
  @include flex-row-center;
  margin: 1rem;
  .title {
    margin: 0 auto 0 10rem;
  }
  .timer {
    @include white-block;
    font-size: 2.2rem;
    padding: 0.2rem 1rem;
    margin: 0 2rem 0 auto;
    width: 14rem;
  }
  .miss {
    margin: 0 10rem 0 2rem;
    font-size: 1.8rem;
  }
}
.roman-and-lap {
  @include flex-row-center;
  margin: 0.5rem auto 0.5rem auto;
}
.replay-roman {
  @include white-block;
  margin: 1rem 1rem 1rem 1rem;
  width: 58rem;
  height: $roman-block-height;
  font-size: 1.8rem;
  font-family: "Noto Sans Mono", sans-serif;
  display: flex; // 子要素をflexboxで揃える
  flex-direction: column; // 縦方向
  justify-content: space-between; // 縦方向に広げて配置
}
.roman-line {
  margin: 0 0 0.1rem 0;
  display: flex; // 子要素をflexboxで揃える
  flex-direction: row; // 横方向
  justify-content: flex-start; // 水平方向左
  align-items: center; // 垂直方向中央
  white-space: pre;
  word-break: break-all;
}
.roman-char {
  margin: 0;
  padding: 0.01rem;
  width: 2.5rem;
  height: 2.5rem;
}
.prev-roman {
  color: #cccccc;
}
.cur-roman {
  color: black;
}
.miss-roman {
  color: red;
}
.next-roman {
  color: black;
}
</style>
