import { InjectionKey } from "@vue/composition-api";
import { RankingStore } from "../stores/ranking-store";

const RankingStoreKey: InjectionKey<RankingStore> = Symbol("RankingStore");
export default RankingStoreKey;
