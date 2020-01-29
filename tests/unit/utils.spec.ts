
import { getRandomInt } from '@/lib/utils'

const loop = 100;

describe('getRandomInt(k)', () => {
  it('結果は0以上k未満の整数', () => {
    const k = 3;
    for (let i = 0; i < loop; ++i) {
      const rand = getRandomInt(k);
      expect(rand).toBeGreaterThanOrEqual(0);
      expect(rand).toBeLessThan(k);
      expect(rand % 1).toEqual(0);
    }
  })
});

describe('getRandomInt(a, b)', () => {
  it('結果はa以上b未満の整数', () => {
    const a = 10298;
    const b = 34857;
    for (let i = 0; i < loop; ++i) {
      const rand = getRandomInt(a, b);
      expect(rand).toBeGreaterThanOrEqual(a);
      expect(rand).toBeLessThan(b);
      expect(rand % 1).toEqual(0);
    }
  })
})

describe('front() and back()', () => {
  const arr: number[] = [12, 48, 83, 18, 7, 3, 981, 25];
  it('front()は先頭の要素を指す', () => {
    expect(arr.front()).toEqual(12);
  })
  it('back()は最後の要素を指す', () => {
    expect(arr.back()).toEqual(25);
  })
})