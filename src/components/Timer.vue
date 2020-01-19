<template>
  <div class="timer">
    <p>{{ Math.floor(elapsedTime / 100) / 10 }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {
  @Prop() private isValid!: boolean;
  private _isValid: boolean = false;
  private _startTime: number = 0;
  public elapsedTime: number = 0;

  @Watch('isValid')
  public onIsValidChanged(newValue: boolean, oldValue: boolean){
    this._isValid = newValue;
    if(newValue === true){
      window.console.log("onIsValidChanged");
      this._startTime = Date.now();
      window.console.log(this._startTime);
      this.startRAFLoop();
    }
  }

  private startRAFLoop() {
    window.requestAnimationFrame(this.calcTime);
    window.console.log('RAF loop start');
  }

  public calcTime() {
    const nowTime = Date.now();
    this.elapsedTime = nowTime - this._startTime;
    window.console.log(this._isValid);
    if(this._isValid){
      window.requestAnimationFrame(this.calcTime);
    }
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
