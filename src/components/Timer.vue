<template>
  <div class="timer">
    Time: {{ displayTime }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';

export const enum eTimerStatus{
  Reset, Start, Stop
}

@Component
export default class Timer extends Vue {
  @Prop({ default: eTimerStatus.Reset })
  private timerStatus!: eTimerStatus;

  private m_timerStatus: eTimerStatus = eTimerStatus.Reset;

  private m_startTime: number = 0;
  private m_elapsedTimeMs: number = 0;

  @Watch('timerStatus')
  public onTimerStatusChanged(newValue: eTimerStatus, oldValue: eTimerStatus){
    this.m_timerStatus = newValue;
    // Reset -> Start (0秒から起動)
    if(newValue === eTimerStatus.Start && oldValue === eTimerStatus.Reset){
      this.m_startTime = Date.now();
      this.startRAFLoop();
    }
    // Stop -> Start (現在の秒数から再開)
    else if(newValue === eTimerStatus.Start && oldValue === eTimerStatus.Stop){
      this.m_startTime = Date.now() - this.m_elapsedTimeMs;
      this.startRAFLoop();
    }
    // Start -> Stop (中断・タイムを送信)
    else if(newValue === eTimerStatus.Stop && oldValue === eTimerStatus.Start){
      this.emitTime(this.m_elapsedTimeMs);
    }
    // * -> Reset (リセット)
    else if(newValue === eTimerStatus.Reset){
      this.m_elapsedTimeMs = 0;
    }
    // ???
    else {
      throw new Error("Unknown status");
    }
  }

  @Emit()
  public emitTime(timeMs: number){}

  private startRAFLoop() {
    window.requestAnimationFrame(this.calcTime);
  }

  private calcTime() {
    if(this.m_timerStatus === eTimerStatus.Start){
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
