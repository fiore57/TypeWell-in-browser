<template>
  <div class="config">
    <h3>設定</h3>
    カウントダウン（0～3秒）：
    <input class="number-input" v-model.number="countdownTime" type="number" min="0" max="3" step="1">秒
  </div>
</template>

<script lang="ts">
import { Component, Emit, Watch, Vue } from 'vue-property-decorator';

export class ConfigData {
  public countdownTime: number = 3;
}

@Component
export default class Config extends Vue {
  public configData: ConfigData = new ConfigData();

  public get countdownTime(): number {
    return this.configData.countdownTime;
  }
  public set countdownTime(value: number) {
    this.configData.countdownTime = value;
    this.emitData(this.configData);
  }

  @Emit()
  public emitData(data: ConfigData){}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.config {
  font-size: 1.6em;
  margin: 3em auto 1em auto;
  width: 400px;
}
.number-input{
  font-size: 1em;
}
</style>
