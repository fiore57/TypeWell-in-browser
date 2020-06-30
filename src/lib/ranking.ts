import { eMode, eLevel, getLevelStr } from "./typeWell";
import { convertDateToString } from "./utils";

export interface rankingData {
  timeMs: number;
  lapTimeMsList: number[];
  missCount: number;
  date: number;
}

export interface displayRankingData {
  rank: number;
  timeMs: string;
  levelStr: string;
  lapTimeMsList: string[];
  missCount: string;
  date: string;
}

export class RankingDataLists {
  private rankingDataLists: rankingData[][] = [[], [], [], []];
  // TODO: ちゃんとソートされているかのテストを追加
  public add(mode: eMode, data: rankingData) {
    this.rankingDataLists[mode].push(data);
    this.rankingDataLists[mode].sort((lhs, rhs) => {
      // タイムの昇順→ミス数の昇順でソート
      return lhs.timeMs !== rhs.timeMs
        ? lhs.timeMs - rhs.timeMs
        : lhs.missCount - rhs.missCount;
    });
    console.log(this.rankingDataLists[mode]);
  }
  public getTop15(mode: eMode): displayRankingData[] {
    const endIndex = Math.min(15, this.rankingDataLists[mode].length);
    const ret: displayRankingData[] = [];
    this.rankingDataLists[mode]
      .slice(0, endIndex)
      .forEach((rankingData, index) => {
        const data = {
          rank: index + 1,
          timeMs: rankingData.timeMs.toString(),
          levelStr: getLevelStr(rankingData.timeMs),
          lapTimeMsList: rankingData.lapTimeMsList.map((lap) => lap.toString()),
          missCount: rankingData.missCount.toString(),
          date: convertDateToString(rankingData.date),
        };
        ret.push(data);
      });
    while (ret.length < 15) {
      const data = {
        rank: ret.length + 1,
        timeMs: "",
        levelStr: "",
        lapTimeMsList: Array(8).fill("") as string[],
        missCount: "",
        date: "",
      };
      ret.push(data);
    }
    return ret;
  }
}
