<template>
  <div class="type-well">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <div class="timer"></div>
    <button @click="gameStart" @keyup.enter="gameStart" :disabled="inGame" :class="{ disabledButton: inGame }">READY</button>
    <p>{{ inGame }}</p>

    <div class="text">
      <div class="japanese">
        <p v-if="inGame">{{ japanese }}</p>
      </div>

      <div class="roman">
        <p v-if="inGame">{{ roman }}</p>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TypingGame from '@/lib/typing';

@Component
export default class TypeWell extends Vue {
  @Prop() private msg!: string;
  public readonly title: string = "基本常用語";
  public readonly description: string = "※このアプリは非公式です"
  public inGame: boolean = false;
  public typingGame?: TypingGame;
  public japanese: string = "";

  public gameStart() {
    window.console.log("Game Start");
    this.inGame = true;
    window.console.log(this.inGame);
    this.typingGame = new TypingGame("かさ");
    this.japanese = this.typingGame.text;
  }

  public keyInput(event: KeyboardEvent) {
    if(this.typingGame === undefined) return;
    this.typingGame.update(event.key);
    window.console.log(event.key);
    if(this.typingGame.isFinished()){
      this.inGame = false;
      this.typingGame = undefined;
    }
  }

  beforeMount() {
    window.addEventListener('keydown', this.keyInput, true);
  }

  beforeDestroy() {
    window.removeEventListener('keydown', this.keyInput, true);
  }

  public get roman() {
    return this.typingGame === undefined ? "" : this.typingGame.roman;
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
</style>
