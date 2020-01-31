<template>
  <div id="type-well">
    <h2>{{ title }}</h2>
    <p class="warn">{{ description }}</p>

    <div class="game">
      <div class="header">
        <div :class="{ 'countdown': true, 'go': inGame || inResult }">{{ countdown }}</div>
        <EnterButton @click="startCountdown" text="READY" :isValid="isReady"/>
        <h3 class="game-mode">{{ modeStr }}</h3>
        <Timer :timerStatus="timerStatus" @emit-time="setTime"/>
      </div>

      <div class="text">
        <div class="text-line" v-for="text in textDataList" :key="text.key">
          <div class="prev-text">{{ text.prev }}</div>
          <div :class="{ 'cur-text': true, 'miss-text': text.missFlag }">{{ text.cur }}</div>
          <div class="next-text">{{ text.next }}</div>
          <div class="invalid-text">{{ text.invalid }}</div>
        </div>
      </div>

      <div class="miss-count">
        Miss: {{ missCount }}
      </div>

      <div class="roman">
        <div class="roman-line" v-for="roman in romanDataList" :key="roman.key">
          <div class="prev-roman">{{ roman.prev }}</div>
          <div :class="{ 'cur-roman': true, 'miss-roman': text.missFlag }">{{ roman.cur }}</div>
          <div class="next-roman">{{ roman.next }}</div>
        </div>
      </div>
    </div>

    <div class="result" v-if="inResult">
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

    <Config v-show="isReady" @emit-data="setConfigData"/>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TypingGame from '@/lib/typing';
import EnterButton from './EnterButton.vue';
import Timer, { eTimerStatus } from './Timer.vue';
import Config, { ConfigData } from './Config.vue';
import { eMode, getLevelStr } from '@/lib/typeWell';

const enum eStatus {
  Ready, Countdown, Game, Result
}

@Component({
  components: {
    EnterButton,
    Timer,
    Config,
  },
})
export default class TypeWell extends Vue {
  @Prop() private msg!: string;
  public readonly title: string = "ブラウザ版 タイプウェル国語R";
  public readonly description: string = "※このアプリは非公式です"

  private m_mode: eMode = eMode.Khjy;
  private m_status: eStatus = eStatus.Ready;
  private m_typingGame: TypingGame = new TypingGame(this.m_mode);

  public timeMs: number = 0;
  private m_configData: ConfigData = new ConfigData();

  // カウントダウン関係
  private m_countdown: number = 0;
  private m_countdownId: number = 0;
  private countdownFunc(){
    --this.m_countdown;
    if(this.m_countdown === 0){
      this.gameStart();
    }
    else {
      this.m_countdownId = window.setTimeout(this.countdownFunc, 1000);
    }
  }
  public startCountdown() {
    this.m_status = eStatus.Countdown;
    this.m_countdown = this.m_configData.countdownTime + 1;
    this.countdownFunc();
  }
  private gameStart() {
    this.m_status = eStatus.Game;
    this.m_typingGame = new TypingGame(this.m_mode);
  }

  // 入力を処理
  public keyInput(event: KeyboardEvent) {
    // Escapeで中断
    if(event.key === "Escape"){
      if(this.inCountdown) window.clearTimeout(this.m_countdownId);
      this.m_status = eStatus.Ready;
      return;
    }
    if(this.isReady){
      switch(event.key){
        case "F1":
          this.m_mode = eMode.Khjy;
          break;
        case "F2":
          this.m_mode = eMode.Ktkn;
          break;
        case "F3":
          this.m_mode = eMode.Knj;
          break;
        case "F4":
          this.m_mode = eMode.Ktwz;
          break;
      }
    }
    if(!this.inGame) return;
    this.m_typingGame.update(event.key);

    // 終了時の処理
    if(this.m_typingGame.isFinished()){
      this.m_status = eStatus.Result;
    }
  }

  public setTime(timeMs: number) {
    this.timeMs = timeMs;
  }
  public setConfigData(configData: ConfigData){
    this.m_configData = configData;
  }

  // モード判定
  public get isReady(): boolean{
    return this.m_status === eStatus.Ready;
  }
  public get inCountdown(): boolean {
    return this.m_status === eStatus.Countdown;
  }
  public get inGame(): boolean {
    return this.m_status === eStatus.Game;
  }
  public get inResult(): boolean {
    return this.m_status === eStatus.Result;
  }
  // ヘッダ
  public get countdown(): string {
    if(this.inCountdown) return "" + this.m_countdown;
    else if(this.inGame) return "GO!"
    return "";
  }
  public get modeStr(): string {
    const modeStrList = ["基本常用語", "カタカナ語", "漢字", "慣用句・ことわざ"];
    return modeStrList[this.m_mode];
  }
  public get timerStatus(): eTimerStatus {
    switch(this.m_status) {
      case eStatus.Ready: // fall through
      case eStatus.Countdown: return eTimerStatus.Reset;
      case eStatus.Game: return eTimerStatus.Start;
      case eStatus.Result: return eTimerStatus.Stop;
      default: throw new Error("Unknown status");
    }
  }
  // テキスト
  public get text(): string {
    return this.isReady || this.inCountdown ? "" : this.m_typingGame.text;
  }
  public get textDataList(): {} {
    return this.isReady || this.inCountdown ? {} : this.m_typingGame.textDataList;
  }
  public get missCount(): number {
    return this.isReady || this.inCountdown ? 0 : this.m_typingGame.missCount;
  }
  public get romanDataList(): {} {
    return this.isReady || this.inCountdown ? {} : this.m_typingGame.romanDataList;
  }
  // 結果
  public get time(): string {
    return (this.timeMs / 1000).toFixed(3);
  }
  public get level(): string {
    return getLevelStr(this.timeMs);
  }
  private get m_tpm(): number {
    return this.m_tps * 60;
  }
  private get m_tps(): number {
    return this.timeMs === 0 ? 0 : this.m_typingGame.romanLength / this.timeMs * 1000;
  }
  public get tpm(): string {
    return this.m_tpm.toFixed(2);
  }
  public get tps(): string {
    return this.m_tps.toFixed(3);
  }

  beforeMount() {
    window.addEventListener('keydown', this.keyInput, true);
  }
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyInput, true);
  }
}
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
.warn {
  color: red;
  font-weight: bold;

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
