import type { InjectionKey } from 'vue'
import type { ResultStore } from '../stores/result-store'

const ResultStoreKey: InjectionKey<ResultStore> = Symbol('ResultStore')

export default ResultStoreKey
