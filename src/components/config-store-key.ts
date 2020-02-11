import { InjectionKey } from "@vue/composition-api";
import { ConfigStore } from "../stores/config-store";

const ConfigStoreKey: InjectionKey<ConfigStore> = Symbol("ConfigStore");
export default ConfigStoreKey;
