<template>
  <div class="timer">
    Time: {{ timeStr }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {
  @Prop({ default: false})
  private isValid!: boolean;

  @Prop({ default: false})
  private isFinished!: boolean;

  private _isValid: boolean = false;
  private _isFinished: boolean = false;

  private _startTime: number = 0;
  private elapsedTimeMs: number = 0;

  @Watch('isValid')
  public onIsValidChanged(newValue: boolean, oldValue: boolean){
    this._isValid = newValue;
    if(newValue === true && oldValue === false){
      this._startTime = Date.now();
      this.startRAFLoop();
    }
  }

  @Watch('isFinished')
  public onIsFinishedChanged(newValue: boolean, oldValue: boolean){
    this._isFinished = newValue;
    window.console.log(this.elapsedTimeMs);
    this.emitTime(this.elapsedTimeMs);
  }

  @Emit()
  public emitTime(timeMs: number){
    window.console.log("Emit Time");
  }

  private startRAFLoop() {
    window.requestAnimationFrame(this.calcTime);
  }

  public calcTime() {
    const nowTime = Date.now();
    this.elapsedTimeMs = nowTime - this._startTime;
    if(this._isValid){
      window.requestAnimationFrame(this.calcTime);
    }
  }

  public get timeStr(): string{
    return (Math.floor(this.elapsedTimeMs / 100) / 10).toFixed(1)
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
