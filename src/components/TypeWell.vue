<template>
  <div id="type-well">
    <div class="game">
      <div class="header">
        <div :class="{ countdown: true, go: state.inGame || state.inResult }">
          {{ state.countdown }}
        </div>
        <TypeWellButton
          @click="startCountdown"
          text="READY"
          :isValid="state.isReady"
          :keyList="['Enter', ' ']"
        />
        <h3 class="game-mode">{{ state.modeStr }}</h3>
        <Timer :timerStatus="state.timerStatus" />
      </div>

      <TypeWellText :textDataList="state.textDataList" />

      <div class="target-and-miss">
        <TypeWellTarget />
        <TypeWellMissCount :missCount="state.missCount" />
      </div>

      <div class="roman-and-lap">
        <TypeWellRoman :romanDataList="state.romanDataList" />
        <TypeWellLapTime :lapTimeMsList="state.lapTimeMsList" />
      </div>
    </div>

    <Result v-if="state.inResult" />

    <TypeWellReplay v-if="state.inResult" />

    <Config v-if="state.isReady" />
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
import TypingGame from "@/lib/typing";
import TypeWellButton from "./TypeWellButton.vue";
import Timer from "./Timer.vue";
import TypeWellText from "./TypeWellText.vue";
import TypeWellTarget from "./TypeWellTarget.vue";
import TypeWellMissCount from "./TypeWellMissCount.vue";
import TypeWellRoman from "./TypeWellRoman.vue";
import TypeWellLapTime from "./TypeWellLapTime.vue";
import Config from "./Config.vue";
import Result from "./Result.vue";
import TypeWellReplay from "./TypeWellReplay.vue";
import { eMode } from "@/lib/typeWell";
import ResultStoreKey from "./result-store-key";
import ConfigStoreKey from "./config-store-key";
import { eStatus, eTimerStatus } from "@/lib/typeWell";

