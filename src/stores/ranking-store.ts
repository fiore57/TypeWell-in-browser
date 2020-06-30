import { reactive } from "@vue/composition-api";
import { RankingDataLists, rankingData } from "../lib/ranking";
import { eMode } from "../lib/typeWell";

export default function rankingStore() {
  const state = reactive({
    rankingDataLists: new RankingDataLists(),
  });
  return {
    add(mode: eMode, data: rankingData) {
      state.rankingDataLists.add(mode, data);
    },
    getTop15(mode: eMode) {
      return state.rankingDataLists.getTop15(mode);
    },
  };
}

export type RankingStore = ReturnType<typeof rankingStore>;
