import type { InjectionKey } from 'vue'
import type { ConfigStore } from '../stores/config-store'

const ConfigStoreKey: InjectionKey<ConfigStore> = Symbol('ConfigStore')

export default ConfigStoreKey
