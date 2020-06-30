<template>
  <div class="type-well-button">
    <button
      @click="onClick"
      :disabled="!state.isValid"
      :class="{ disabledButton: state.isValid }"
    >
      {{ state.text }}
    </button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  onBeforeMount,
  onBeforeUnmount,
} from "@vue/composition-api";

type Props = {
  text: string;
  isValid: boolean;
  keyList: readonly string[];
};

export default defineComponent({
  props: {
    text: {
      type: String,
      default: "button",
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    keyList: {
      type: Array,
      default: [],
    },
  },
  setup(props: Props, context) {
    const state = reactive({
      isValid: computed(() => props.isValid),
      text: computed(() => props.text),
      keyList: computed(() => props.keyList),
    });

    function keyInput(event: KeyboardEvent) {
      if (state.isValid) {
        // 指定のショートカットキーで発火
        for (const key of state.keyList) {
          if (event.key === key) {
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
  },
});
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
