<template>
  <div class="type-well-button">
    <button @click="onClick" :disabled="!state.isValid" :class="{ disabledButton: state.isValid }">{{ state.text }}</button>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive, computed, SetupContext, onBeforeMount, onBeforeUnmount } from "@vue/composition-api";

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
    const state = reactive({
      isValid: computed(() => props.isValid),
      text: computed(() => props.text),
    });

    function keyInput(event: KeyboardEvent) {
      if(state.isValid){
        // Enter or Space で発火
        for(const key of ["Enter", " "]){
          if(event.key === key) {
            onClick();
            return;
          }
        }
      }
    }

    function onClick() {
      context.emit("click");
    }

    onBeforeMount(() => {
      window.addEventListener("keydown", keyInput, true);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("keydown", keyInput, true);
    });

    return {
      state,
      onClick,
    };
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button {
  width: 10rem;
  height: 3rem;
  font-size: 1.8rem;
  margin: 1rem 2rem;
}
</style>
