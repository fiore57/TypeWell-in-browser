// get randum integer [min, max)
export function getRandomInt(min: number, max: number): number;
// get random integer [0, max)
export function getRandomInt(max: number): number;
export function getRandomInt(val1: number, val2?: number): number {
  if (val2 !== undefined) {
    const min = Math.ceil(val1);
    const max = Math.floor(val2);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  else {
    return getRandomInt(0, val1);
  }
}

declare global {
  interface Array<T> {
    front(): T;
    back(): T;
  }
}
/** 配列の最初の要素を返す（右辺値） */
(Array.prototype as any).front = function () { return this[0]; };
/** 配列の最後の要素を返す（右辺値） */
(Array.prototype as any).back = function () { return this[this.length - 1]; };
