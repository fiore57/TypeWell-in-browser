import { InjectionKey } from "@vue/composition-api";
import { ResultStore } from "../stores/result-store";

const ResultStoreKey: InjectionKey<ResultStore> = Symbol("ResultStore");
export default ResultStoreKey;
