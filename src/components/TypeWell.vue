<template>
  <div id="type-well">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>

    <div class="header">
      <EnterButton @click="gameStart" text="READY" :isValid="!(inGame || isFinished)"/>
      <h3 class="game-mode">{{ gameMode }}</h3>
      <Timer :isValid="inGame" :isFinished="isFinished" @emit-time="setTime"/>
    </div>

    <div class="text">
      <div class="text-line" v-for="text in textDataList" :key="text.key">
        <div class="prev-text">{{ text.prev }}</div>
        <div class="next-text">{{ text.next }}</div>
        <div class="invalid-text">{{ text.invalid }}</div>
      </div>
    </div>

    <div class="miss-count">
      <p>Miss: {{ missCount }}</p>
    </div>

    <div class="roman">
      <div class="roman-line" v-for="roman in prevNextRomanList" :key="roman.key">
        <div class="prev-roman">{{ roman.prev }}</div>
        <div class="next-roman">{{ roman.next }}</div>
      </div>
    </div>

    <!--<div class="result" v-if="isFinished">-->
    <div class="result">
      <h3>結果</h3>
      <p>Time: {{ time }}</p>
      <p>Level: {{ level }}</p>
      <p>Miss: {{ missCount }}</p>

      <p>{{ tpm }} 打鍵/分</p>
      <p>{{ tps }} 打鍵/秒</p>
    </div>


  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TypingGame from '@/lib/typing';
import EnterButton from './EnterButton.vue';
import Timer from './Timer.vue';

enum Status {
  Ready, Game, Result
}

@Component({
  components: {
    EnterButton,
    Timer,
  },
})
export default class TypeWell extends Vue {
  @Prop() private msg!: string;
  public readonly title: string = "ブラウザ版 タイプウェル国語R";
  public readonly description: string = "※このアプリは非公式です"
  public readonly gameMode: string = "基本常用語";

  private m_status: Status = Status.Ready;
  private m_typingGame: TypingGame = new TypingGame();

  public timeMs: number = 0;

  public gameStart() {
    window.console.log("Game Start");
    this.m_status = Status.Game;
    this.m_typingGame = new TypingGame();
  }

  public keyInput(event: KeyboardEvent) {
    // Escapeで中断
    if(event.key === "Escape"){
      this.m_status = Status.Ready;
      return;
    }
    if(!this.inGame) return;
    this.m_typingGame.update(event.key);

    // 終了時の処理
    if(this.m_typingGame.isFinished()){
      this.m_status = Status.Result;
    }
  }

  public setTime(timeMs: number) {
    this.timeMs = timeMs;
  }

  public get inGame(): boolean {
    return this.m_status === Status.Game;
  }
  public get isFinished(): boolean {
    return this.m_status === Status.Result;
  }

  public get text(): string {
    return this.inGame ? this.m_typingGame.text : "";
  }
  public get textDataList(): {} {
    return this.inGame ? this.m_typingGame.textDataList : {};
  }
  public get prevNextRomanList(): {} {
    return this.inGame ? this.m_typingGame.prevNextRomanList : {};
  }
  public get missCount(): number {
    window.console.log("missCount");
    return this.m_typingGame.missCount;
  }

  public get time(): string {
    return (Math.floor(this.timeMs / 100) / 10).toFixed(1);
  }
  public get tpm(): string {
    return this.m_tpm.toFixed(2);
  }
  public get tps(): string {
    return this.m_tps.toFixed(3);
  }
  private get m_tpm(): number {
    return this.m_tps * 60;
  }
  private get m_tps(): number {
    return this.timeMs === 0 ? 0 : this.m_typingGame.romanLength / this.timeMs * 1000;
  }

  public get level(): string {
    return "-";
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
#type-well{

}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

$text-font-size: 18px;
$roman-font-size: 20px;

.header {
  display: flex; /* 子要素をflexboxで揃える */
  flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  justify-content: center; /* 子要素をflexboxにより中央に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
}
.readyButton {
  width: 100px;
  height: 30px;
  font-size: 18px;
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}
.game-mode {
  margin-top: 10px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 10px;
}
.text {
  margin-top: 10px;
  margin-right: auto;
  margin-bottom: 10px;
  margin-left: auto;
  //display: flex; /* 子要素をflexboxで揃える */
  //flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  //justify-content: center; /* 子要素をflexboxにより中央に配置する */
  //align-items: center;  /* 子要素をflexboxにより中央に配置する */
  width: 800px; /* 見た目用 */
  height: 200px; /* 見た目用 */
  border: 1px solid; /* 見た目用 */;
  font-size: $text-font-size;
}
.text-line {
  margin-top: 1px;
  margin-bottom: 1px;

  display: flex; /* 子要素をflexboxで揃える */
  flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  justify-content: flex-start; /* 子要素をflexboxにより左に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
  white-space: pre;
}
.prev-text {
  word-break: break-all;
  color: #CCCCCC;
  margin-left: auto;
}
.next-text {
  word-break: break-all;
  color: #000000;
}
.invalid-text {
  word-break: break-all;
  color: #CCCCCC;
  margin-right: auto;
}
.miss-count {
  margin-top: 10px;
  margin-bottom: 10px;
}
.roman {
  margin-top: 10px;
  margin-right: auto;
  margin-bottom: 10px;
  margin-left: auto;

  width: 600px; /* 見た目用 */
  height: 200px; /* 見た目用 */
  border: 1px solid; /* 見た目用 */;
  font-size: $roman-font-size;
  font-family: 'Consolas',sans-serif;
}
.roman-line {
  margin-top: 2px;
  margin-right: 10px;
  margin-bottom: 2px;
  margin-left: 10px;

  display: flex; /* 子要素をflexboxで揃える */
  flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  justify-content: flex-start; /* 子要素をflexboxにより左に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
  white-space: pre;
}
.prev-roman {
  word-break: break-all;
  color: #CCCCCC;
}
.next-roman {
  word-break: break-all;
  color: #000000;
}
</style>
