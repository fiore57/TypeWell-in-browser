<template>
  <div class="ranking">
    <h3>Top15 ランキング</h3>
    <div class="ranking-table">
      <table>
        <tr>
          <th>Rk</th>
          <th>Time</th>
          <th>Lv</th>
          <th colspan="8">Lap</th>
          <th>Ms</th>
          <th>Date</th>
        </tr>
        <tr
          class="ranking-row"
          v-for="data in state.rankingTop15"
          :key="data.key"
        >
          <td class="ranking-rank">{{ data.value.rank }}</td>
          <td class="ranking-time">{{ data.value.timeMs }}</td>
          <td class="ranking-level">{{ data.value.levelStr }}</td>
          <td
            class="ranking-lap"
            v-for="lapTime in data.value.lapTimeMsList"
            :key="lapTime.key"
            >{{ lapTime.value }}</td
          >
          <td class="ranking-miss">{{ data.value.missCount }}</td>
          <td class="ranking-date">{{ data.value.date }}</td>
        </tr>
      </table>

      <p>※開発中のため、リロードすると記録が消えます。ご了承ください</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  inject,
} from "@vue/composition-api";
import RankingStoreKey from "./ranking-store-key";
import { eMode } from "@/lib/typeWell";
import { displayRankingData } from "@/lib/ranking"; // eslint-disable-line no-unused-vars
import { addKey, KeyValue } from "@/lib/utils"; // eslint-disable-line no-unused-vars

type Props = {
  timeMs: number;
};

export default defineComponent({
  props: {
    timeMs: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const rankingStore = inject(RankingStoreKey);
    if (!rankingStore) {
      throw new Error(`${RankingStoreKey} is not provided`);
    }

    const state = reactive({
      curMode: eMode.Khjy,
      rankingTop15: computed((): KeyValue<{}>[] => {
        const top15Data = rankingStore.getTop15(state.curMode);
        const ret = top15Data.map((rankingData, index) => {
          return {
            rank: rankingData.rank,
            timeMs: rankingData.timeMs,
            levelStr: rankingData.levelStr,
            lapTimeMsList: addKey(
              rankingData.lapTimeMsList,
              `top15RankingLapTime${index}-`
            ),
            missCount: rankingData.missCount,
            date: rankingData.date,
          };
        });
        console.log(addKey(ret, "top15Ranking"));
        return addKey(ret, "top15Ranking");
      }),
    });

    return {
      state,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ranking {
  padding: 1rem 1rem 2rem 1rem;
  margin: 4rem auto;
  .ranking-table {
    table {
      margin: 1rem auto;
      border-collapse: collapse;
      tr {
        font-size: 1.8rem;
        th {
          border: solid 0.1rem black;
          background-color: #eee;
        }
        border: double 0.1rem black;
        td {
          width: 6rem;
          border: solid 0.1rem black;
        }
      }
    }
    .ranking-rank {
      width: 3rem;
    }
    .ranking-time {
      width: 7rem;
    }
    .ranking-level {
      width: 4rem;
    }
    .ranking-miss {
      width: 4rem;
    }
    .ranking-date {
      width: 20rem;
    }
  }
}
</style>
