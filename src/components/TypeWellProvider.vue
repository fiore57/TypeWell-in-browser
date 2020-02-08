<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { provide } from "@vue/composition-api";
import resultStore from "../stores/result-store";
import configStore from "../stores/config-store";
import ResultStoreKey from "./result-store-key";
import ConfigStoreKey from "./config-store-key";

export default {
  setup() {
    provide(ResultStoreKey, resultStore());
    provide(ConfigStoreKey, configStore());
    return {};
  },
};
</script>