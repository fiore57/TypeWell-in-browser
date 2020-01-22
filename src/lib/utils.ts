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