export default createComponent({
  components: {
    TypeWellButton,
    Timer,
    TypeWellText,
    TypeWellTarget,
    TypeWellMissCount,
    TypeWellRoman,
    TypeWellLapTime,
    Config,
    Result,
    TypeWellReplay,
  },
  setup() {
    const resultStore = inject(ResultStoreKey);
    if (!resultStore) {
      throw new Error(`${ResultStoreKey} is not provided`);
    }
    const configStore = inject(ConfigStoreKey);
    if (!configStore) {
      throw new Error(`${ConfigStoreKey} is not provided`);
    }

    const storeTimeMs = computed(() => resultStore.timeMs);
    const storeMissCount = computed(() => resultStore.missCount);

    const state = reactive({
      m_mode: eMode.Khjy,
      m_status: eStatus.Ready,
      m_typingGame: new TypingGame(),

      // カウントダウン関係
      m_countdown: 0,
      m_countdownId: 0,

      // モード判定
      isReady: computed((): boolean => state.m_status === eStatus.Ready),
      inCountdown: computed(
        (): boolean => state.m_status === eStatus.Countdown
      ),
      inGame: computed((): boolean => state.m_status === eStatus.Game),
      inResult: computed((): boolean => state.m_status === eStatus.Result),

      // ヘッダ
      countdown: computed((): string => {
        if (state.inCountdown) return "" + state.m_countdown;
        else if (state.inGame) return "GO!";
        return "";
      }),
      modeStr: computed((): string => {
        const modeStrList = [
          "基本常用語",
          "カタカナ語",
          "漢字",
          "慣用句・ことわざ",
        ];
        return modeStrList[state.m_mode];
      }),
      timerStatus: computed(() => {
        switch (state.m_status) {
          case eStatus.Ready: // fall through
          case eStatus.Countdown:
            return eTimerStatus.Reset;
          case eStatus.Game:
            return eTimerStatus.Start;
          case eStatus.Result:
            return eTimerStatus.Stop;
          default:
            throw new Error("Unknown status");
        }
      }),

      // テキスト
      text: computed((): string =>
        state.isReady || state.inCountdown ? "" : state.m_typingGame.text
      ),
      textDataList: computed((): {}[] => {
        return state.isReady || state.inCountdown
          ? [{}]
          : state.m_typingGame.textDataList;
      }),
      missCount: computed((): number =>
        state.isReady || state.inCountdown ? 0 : state.m_typingGame.missCount
      ),
      romanDataList: computed((): {}[] =>
        state.isReady || state.inCountdown
          ? [{}]
          : state.m_typingGame.romanDataList
      ),
      lapTimeMsList: computed(() => resultStore.lapTimeMsList),
    });

    function countdownFunc() {
      --state.m_countdown;
      if (state.m_countdown === 0) {
        gameStart();
      } else {
        state.m_countdownId = window.setTimeout(countdownFunc, 1000);
      }
    }

    function startCountdown() {
      state.m_status = eStatus.Countdown;
      if (!configStore) {
        throw new Error(`${ConfigStoreKey} is not provided`);
      }
      state.m_countdown = configStore.countdownTime + 1;
      countdownFunc();
    }

    function gameStart() {
      state.m_typingGame.init(state.m_mode);
      state.m_status = eStatus.Game;
      if (!resultStore) {
        throw new Error(`${ResultStoreKey} is not provided`);
      }
      resultStore.unlock();
    }

    // 中断処理
    function resetGame() {
      if (state.inCountdown) window.clearTimeout(state.m_countdownId);
      state.m_status = eStatus.Ready;
      if (resultStore) resultStore.reset();
    }

    // 入力を処理
    function keyInput(event: KeyboardEvent) {
      // window.console.log(event.key);
      // Escapeで中断
      if (event.key === "Escape") {
        resetGame();
        return;
      }
      if (state.isReady) {
        switch (event.key) {
          case "F1":
            state.m_mode = eMode.Khjy;
            break;
          case "F2":
            state.m_mode = eMode.Ktkn;
            break;
          case "F3":
            state.m_mode = eMode.Knj;
            break;
          case "F4":
            state.m_mode = eMode.Ktwz;
            break;
        }
      }
      if (!state.inGame) return;
      // 入力処理
      const isCorrectInput: boolean = state.m_typingGame.update(event.key);
      if (!resultStore) {
        throw new Error(`${ResultStoreKey} is not provided`);
      }

      // 正誤に関わらず呼び出す
      resultStore.setRoman(
        state.m_typingGame.roman.substr(
          0,
          400 + state.m_typingGame.additionalRomanCountSum
        )
      );

      if (isCorrectInput) {
        // 正しい入力の場合
        resultStore.incTypeCount();

        // ラップタイムの処理
        if (
          state.m_typingGame.typeCount >=
          state.m_typingGame.romanLineLength * (resultStore.curLineNum + 1)
        ) {
          resultStore.addLapTimeMs(resultStore.timeMs);
        }

        // 終了時の処理
        if (state.m_typingGame.isFinished()) {
          resultStore.setRoman(state.m_typingGame.roman);
          resultStore.lock(); // resultStore をロック
          state.m_status = eStatus.Result;
        }
      } else {
        // 誤った入力の場合
        resultStore.incMissCount();

        // ミス回数の判定
        if (!configStore) {
          throw new Error(`${ConfigStoreKey} is not provided`);
        }
        if (state.m_typingGame.missCount > configStore.missMax) {
          alert("ミスが多すぎます。はじめからやり直してください");
          resetGame();
          event.stopPropagation(); // イベントの伝播を止める
          return;
        }
      }
    }

    onBeforeMount(() => {
      window.addEventListener("keydown", keyInput, true);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("keydown", keyInput, true);
    });

    return {
      storeTimeMs,
      storeMissCount,
      state,
      startCountdown,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/variable.scss";
.game {
  @include gray-block-shadow;
  width: 85rem;
  padding: 1rem;
  margin: 2rem auto 2rem auto;
}
.header {
  @include flex-row-center;
}
.countdown {
  @include white-block;
  font-size: 2.2rem;
  padding: 0.2rem 0.5rem;
  margin: 1rem;
  width: 5.5rem;
  height: 3rem;
}
.go {
  color: red;
}
.game-mode {
  width: 20rem;
  margin: 1rem 10rem 1rem 5rem;
}
.target-and-miss {
  display: flex; // 子要素をflexboxで揃える
  flex-direction: row; // 横方向
  justify-content: flex-start; // 水平方向左揃え
  align-items: center; // 垂直方向中央揃え
}
.roman-and-lap {
  @include flex-row-center;
}
</style>
