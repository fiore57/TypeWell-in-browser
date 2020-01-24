<template>
  <div id="type-well">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <div class="header">
      <EnterButton @click="gameStart" text="READY" :isValid="!inGame"/>
      <h3 class="gameMode">{{ gameMode }}</h3>
      <Timer :isValid="inGame"/>
    </div>

    <div class="text">
      <div class="textLine" v-for="text in textDataList" :key="text.key">
        <div class="prevText">{{ text.prev }}</div>
        <div class="nextText">{{ text.next }}</div>
        <div class="invalid-text">{{ text.invalid }}</div>
      </div>
    </div>

    <div class="missCount">
      <p>Miss: {{ missCount }}</p>
    </div>

    <div class="roman">
      <div class="romanLine" v-for="roman in prevNextRomanList" :key="roman.key">
        <div class="prevRoman">{{ roman.prev }}</div>
        <div class="nextRoman">{{ roman.next }}</div>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TypingGame from '@/lib/typing';
import EnterButton from './EnterButton.vue';
import Timer from './Timer.vue';

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
  public inGame: boolean = false;
  public typingGame?: TypingGame;

  public text: string = "";
  public prevRoman: string = "";
  public nextRoman: string = "";
  public missCount: number = 0;
  public textDataList: {} = {};
  public prevRomanList: Array<string> = [];
  public nextRomanList: Array<string> = [];
  public prevNextRomanList: {} = {};

  private updateVariables() {
    if(this.typingGame === undefined)return;
    this.text = this.typingGame.text;
    this.textDataList = this.typingGame.textDataList;
    this.prevRoman = this.typingGame.prevRoman;
    this.nextRoman = this.typingGame.nextRoman;
    this.prevRomanList = this.typingGame.prevRomanList;
    this.nextRomanList = this.typingGame.nextRomanList;
    this.prevNextRomanList = this.typingGame.prevNextRomanList;
    this.missCount = this.typingGame.missCount;
  }

  private resetVariables() {
    this.text = "";
    this.textDataList = {};
    this.prevRoman = "";
    this.nextRoman = "";
    this.prevRomanList = [];
    this.nextRomanList = [];
    this.prevNextRomanList = {};
    this.missCount = 0;
    this.typingGame = undefined;
  }

  public gameStart() {
    window.console.log("Game Start");
    this.inGame = true;
    this.typingGame = new TypingGame();
    this.updateVariables();
  }

  public keyInput(event: KeyboardEvent) {
    // Escapeで中断
    if(event.key === "Escape"){
      this.inGame = false;
      this.resetVariables();
      return;
    }
    if(this.typingGame === undefined) return;
    this.typingGame.update(event.key);
    this.updateVariables();
    if(this.typingGame.isFinished()){
      this.inGame = false;
      this.typingGame = undefined;
      //this.prevRoman = "";
      //this.nextRoman = "";
    }
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
.gameMode {
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
.textLine {
  margin-top: 1px;
  margin-bottom: 1px;

  display: flex; /* 子要素をflexboxで揃える */
  flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  justify-content: flex-start; /* 子要素をflexboxにより左に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
  white-space: pre;
}
.prevText {
  word-break: break-all;
  color: #CCCCCC;
  margin-left: auto;
}
.nextText {
  word-break: break-all;
  color: #000000;
}
.invalid-text {
  word-break: break-all;
  color: #CCCCCC;
  margin-right: auto;
}
.missCount {
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
.romanLine {
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
.prevRoman {
  word-break: break-all;
  color: #CCCCCC;
}
.nextRoman {
  word-break: break-all;
  color: #000000;
}
</style>
