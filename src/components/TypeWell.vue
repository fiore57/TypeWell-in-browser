<template>
  <div id="type-well">
    <div class="game">
      <div class="header">
        <div :class="{ 'countdown': true, 'go': state.inGame || state.inResult }">{{ state.countdown }}</div>
        <TypeWellButton @click="startCountdown" text="READY" :isValid="state.isReady"/>
        <h3 class="game-mode">{{ state.modeStr }}</h3>
        <Timer :timerStatus="state.timerStatus"/>
      </div>

      <p>{{ storeTimeMs }}, {{ storeMissCount }}</p>

      <TypeWellText :textDataList="state.textDataList"/>

      <div class="miss-count">
        Miss: {{ state.missCount }}
      </div>

      <TypeWellRoman :romanDataList="state.romanDataList"/>

    </div>

    <!--<Result v-if="state.inResult"/>-->
    <Result />

    <Config v-show="state.isReady" @emit-data="setConfigData"/>

  </div>
</template>

<script lang="ts">
import { createComponent, reactive, computed, inject, onBeforeMount, onBeforeUnmount } from "@vue/composition-api";
import TypingGame from "@/lib/typing";
import TypeWellButton from "./TypeWellButton.vue";
import Timer, { eTimerStatus } from "./Timer.vue";
import TypeWellText from "./TypeWellText.vue";
import TypeWellRoman from "./TypeWellRoman.vue";
import Config, { ConfigData } from "./Config.vue";
import Result from "./Result.vue";
import { eMode } from '@/lib/typeWell';
import ResultStoreKey from "./result-store-key";

const enum eStatus {
  Ready, Countdown, Game, Result
}

export default createComponent({
  components: {
    TypeWellButton,
    Timer,
    TypeWellText,
    TypeWellRoman,
    Config,
    Result,
  },
  setup(){
    const resultStore = inject(ResultStoreKey);
    if(!resultStore){
      throw new Error(`${ResultStoreKey} is not provided`);
    }

    const storeTimeMs = computed(() => resultStore.timeMs);
    const storeMissCount = computed(() => resultStore.missCount);

    const state = reactive({
      m_mode: eMode.Khjy,
      m_status: eStatus.Ready,
      m_typingGame: new TypingGame(),
      m_configData: new ConfigData(),

      // カウントダウン関係
      m_countdown: 0,
      m_countdownId: 0,

      // モード判定
      isReady: computed((): boolean => state.m_status === eStatus.Ready),
      inCountdown: computed((): boolean => state.m_status === eStatus.Countdown),
      inGame: computed((): boolean => state.m_status === eStatus.Game),
      inResult: computed((): boolean => state.m_status === eStatus.Result),

      // ヘッダ
      countdown: computed((): string => {
        if(state.inCountdown) return "" + state.m_countdown;
        else if(state.inGame) return "GO!"
        return "";
      }),
      modeStr: computed((): string => {
        const modeStrList = ["基本常用語", "カタカナ語", "漢字", "慣用句・ことわざ"];
        return modeStrList[state.m_mode];
      }),
      timerStatus: computed(() => {
        switch(state.m_status) {
          case eStatus.Ready: // fall through
          case eStatus.Countdown: return eTimerStatus.Reset;
          case eStatus.Game: return eTimerStatus.Start;
          case eStatus.Result: return eTimerStatus.Stop;
          default: throw new Error("Unknown status");
        }
      }),

      // テキスト
      text: computed((): string => state.isReady || state.inCountdown ? "" : state.m_typingGame.text),
      textDataList: computed((): {}[] => {
        return state.isReady || state.inCountdown ? [{}] : state.m_typingGame.textDataList;
        }),
      missCount: computed((): number => state.isReady || state.inCountdown ? 0 : state.m_typingGame.missCount),
      romanDataList: computed((): {}[] => state.isReady || state.inCountdown ? [{}] : state.m_typingGame.romanDataList),
    })

    function countdownFunc() {
      --state.m_countdown;
      if(state.m_countdown === 0){
        gameStart();
      }
      else {
        state.m_countdownId = window.setTimeout(countdownFunc, 1000);
      }
    }

    function startCountdown() {
      state.m_status = eStatus.Countdown;
      state.m_countdown = state.m_configData.countdownTime + 1;
      countdownFunc();
    }

    function gameStart() {
      state.m_typingGame.init(state.m_mode);
      state.m_status = eStatus.Game;
      window.console.log("Game Start!");
      window.console.log(state.m_typingGame);
      window.console.log(state.timerStatus);
    }

    // 入力を処理
    function keyInput(event: KeyboardEvent) {
      // Escapeで中断
      if(event.key === "Escape"){
        if(state.inCountdown) window.clearTimeout(state.m_countdownId);
        state.m_status = eStatus.Ready;
        return;
      }
      if(state.isReady){
        switch(event.key){
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
      if(!state.inGame) return;
      state.m_typingGame.update(event.key);

      // 終了時の処理
      if(state.m_typingGame.isFinished()){
        state.m_status = eStatus.Result;
        if(resultStore){
          resultStore.setMissCount(state.missCount);
        }
      }
    }

    function setConfigData(configData: ConfigData){
      state.m_configData = configData;
    }

    onBeforeMount(() => {
      window.addEventListener('keydown', keyInput, true);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('keydown', keyInput, true);
    });

    return {
      storeTimeMs,
      storeMissCount,
      state,
      setConfigData,
      startCountdown,
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game {
  width: 85rem;
  padding: 1rem;
  margin: 2rem auto 2rem auto;
  background: whitesmoke;
  border: 0.1rem solid;
  border-color: gray;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
}
.header {
  display: flex; /* 子要素をflexboxで揃える */
  flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  justify-content: center; /* 子要素をflexboxにより中央に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
}
.countdown{
  font-size: 2.2rem;
  border: 0.1rem solid;
  border-color: gray;
  padding: 0.2rem 0.5rem;
  margin: 1rem;
  width: 5.5rem;
  height: 3rem;
  background: white;
}
.go {
  color: red;
}
.game-mode {
  margin-top: 10px;
  margin-left: 50px;
  margin-right: 100px;
  margin-bottom: 10px;
}
.miss-count {
  margin-top: 4px;
  margin-bottom: 4px;
  font-size: 18px;
}
</style>
