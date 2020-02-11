import { calcUps, calcUpm } from '@/lib/typing-utils';

describe("calcUps", () => {
  it("10sで500カウントならば50ups", () => {
    const timeMs = 10 * 1000;
    const ups = calcUps(500, timeMs);
    expect(ups).toEqual(50);
  })
  it("0sならば0ups", () => {
    const ups = calcUps(0, 123);
    expect(ups).toEqual(0);
  })
});


describe('calcUpm', () => {
  it('20minで80カウントならば4upm', () => {
    const timeMs = 20 * 60 * 1000;
    const upm = calcUpm(80, timeMs);
    expect(upm).toEqual(4);
  })
  it("0sならば0upm", () => {
    const upm = calcUpm(0, 2098135);
    expect(upm).toEqual(0);
  })
})
