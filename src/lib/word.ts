import Khjy from '@/dat/khjy.json';
import Ktkn from '@/dat/ktkn.json';
import Knj from '@/dat/knj.json';
import Ktwz from '@/dat/ktwz.json';
import { eMode } from './typeWell';
import { getRandomInt } from './utils';

export default class TypingWords {
  private static _words = [Khjy.list, Ktkn.list, Knj.list, Ktwz.list];
  public static getWord(mode: eMode) {
    const wordList = this._words[mode];
    const rand = getRandomInt(wordList.length);
    return wordList[rand];
  }
}