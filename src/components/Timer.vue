<template>
  <div class="timer">
    Time: {{ (Math.floor(elapsedTime / 100) / 10).toFixed(1) }}
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
    if(newValue === true && oldValue === false){
      this._startTime = Date.now();
      this.startRAFLoop();
    }
  }

  private startRAFLoop() {
    window.requestAnimationFrame(this.calcTime);
  }

  public calcTime() {
    const nowTime = Date.now();
    this.elapsedTime = nowTime - this._startTime;
    if(this._isValid){
      window.requestAnimationFrame(this.calcTime);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.timer {
  font-size: 22px;
  border: 1px solid;
  padding: 2px 10px;
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  width: 130px;
}
</style>
