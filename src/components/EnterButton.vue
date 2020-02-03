<template>
  <div class="enter-button">
    <button @click="onClick" :disabled="!isValid" :class="{ disabledButton: isValid }">{{ text }}</button>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive, SetupContext, onBeforeMount, onBeforeUnmount} from "@vue/composition-api";

type Props = {
  text: string;
  isValid: boolean;
}

export default createComponent({
  props: {
    text: {
      type: String,
      default: "button"
    },
    isValid: {
      type: Boolean,
      default: true
    }
  },
  setup(props: Props, context: SetupContext){
    const onClick = () => {
      window.console.log("Click Event");
      context.emit("click");
    }
    const state = reactive({
      isValid: props.isValid
    });

    const keyInput = (event: KeyboardEvent) => {
      if(props.isValid){
        for(const key of ["Enter", " "]){
          if(event.key === key) {
            onClick();
            return;
          }
        }
      }
    };

    onBeforeMount(() => {
      window.addEventListener("keydown", keyInput, true);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", keyInput, true);
    });

    return {
      state,
      onClick
    };
  }
})
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
