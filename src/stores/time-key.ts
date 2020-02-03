import { InjectionKey } from "@vue/composition-api";
import { TimeStore } from "./store";

const TimeStoreKey: InjectionKey<TimeStore> = Symbol("TimeStore");
export default TimeStoreKey;
