<template>
  <div class="timer">Time: {{ state.displayTime }}</div>
</template>

<script lang="ts">
import {
  createComponent,
  reactive,
  computed,
  watch,
  inject,
} from "@vue/composition-api";
import ResultStoreKey from "./result-store-key";
import { eTimerStatus } from "@/lib/typeWell";

type Props = {
  timerStatus: eTimerStatus;
};

export default createComponent({
  props: {
    timerStatus: {
      type: Number,
      default: eTimerStatus.Reset,
    },
  },
  setup(props: Props) {
    const resultStore = inject(ResultStoreKey);
    if (!resultStore) {
      throw new Error(`${ResultStoreKey} is not provided`);
    }

    const state = reactive({
      m_timerStatus: eTimerStatus.Reset,
      m_startTime: 0,
      m_elapsedTimeMs: 0,

      displayTime: computed((): string =>
        (Math.floor(state.m_elapsedTimeMs / 100) / 10).toFixed(1)
      ),
    });

    // props は reactive ではないので、arrow function で包む
    watch(
      () => props.timerStatus,
      (newVal: eTimerStatus, oldVal: eTimerStatus) => {
        state.m_timerStatus = newVal;
        // Reset -> Start (0秒から起動)
        if (newVal === eTimerStatus.Start && oldVal === eTimerStatus.Reset) {
          state.m_startTime = Date.now();
          startRAFLoop();
        }
        // Stop -> Start (現在の秒数から再開)
        else if (
          newVal === eTimerStatus.Start &&
          oldVal === eTimerStatus.Stop
        ) {
          state.m_startTime = Date.now() - state.m_elapsedTimeMs;
          startRAFLoop();
        }
        // Start -> Stop (中断)
        else if (
          newVal === eTimerStatus.Stop &&
          oldVal === eTimerStatus.Start
        ) {
          //emitTime(state.m_elapsedTimeMs);
        }
        // * -> Reset (リセット)
        else if (newVal === eTimerStatus.Reset) {
          state.m_elapsedTimeMs = 0;
        }
        // ???
        else {
          throw new Error("Unknown status");
        }
      }
    );

    function startRAFLoop() {
      window.requestAnimationFrame(calcTime);
    }
    function calcTime() {
      if (resultStore) resultStore.updateTimeMs(Date.now() - state.m_startTime);
      if (state.m_timerStatus === eTimerStatus.Start) {
        const nowTime = Date.now();
        state.m_elapsedTimeMs = nowTime - state.m_startTime;
        window.requestAnimationFrame(calcTime);
      }
    }

    return {
      state,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/variable.scss";
.timer {
  @include white-block;
  font-size: 2.2rem;
  padding: 0.2rem 1rem;
  margin: 1rem;
  width: 14rem;
}
</style>
