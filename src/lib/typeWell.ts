export const enum eMode {
  Khjy,
  Ktkn,
  Knj,
  Ktwz
}

export enum eLevel {
  None,
  J,
  I,
  H,
  G,
  F,
  E,
  D,
  C,
  B,
  A,
  SJ,
  SI,
  SH,
  SG,
  SF,
  SE,
  SD,
  SC,
  SB,
  SA,
  SS,
  XJ,
  XI,
  XH,
  XG,
  XF,
  XE,
  XD,
  XC,
  XB,
  XA,
  XS,
  XX,
  ZJ,
  ZI,
  ZH,
  ZG,
  ZF,
  ZE,
  ZD,
  ZC,
  ZB,
  ZA,
  ZS,
  ZX,
  ZZ,
  M1,
  M2
}

/** レベル（文字列）を列挙型に変換する */
export function convertLevelToEnum(levelStr: string): eLevel {
  return (<any>eLevel)[levelStr];
}
/** レベル（列挙型）を文字列に変換する */
export function convertLevelToString(level: eLevel): string {
  return level === eLevel.None ? "なし" : eLevel[level];
}

export const levelDataList = Object.keys(eLevel).reduce((acc: {}[], cur) => {
  if (isNaN(Number(cur))) {
    if (cur === "None") cur = "-";
    acc.push({ string: cur, key: `eLevel${cur}` });
  }
  return acc;
}, []);

/** タイムからレベルを取得 */
export function getLevel(timeMs: number): eLevel {
  const time = timeMs / 1000;
  if (time <= 0) return eLevel.None;
  if (time > 206) return eLevel.None;
  if (time > 184) return eLevel.J;
  if (time > 164) return eLevel.I;
  if (time > 146) return eLevel.H;
  if (time > 130) return eLevel.G;
  if (time > 116) return eLevel.F;
  if (time > 104) return eLevel.E;
  if (time > 94) return eLevel.D;
  if (time > 86) return eLevel.C;
  if (time > 80) return eLevel.B;
  if (time > 76) return eLevel.A;
  const levelNum: number = Math.floor(eLevel.SJ + (76 - time) / 2);
  const level: eLevel = levelNum;
  return level;
}

/** レベルからレベルの文字列を取得 */
export function getLevelStr(timeMs: number): string {
  const level: eLevel = getLevel(timeMs);
  const levelStr: string = eLevel[level];
  return levelStr === eLevel[eLevel.None] ? "-" : levelStr;
}

/** そのレベルに達するためのタイムを取得 */
export function getTimeMs(level: eLevel): number {
  let time: number = 0;
  switch (level) {
    case eLevel.None:
      time = 0;
      break;
    case eLevel.J:
      time = 206;
      break;
    case eLevel.I:
      time = 184;
      break;
    case eLevel.H:
      time = 164;
      break;
    case eLevel.G:
      time = 146;
      break;
    case eLevel.F:
      time = 130;
      break;
    case eLevel.E:
      time = 116;
      break;
    case eLevel.D:
      time = 104;
      break;
    case eLevel.C:
      time = 94;
      break;
    case eLevel.B:
      time = 86;
      break;
    case eLevel.A:
      time = 80;
      break;
    case eLevel.SJ:
      time = 76;
      break;
    default: {
      time = 76 - (level - eLevel.SJ) * 2;
    }
  }
  return Math.max(time * 1000, 0);
}
