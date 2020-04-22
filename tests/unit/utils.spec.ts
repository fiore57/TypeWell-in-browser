import { getRandomInt, clamp, step } from "@/lib/utils";

const loop = 100;

describe("getRandomInt(k)", () => {
  it("結果は0以上k未満の整数", () => {
    const k = 3;
    for (let i = 0; i < loop; ++i) {
      const rand = getRandomInt(k);
      expect(rand).toBeGreaterThanOrEqual(0);
      expect(rand).toBeLessThan(k);
      expect(rand % 1).toEqual(0);
    }
  });
});

describe("getRandomInt(a, b)", () => {
  it("結果はa以上b未満の整数", () => {
    const a = 10298;
    const b = 34857;
    for (let i = 0; i < loop; ++i) {
      const rand = getRandomInt(a, b);
      expect(rand).toBeGreaterThanOrEqual(a);
      expect(rand).toBeLessThan(b);
      expect(rand % 1).toEqual(0);
    }
  });
});

describe("front() and back()", () => {
  const arr: number[] = [12, 48, 83, 18, 7, 3, 981, 25];
  it("front()は先頭の要素を指す", () => {
    expect(arr.front()).toEqual(12);
  });
  it("back()は最後の要素を指す", () => {
    expect(arr.back()).toEqual(25);
  });
});
describe("empty()", () => {
  const arr1: number[] = [1];
  const arr2: number[] = [];
  it("[1]は空ではない", () => {
    expect(arr1.empty()).toEqual(false);
  });
  it("[]は空である", () => {
    expect(arr2.empty()).toEqual(true);
  });
});

describe("clamp(val, low, high)", () => {
  const low = 35;
  const high = 93.2;
  it("val < low ならば戻り値は low", () => {
    expect(clamp(34.999999, low, high)).toEqual(low);
  });
  it("low <= val <= high ならば戻り値は val", () => {
    const val1 = 35.000001;
    const val2 = 93.199999;
    expect(clamp(val1, low, high)).toEqual(val1);
    expect(clamp(val2, low, high)).toEqual(val2);
  });
  it("high < val ならば戻り値は high", () => {
    expect(clamp(93.200001, low, high)).toEqual(high);
  });
});

describe("step(val, step)", () => {
  it("戻り値は val を超えない最小の step の倍数", () => {
    expect(step(512, 10)).toEqual(510);
    expect(step(42.8, 2.5)).toEqual(42.5);
    expect(step(48, 2)).toEqual(48);
  });
});
