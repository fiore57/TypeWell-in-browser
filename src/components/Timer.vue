<template>
  <div class="timer">
    Time: {{ displayTime }}
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

  private m_isValid: boolean = false;
  private m_isFinished: boolean = false;

  private m_startTime: number = 0;
  private m_elapsedTimeMs: number = 0;

  @Watch('isValid')
  public onIsValidChanged(newValue: boolean, oldValue: boolean){
    this.m_isValid = newValue;
    window.console.log(this.m_isValid);
    // false -> true（起動）
    if(newValue === true && oldValue === false){
      this.m_startTime = Date.now();
      this.startRAFLoop();
    }
    // true -> false && 終了ではない （リセット）
    else if(newValue === false && oldValue === true && this.isFinished === false){
      // reset
      this.m_elapsedTimeMs = 0;
    }
  }

  @Watch('isFinished')
  public onIsFinishedChanged(newValue: boolean, oldValue: boolean){
    this.m_isFinished = newValue;
    // false -> true（終了）
    if(newValue === true && oldValue === false){
      this.emitTime(this.m_elapsedTimeMs);
      if(!this.isValid){
        // reset
        this.m_elapsedTimeMs = 0;
      }
    }
  }

  @Emit()
  public emitTime(timeMs: number){
    window.console.log("Emit Time");
  }

  private startRAFLoop() {
    window.requestAnimationFrame(this.calcTime);
  }

  private calcTime() {
    if(this.m_isValid){
      const nowTime = Date.now();
      this.m_elapsedTimeMs = nowTime - this.m_startTime;
      window.requestAnimationFrame(this.calcTime);
    }
  }

  public get displayTime(): string{
    return (Math.floor(this.m_elapsedTimeMs / 100) / 10).toFixed(1)
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
