<template>
  <div class="enter-button">
    <button @click="onClick" :disabled="!isValid" :class="{ disabledButton: isValid }">{{ text }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EnterButton extends Vue {
  @Prop({ default: "button" })
  private text!: string;

  @Prop({ default: true })
  private isValid!: boolean;

  @Emit("click")
  public onClick() {}

  public keyInput(event: KeyboardEvent) {
    if(this.isValid && event.key === "Enter"){
      this.onClick();
    }
  }

  beforeMount() {
    window.addEventListener("keydown", this.keyInput, true);
  }

  beforeDestroy() {
    window.removeEventListener("keydown", this.keyInput, true);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

button {
  width: 100px;
  height: 30px;
  font-size: 18px;
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}

</style>
