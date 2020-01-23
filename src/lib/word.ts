import Words from '@/dat/words.json';
import { getRandomInt } from './utils';

export default class TypingWords {
  //private static _khjy = Words.test;
  private static _khjy = Words.khjy;
  public static getWord() {
    const rand = getRandomInt(this._khjy.length);
    return this._khjy[rand];
  }
}