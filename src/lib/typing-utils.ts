/**
 * Unit per second を得る
 *
 * timeMs == 0 のとき、ups == 0
 */
export function calcUps(count: number, timeMs: number): number {
  return timeMs == 0 ? 0 : count * 1000 / timeMs;
}

/**
 * Unit per minute を得る
 *
 * timeMs == 0 のとき、upm == 0
 */
export function calcUpm(count: number, timeMs: number): number {
  return calcUps(count, timeMs) * 60;
}