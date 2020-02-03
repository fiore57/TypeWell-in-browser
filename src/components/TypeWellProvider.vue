<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { provide } from "@vue/composition-api";
import timerStore from "../stores/store";
import TimeStoreKey from "../stores/time-key";

export default {
  setup() {
    provide(TimeStoreKey, timerStore());
    return {};
  },
};
</script>