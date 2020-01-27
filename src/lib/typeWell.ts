enum eLevel {
  None,
  J, I, H, G, F, E, D, C, B, A,
  SJ, SI, SH, SG, SF, SE, SD, SC, SB, SA, SS,
  XJ, XI, XH, XG, XF, XE, XD, XC, XB, XA, XS, XX,
  ZJ, ZI, ZH, ZG, ZF, ZE, ZD, ZC, ZB, ZA, ZS, ZX, ZZ,
  M1, M2, M3, M4,
}

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
  window.console.log(levelNum);
  const level: eLevel = levelNum;
  window.console.log(level);
  return level;
}

export function getLevelStr(timeMs: number): string {
  const level: eLevel = getLevel(timeMs);
  window.console.log(level);
  const levelStr: string = eLevel[level];
  window.console.log(levelStr);
  return levelStr === eLevel[eLevel.None] ? "-" : levelStr;
}