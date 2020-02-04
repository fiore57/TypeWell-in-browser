<template>
  <div class="config">
    <h3>設定</h3>
    カウントダウン（0～3秒）：
    <input class="number-input" v-model.number="state.countdownTime" type="number" min="0" max="3" step="1">秒
  </div>
</template>

<script lang="ts">
import { createComponent, reactive, computed, SetupContext, onBeforeMount, onBeforeUnmount } from "@vue/composition-api";

export class ConfigData {
  public countdownTime: number = 3;
}

export default createComponent({
  // context は第2引数にすること！！！
  setup(_props, context: SetupContext){
    let configData = new ConfigData();

    const state = reactive({
      countdownTime: computed({
        get: (): number => {
          return configData.countdownTime;
        },
        set: (val: number) => {
          configData.countdownTime = val;
          emitData(configData);
        }
      })
    });

    function emitData(data: ConfigData) {
      context.emit("updated", data);
    }

    return {
      state,
    };
  }
})
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
