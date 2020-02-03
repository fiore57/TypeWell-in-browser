<template>
  <div id="type-well">
    <div class="game">
      <div class="header">
        <div :class="{ 'countdown': true, 'go': state.inGame || state.inResult }">{{ state.countdown }}</div>
        <EnterButton @click="startCountdown" text="READY" :isValid="state.isReady"/>
        <h3 class="game-mode">{{ state.modeStr }}</h3>
        <Timer :timerStatus="state.timerStatus" @emit-time="setTime"/>
      </div>

      <p>{{ storeTime }}</p>

      <div class="text">
        <div class="text-line" v-for="text in state.textDataList" :key="text.key">
          <div class="prev-text">{{ text.prev }}</div>
          <div :class="{ 'cur-text': true, 'miss-text': text.missFlag }">{{ text.cur }}</div>
          <div class="next-text">{{ text.next }}</div>
          <div class="invalid-text">{{ text.invalid }}</div>
        </div>
      </div>

      <div class="miss-count">
        Miss: {{ state.missCount }}
      </div>

      <div class="roman">
        <div class="inner-roman" v-if="state.inGame || state.inResult">
          <div class="roman-line" v-for="roman in state.romanDataList" :key="roman.key">
            <div class="prev-roman">{{ roman.prev }}</div>
            <div :class="{ 'cur-roman': true, 'miss-roman': roman.missFlag }">{{ roman.cur }}</div>
            <div class="next-roman">{{ roman.next }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="result" v-if="state.inResult">
    <!--<div class="result">-->
      <h3>結果</h3>
      <p>Time: {{ time }} 秒</p>
      <p>Level: {{ level }}</p>
      <p>Miss: {{ missCount }}</p>

      <div class="inline-block-list">
        <ul>
          <li>{{ tpm }} 打/分</li>
          <li>{{ tps }} 打/秒</li>
        </ul>
      </div>
    </div>

    <Config v-show="state.isReady" @emit-data="setConfigData"/>

  </div>
</template>

<script lang="ts">
import { createComponent, reactive, computed, inject, onBeforeMount, onBeforeUnmount } from "@vue/composition-api";
import TypingGame from '@/lib/typing';
import EnterButton from './EnterButton.vue';
import Timer, { eTimerStatus } from './Timer.vue';
import Config, { ConfigData } from './Config.vue';
import { eMode, getLevelStr } from '@/lib/typeWell';
import counterStore from "@/stores/store";
import TimeStoreKey from "@/stores/time-key";

const enum eStatus {
  Ready, Countdown, Game, Result
}

export default createComponent({
  components: {
    EnterButton,
    Timer,
    Config,
  },
  setup(){
    const timeStore = inject(TimeStoreKey);
    if(!timeStore){
      throw new Error(`${TimeStoreKey} is not provided`);
    }

    const storeTime = computed(() => timeStore.timeMs);

    const state = reactive({
      m_mode: eMode.Khjy,
      m_status: eStatus.Ready,
      m_typingGame: new TypingGame(),
      timeMs: 0,
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
        //if(!state.isReady && !state.inCountdown) window.console.log(state.m_typingGame.textDataList);
        return state.isReady || state.inCountdown ? [{}] : state.m_typingGame.textDataList;
        }),
      missCount: computed((): number => state.isReady || state.inCountdown ? 0 : state.m_typingGame.missCount),
      romanDataList: computed((): {}[] => state.isReady || state.inCountdown ? [{}] : state.m_typingGame.romanDataList),

      // 結果
      time: computed((): string => (state.timeMs / 1000).toFixed(3)),
      level: computed((): string => getLevelStr(state.timeMs)),
      m_tpm: computed((): number => state.m_tps * 60),
      m_tps: computed((): number => (state.timeMs === 0 ? 0 : state.m_typingGame.romanLength / state.timeMs * 1000)),
      tpm: computed((): string => state.m_tpm.toFixed(2)),
      tps: computed((): string => state.m_tps.toFixed(3)),
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
      }
    }

    function setTime(timeMs: number) {
      state.timeMs = timeMs;
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
      storeTime,
      state,
      setConfigData,
      setTime,
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
.text {
  margin: 1rem auto;
  //display: flex; /* 子要素をflexboxで揃える */
  //flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  //justify-content: center; /* 子要素をflexboxにより中央に配置する */
  //align-items: center;  /* 子要素をflexboxにより中央に配置する */
  width: 80rem; /* 見た目用 */
  height: 20rem; /* 見た目用 */
  border: 0.1rem solid;
  border-color: gray;
  font-size: 1.8rem;
  background: white;
}
.text-line {
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;

  display: flex; /* 子要素をflexboxで揃える */
  flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  justify-content: flex-start; /* 子要素をflexboxにより左に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
  white-space: pre;
  word-break: break-all;
}
.prev-text {
  color: #CCCCCC;
  margin-left: auto;
}
.cur-text {
  color: #000000;
}
.miss-text {
  color: #FF0000;
}
.next-text {
  color: #000000;
}
.invalid-text {
  color: #CCCCCC;
  margin-right: auto;
}
.miss-count {
  margin-top: 4px;
  margin-bottom: 4px;
  font-size: 18px;
}
.roman {
  margin: 1rem auto;

  width: 58rem; /* 見た目用 */
  height: 21.5rem; /* 見た目用 */
  border: 0.1rem solid;
  border-color: gray;
  font-size: 1.8rem;
  font-family: 'Noto Sans Mono', sans-serif;
  background: white;
}
.roman-line {
  margin: 0.2rem 1rem;

  display: flex; /* 子要素をflexboxで揃える */
  flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  justify-content: flex-start; /* 子要素をflexboxにより左に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
  white-space: pre;
  word-break: break-all;
}
.prev-roman {
  color: #CCCCCC;
  margin-left: auto;
}
.cur-roman{
  color: black;
}
.miss-roman{
  color: red;
}
.next-roman {
  color: black;
  margin-right: auto;
}
.result {
  h3{
    font-size: 2rem;
    margin-top: 1rem;
  }

  p {
    font-size: 1.9rem;
    margin: 1.2rem 0;
  }

  li {
    font-size: 1.9rem;
  }

  padding: 1rem 1rem 2rem 1rem;
  margin: 4rem auto;
  border: double 0.5rem #A0D0F0;
  width: 30rem;
}
</style>
