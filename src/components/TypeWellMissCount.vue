<template>
  <div class="miss-count">Miss: {{ state.missCount }}</div>
</template>

<script lang="ts">
import { createComponent, reactive, computed } from "@vue/composition-api";

type Props = {
  missCount: number;
};

export default createComponent({
  props: {
    missCount: {
      type: Number,
      default: 0,
    },
  },
  setup(props: Props) {
    const state = reactive({
      missCount: computed(() => props.missCount),
    });

    return {
      state,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/variable.scss";
.miss-count {
  margin: 0.2rem 3rem 0.2rem auto;
  font-size: 1.8rem;
}
</style>
