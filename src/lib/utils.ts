/** get randum integer [min, max) */
export function getRandomInt(min: number, max: number): number;
/** get random integer [0, max) */
export function getRandomInt(max: number): number;
export function getRandomInt(val1: number, val2?: number): number {
  if (val2 !== undefined) {
    const min = Math.ceil(val1);
    const max = Math.floor(val2);
    return Math.floor(Math.random() * (max - min)) + min;
  } else {
    return getRandomInt(0, val1);
  }
}

declare global {
  interface Array<T> {
    front(): T;
    back(): T;
    empty(): boolean;
  }
  interface ReadonlyArray<T> {
    front(): T;
    back(): T;
    empty(): boolean;
  }
}
/** 配列の最初の要素を返す */
(Array.prototype as any).front = function() {
  return this[0];
};
/** 配列の最後の要素を返す */
(Array.prototype as any).back = function() {
  return this[this.length - 1];
};
/** 配列が空であるかどうかを返す */
(Array.prototype as any).empty = function() {
  return this.length === 0;
};

/** val を [low, high] に収める
 *
 * @param val 値
 * @param low 下端の値
 * @param high 上端の値
 */
export function clamp(val: number, low: number, high: number): number {
  return Math.min(Math.max(val, low), high);
}

/**
 * 引数は整数にすること！！！
 *
 * @param val 整数
 * @param step 整数
 * @return valを越えない最小のstepの倍数を返す
 */
export function step(val: number, step: number): number {
  return Math.floor(val / step) * step;
}

export interface KeyValue<T> {
  key: string;
  value: T;
}

/**
 * @param val keyを付与したいオブジェクト
 * @param keyName keyの名前
 * @param index オブジェクトのindex
 * @return keyが付与されたオブジェクト
 */
function addKeyImpl<T>(val: T, keyName: string, index: number): KeyValue<T> {
  return { key: keyName + index, value: val };
}

/**
 * @param array keyを付与したい配列
 * @param keyName keyの名前
 * @return 各要素にkeyが付与された配列
 */
export function addKey<T>(array: T[], keyName: string): KeyValue<T>[] {
  return array.map((e, index) => addKeyImpl(e, keyName, index));
}

/**
 * @param date Date.now()で取得した整数
 * @return yyyy/mm/dd hh:mm:ss 形式の文字列
 */
export function convertDateToString(dateNum: number) {
  const date = new Date();
  date.setTime(dateNum);
  const y = date
    .getFullYear()
    .toString()
    .padStart(4, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date
    .getDate()
    .toString()
    .padStart(2, "0");
  const hr = date
    .getHours()
    .toString()
    .padStart(2, "0");
  const min = date
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const sec = date
    .getSeconds()
    .toString()
    .padStart(2, "0");
  return `${y}/${m}/${d} ${hr}:${min}:${sec}`;
}
