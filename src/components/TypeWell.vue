<template>
  <div class="type-well">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <Timer :isValid="inGame"></Timer>
    <button @click="gameStart" @keyup.enter="gameStart" :disabled="inGame" :class="{ disabledButton: inGame }">READY</button>

    <div class="text">
      <div class="japanese">
        <p v-if="inGame">{{ japanese }}</p>
      </div>

      <div class="roman">
        <div v-if="inGame" class="prevRoman">{{ prevRoman }}</div>
        <div v-if="inGame" class="nextRoman"> {{ nextRoman }}</div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TypingGame from '@/lib/typing';
import Timer from './Timer.vue';

@Component({
  components: {
    Timer,
  },
})
export default class TypeWell extends Vue {
  @Prop() private msg!: string;
  public readonly title: string = "基本常用語";
  public readonly description: string = "※このアプリは非公式です"
  public inGame: boolean = false;
  public typingGame?: TypingGame;
  public japanese: string = "";
  public prevRoman: string = "";
  public nextRoman: string = "";

  public gameStart() {
    window.console.log("Game Start");
    this.inGame = true;
    window.console.log(this.inGame);
    this.typingGame = new TypingGame("どうでしょう　ちゃきゃびゃふぃ");
    this.japanese = this.typingGame.text;
    this.prevRoman = this.typingGame.prevRoman;
    this.nextRoman = this.typingGame.nextRoman;
  }

  public keyInput(event: KeyboardEvent) {
    if(this.typingGame === undefined) return;
    this.typingGame.update(event.key);
    this.prevRoman = this.typingGame.prevRoman;
    this.nextRoman = this.typingGame.nextRoman;
    window.console.log(event.key);
    window.console.log("prev: " + this.typingGame.prevRoman);
    window.console.log("next: " + this.typingGame.nextRoman);
    if(this.typingGame.isFinished()){
      this.inGame = false;
      this.typingGame = undefined;
      this.prevRoman = "";
      this.nextRoman = "";
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
.roman {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  display: flex; /* 子要素をflexboxで揃える */
  flex-direction: row; /* 子要素をflexboxにより横方向に揃える */
  justify-content: center; /* 子要素をflexboxにより中央に配置する */
  align-items: center;  /* 子要素をflexboxにより中央に配置する */
  width: 200px; /* 見た目用 */
  height: 50px; /* 見た目用 */
  border: 1px solid; /* 見た目用 */;
}
.prevRoman {
  color: #CCCCCC;
}
.nextRoman {
  color: #000000;

}
</style>
