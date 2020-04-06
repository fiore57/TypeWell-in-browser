<template>
  <div class="typewell-replay">
    <h3>リプレイ</h3>
    <div class="replay-timer">Time: {{ state.elapsedTimeMs }}</div>

    <div class="replay">
      <!--
    <div
      :v-if="state.isRunning"
      class="roman-line"
      v-for="romanLine in state.romanDataList"
      :key="romanLine.key"
    >
    -->
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
import ResultStoreKey from "./result-store-key";
import { eLogType, typingLogObj } from "@/stores/result-store";

const enum eReplayRomanState {
  Prev,
  Next,
  PrevMiss,
  NextMiss,
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
          return state.eventIndex < state.typingLog.length
            ? state.typingLog[state.eventIndex]
            : ({} as typingLogObj);
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
        window.console.log("RomanDataList");
        let ret: ReplayRomanLineObj[] = [];
        [].forEach.call(state.roman, (c: string, allIndex: number) => {
          const showIndex = allIndex - state.additionalRomanCount;
          if (showIndex >= 0) {
            if (showIndex % 50 === 0) {
              ret.push({ list: [], key: `romanList${allIndex / 50}` });
            }
            if (allIndex < state.romanStateList.length) {
              ret.back().list.push({
                char: c,
                status: state.romanStateList[allIndex],
                key: `romanChar${allIndex}`,
              });
            } else {
              ret.back().list.push({
                char: c,
                status: eReplayRomanState.Next,
                key: `romanChar${allIndex}`,
              });
            }
          }
        });
        return ret;
      }),
      romanStateList: [] as eReplayRomanState[],
      eventIndex: 0,
      isRunning: false,
      startTimeMs: 0,
      elapsedTimeMs: 0,
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
          window.console.log(state.typingLog[state.eventIndex]);

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
          window.console.log("End");
          state.isRunning = false;
        }
      }
    }

    function keyInput(event: KeyboardEvent) {
      window.console.log(event.key);
      if (event.key === "R") {
        state.isRunning = !state.isRunning;
        if (state.isRunning) {
          if (state.typingLog.length > 0) {
            startRAFLoop();
          } else {
            state.isRunning = false;
            alert("リプレイファイルがありません");
          }
        }
      } else if (event.key === "Escape") {
        state.isRunning = false;
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
.replay-timer {
  @include white-block;
  margin: 1rem;
  width: 15rem;
  height: 3rem;
  font-size: 2rem;
}
.replay {
  @include white-block;
  margin: 1rem 10rem 1rem 10rem;
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
