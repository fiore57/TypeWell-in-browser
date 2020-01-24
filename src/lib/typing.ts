// typing.ts
// タイピングゲーム作成支援 TypeScript ライブラリ
//
// 複数の入力方法があって面倒なローマ字入力の処理を行います。
// TypeScriptで簡単にタイピングゲームを作ることができます。
// MS-IMEのローマ字入力規則に準拠しているつもりです。
//
// 参考（仕組みとか）
// http://mekiku.com/view.php?a=53
// （私がタイピングゲームを作るときは、だいたいこのサイトのような処理を書いています）
//
// 既知の不具合
// ・「んん」のあとにa/i/u/e/o/nが来る場合でも「nnn」で「んん」と入力できてしまう（対応が面倒なので保留）
// ・「っっっｋ」のように、子音字を連打することで「っ」を並べる入力ができない（同上）
//
// ライセンス
// MIT

import TypingWords from '@/lib/word';

// 全入力パターンのmapを保持するクラス
class ChunkPattern {
  static list = new Map([
    ['あ', [['a']]],
    ['い', [['i'], ['yi']]],
    ['う', [['u'], ['wu'], ['whu']]],
    ['え', [['e']]],
    ['お', [['o']]],
    ['うぁ', [['wha']]],
    ['うぃ', [['wi'], ['whi']]],
    ['うぇ', [['we'], ['whe']]],
    ['うぉ', [['who']]],
    ['ゐ', [['wi']]],
    ['ゑ', [['we']]],
    ['ぁ', [['la'], ['xa']]],
    ['ぃ', [['li'], ['xi'], ['lyi'], ['xyi']]],
    ['ぅ', [['lu'], ['xu']]],
    ['ぇ', [['le'], ['xe'], ['lye'], ['xye']]],
    ['ぉ', [['lo'], ['xo']]],
    ['ぃぇ', [['ye']]],
    ['か', [['ka'], ['ca']]],
    ['き', [['ki']]],
    ['く', [['ku'], ['cu'], ['qu']]],
    ['け', [['ke']]],
    ['こ', [['ko'], ['co']]],
    ['きゃ', [['kya']]],
    ['きぃ', [['kyi']]],
    ['きゅ', [['kyu']]],
    ['きぇ', [['kye']]],
    ['きょ', [['kyo']]],
    ['くゃ', [['qya']]],
    ['くゅ', [['qyu']]],
    ['くょ', [['qyo']]],
    ['くぁ', [['qa'], ['qwa'], ['kwa']]],
    ['くぃ', [['qi'], ['qwi'], ['qyi']]],
    ['くぅ', [['qwu']]],
    ['くぇ', [['qe'], ['qwe'], ['qye']]],
    ['くぉ', [['qo'], ['qwo']]],
    ['が', [['ga']]],
    ['ぎ', [['gi']]],
    ['ぐ', [['gu']]],
    ['げ', [['ge']]],
    ['ご', [['go']]],
    ['ぎゃ', [['gya']]],
    ['ぎぃ', [['gyi']]],
    ['ぎゅ', [['gyu']]],
    ['ぎぇ', [['gye']]],
    ['ぎょ', [['gyo']]],
    ['ぐぁ', [['gwa']]],
    ['ぐぃ', [['gwi']]],
    ['ぐぅ', [['gwu']]],
    ['ぐぇ', [['gwe']]],
    ['ぐぉ', [['gwo']]],
    ['ヵ', [['lka'], ['xka']]],
    ['ヶ', [['lke'], ['xke']]],
    ['さ', [['sa']]],
    ['し', [['si'], ['ci'], ['shi']]],
    ['す', [['su']]],
    ['せ', [['se'], ['ce']]],
    ['そ', [['so']]],
    ['しゃ', [['sya'], ['sha']]],
    ['しぃ', [['syi']]],
    ['しゅ', [['syu'], ['shu']]],
    ['しぇ', [['sye'], ['she']]],
    ['しょ', [['syo'], ['sho']]],
    ['すぁ', [['swa']]],
    ['すぃ', [['swi']]],
    ['すぅ', [['swu']]],
    ['すぇ', [['swe']]],
    ['すぉ', [['swo']]],
    ['ざ', [['za']]],
    ['じ', [['zi'], ['ji']]],
    ['ず', [['zu']]],
    ['ぜ', [['ze']]],
    ['ぞ', [['zo']]],
    ['じゃ', [['ja'], ['zya'], ['jya']]],
    ['じぃ', [['zyi'], ['jyi']]],
    ['じゅ', [['ju'], ['zyu'], ['jyu']]],
    ['じぇ', [['je'], ['zye'], ['jye']]],
    ['じょ', [['jo'], ['zyo'], ['jyo']]],
    ['た', [['ta']]],
    ['ち', [['ti'], ['chi']]],
    ['つ', [['tu'], ['tsu']]],
    ['て', [['te']]],
    ['と', [['to']]],
    ['ちゃ', [['tya'], ['cha'], ['cya']]],
    ['ちぃ', [['tyi'], ['cyi']]],
    ['ちゅ', [['tyu'], ['chu'], ['cyu']]],
    ['ちぇ', [['tye'], ['che'], ['cye']]],
    ['ちょ', [['tyo'], ['cho'], ['cyo']]],
    ['つぁ', [['tsa']]],
    ['つぃ', [['tsi']]],
    ['つぇ', [['tse']]],
    ['つぉ', [['tso']]],
    ['てゃ', [['tha']]],
    ['てぃ', [['thi']]],
    ['てゅ', [['thu']]],
    ['てぇ', [['the']]],
    ['てょ', [['tho']]],
    ['とぁ', [['twa']]],
    ['とぃ', [['twi']]],
    ['とぅ', [['twu']]],
    ['とぇ', [['twe']]],
    ['とぉ', [['two']]],
    ['だ', [['da']]],
    ['ぢ', [['di']]],
    ['づ', [['du']]],
    ['で', [['de']]],
    ['ど', [['do']]],
    ['ぢゃ', [['dya']]],
    ['ぢぃ', [['dyi']]],
    ['ぢゅ', [['dyu']]],
    ['ぢぇ', [['dye']]],
    ['ぢょ', [['dyo']]],
    ['でゃ', [['dha']]],
    ['でぃ', [['dhi']]],
    ['でゅ', [['dhu']]],
    ['でぇ', [['dhe']]],
    ['でょ', [['dho']]],
    ['どぁ', [['dwa']]],
    ['どぃ', [['dwi']]],
    ['どぅ', [['dwu']]],
    ['どぇ', [['dwe']]],
    ['どぉ', [['dwo']]],
    ['っ', [['ltu'], ['xtu'], ['ltsu'], ['xtsu']]],
    ['な', [['na']]],
    ['に', [['ni']]],
    ['ぬ', [['nu']]],
    ['ね', [['ne']]],
    ['の', [['no']]],
    ['にゃ', [['nya']]],
    ['にぃ', [['nyi']]],
    ['にゅ', [['nyu']]],
    ['にぇ', [['nye']]],
    ['にょ', [['nyo']]],
    ['は', [['ha']]],
    ['ひ', [['hi']]],
    ['ふ', [['hu'], ['fu']]],
    ['へ', [['he']]],
    ['ほ', [['ho']]],
    ['ひゃ', [['hya']]],
    ['ひぃ', [['hyi']]],
    ['ひゅ', [['hyu']]],
    ['ひぇ', [['hye']]],
    ['ひょ', [['hyo']]],
    ['ふぁ', [['fa'], ['fwa']]],
    ['ふぃ', [['fi'], ['fwi'], ['fyi']]],
    ['ふぅ', [['fwu']]],
    ['ふぇ', [['fe'], ['fwe'], ['fye']]],
    ['ふぉ', [['fo'], ['fwo']]],
    ['ふゃ', [['fya']]],
    ['ふゅ', [['fyu']]],
    ['ふょ', [['fyo']]],
    ['ば', [['ba']]],
    ['び', [['bi']]],
    ['ぶ', [['bu']]],
    ['べ', [['be']]],
    ['ぼ', [['bo']]],
    ['びゃ', [['bya']]],
    ['びぃ', [['byi']]],
    ['びゅ', [['byu']]],
    ['びぇ', [['bye']]],
    ['びょ', [['byo']]],
    ['ヴぁ', [['va']]],
    ['ヴぃ', [['vi']]],
    ['ヴ', [['vu']]],
    ['ヴぇ', [['ve']]],
    ['ヴぉ', [['vo']]],
    ['ヴゃ', [['vya']]],
    ['ヴぃ', [['vyi']]],
    ['ヴゅ', [['vyu']]],
    ['ヴぇ', [['vye']]],
    ['ヴょ', [['vyo']]],
    ['ぱ', [['pa']]],
    ['ぴ', [['pi']]],
    ['ぷ', [['pu']]],
    ['ぺ', [['pe']]],
    ['ぽ', [['po']]],
    ['ぴゃ', [['pya']]],
    ['ぴぃ', [['pyi']]],
    ['ぴゅ', [['pyu']]],
    ['ぴぇ', [['pye']]],
    ['ぴょ', [['pyo']]],
    ['ま', [['ma']]],
    ['み', [['mi']]],
    ['む', [['mu']]],
    ['め', [['me']]],
    ['も', [['mo']]],
    ['みゃ', [['mya']]],
    ['みぃ', [['myi']]],
    ['みゅ', [['myu']]],
    ['みぇ', [['mye']]],
    ['みょ', [['myo']]],
    ['や', [['ya']]],
    ['ゆ', [['yu']]],
    ['よ', [['yo']]],
    ['ゃ', [['lya'], ['xya']]],
    ['ゅ', [['lyu'], ['xyu']]],
    ['ょ', [['lyo'], ['xyo']]],
    ['ら', [['ra']]],
    ['り', [['ri']]],
    ['る', [['ru']]],
    ['れ', [['re']]],
    ['ろ', [['ro']]],
    ['りゃ', [['rya']]],
    ['りぃ', [['ryi']]],
    ['りゅ', [['ryu']]],
    ['りぇ', [['rye']]],
    ['りょ', [['ryo']]],
    ['わ', [['wa']]],
    ['を', [['wo']]],
    ['ん', [['n'], ['nn'], ["n'"], ['xn']]],
    ['ゎ', [['lwa'], ['xwa']]],
    ['　', [[' ']]],
    ['ー', [['-']]]
  ]);
  private static _initialize = (() => {
    for (const chunkPattern of ChunkPattern.list) {
      const kana = chunkPattern[0];
      if (kana.length >= 2) {
        let multiPattern: Array<Array<string>> = [];
        for (const c of kana) {
          if (multiPattern.length === 0) {
            multiPattern = ChunkPattern.list.get(c)!;
          }
          else {
            let tmp: Array<Array<string>> = [];
            for (const p1 of multiPattern) {
              for (const p2 of ChunkPattern.list.get(c)!) {
                tmp.push(p1.concat(p2));
              }
            }
            multiPattern = tmp;
          }
        }
        ChunkPattern.list.set(kana, chunkPattern[1].concat(multiPattern));
      }
    }
  })();
}

// かなをチャンクに分割
function devideIntoChunk(kana: string): Array<Chunk> {
  let ret: Array<Chunk> = [];
  for (let i = 0; i < kana.length; ++i) {
    // 最後の1文字の場合、必ずその文字が1チャンク
    if (i >= kana.length - 1) {
      ret.push(new Chunk(kana[i]));
      break;
    }

    // 「っ」でも「ん」でもないとき
    if (kana[i] !== 'っ' && kana[i] !== 'ん') {
      // その文字から2文字がチャンクパターンに存在しない場合、その文字が1チャンク
      if (!ChunkPattern.list.has(kana[i] + kana[i + 1])) {
        ret.push(new Chunk(kana[i]));
      }
      // その文字から2文字がチャンクパターンに存在する場合、2文字で1チャンク
      else {
        ret.push(new Chunk(kana[i] + kana[i + 1]));
        ++i;
      }
    }
    // 「っ」か「ん」のとき
    else {
      // 最後から2番目の文字の場合
      if (i >= kana.length - 2) {
        // かつ、次の文字がスペースでない場合、2文字で1チャンク
        if (kana[i + 1] !== '　') {
          ret.push(new Chunk(kana[i] + kana[i + 1]));
          break;
        }
        // 次の文字がスペースの場合、2文字で2チャンク
        else {
          ret.push(new Chunk(kana[i]));
          ret.push(new Chunk(kana[i + 1]));
          break;
        }
      }

      // 「っ」「ん」の後ろの2文字がチャンクパターンに存在しない場合
      // 「っ」「ん」を含めて2文字で1チャンク
      if (!ChunkPattern.list.has(kana[i + 1] + kana[i + 2])) {
        ret.push(new Chunk(kana[i] + kana[i + 1]));
        ++i;
      }
      // 「っ」「ん」の後ろの2文字がチャンクパターンに存在する場合
      // 「っ」「ん」を含めて3文字で1チャンク
      else {
        ret.push(new Chunk(kana[i] + kana[i + 1] + kana[i + 2]));
        i += 2;
      }
    }
  }

  return ret;
}

// 入力パターンを持つクラス
class TypePattern {
  private _roman: string;
  private _isValid: boolean = true;
  private _romanCount: number = 0;

  private _kanaRomanList: Array<string> = [];

  /** 現在見ている_kanaRomanListのindex */
  private _curKanaRomanIndex: number = 0;

  /** _kanaRomanList[_curKanaRomanIndex]の中で、何文字目を見ているか */
  private _curKanaRomanCount: number = 0;

  public constructor(romanList: Array<string>) {
    this._kanaRomanList = romanList;
    this._roman = romanList.join('');
  }
  public getCurChar() {
    return this._roman[this._romanCount];
  }
  // このメソッドを呼んだ後に isChunkFinished() を呼ぶ
  public increment(kanaFinished: (newKanaCount: number) => void) {
    ++this._romanCount;
    ++this._curKanaRomanCount;

    // かなが終了したかを判定
    if (this._curKanaRomanCount >= this._curKanaRoman.length) {
      ++this._curKanaRomanIndex;
      this._curKanaRomanCount = 0;
      kanaFinished(this._curKanaRomanIndex);
    }
  }

  private get _curKanaRoman(): string {
    return this._kanaRomanList[this._curKanaRomanIndex];
  }

  public get isValid() {
    return this._isValid;
  }
  public isChunkFinished(): boolean {
    return this._romanCount >= this._roman.length;
  }
  public invalidate() {
    this._isValid = false;
  }
  public get roman(): string {
    return this._roman;
  }
  public get prevRoman(): string {
    return this._roman.substr(0, this._romanCount);
  }
  public get nextRoman(): string {
    return this._roman.substr(this._romanCount);
  }
}

class TypePatternList {
  private _displayPatternNum = 0;
  private _typePatternList: Array<TypePattern>;
  private _isChunkFinished: boolean = false;
  /**
   * 最初のTypePatternから増えたローマ字の数
   *
   * ex) ssa -> xtusa ならば _additionalRomanCount = 2
   */
  private _additionalRomanCount: number = 0;

  public constructor(romanLists: Array<Array<string>>) {
    this._typePatternList = romanLists.map(romanList => new TypePattern(romanList));
  }

  private isCorrectInput(inputChar: string): boolean {
    for (const typePattern of this._typePatternList) {
      if (typePattern.isValid && typePattern.getCurChar() === inputChar)
        return true;
    }
    return false;
  }

  /** 正しい入力であればtrue、そうでなければfalseを返す */
  public update(inputChar: string, kanaFinished: (newKanaCount: number) => void): boolean {
    // 正しい入力でない場合、即return
    window.console.log(inputChar);
    if (!this.isCorrectInput(inputChar)) {
      return false;
    }
    const prevDisplayRoman = this.displayRoman;
    // 正しい入力の場合
    for (const typePattern of this._typePatternList) {
      if (!typePattern.isValid) continue;
      if (inputChar === typePattern.getCurChar()) {
        typePattern.increment(kanaFinished);
        if (typePattern.isChunkFinished()) {
          this._isChunkFinished = true;
          continue;
        }
      }
      else {
        if (typePattern === this._typePatternList[this._displayPatternNum]) {
          this._displayPatternNum = -1;
        }
        typePattern.invalidate();
      }
    }

    // 表示するローマ字パターン番号を再設定
    if (this._displayPatternNum === -1) {
      for (let i = 0; i < this._typePatternList.length; ++i) {
        if (this._typePatternList[i].isValid) {
          this._displayPatternNum = i;
          break;
        }
      }
    }
    const curDisplayRoman = this.displayRoman;
    this._additionalRomanCount += curDisplayRoman.length - prevDisplayRoman.length;
    return true;
  }
  public get displayRoman(): string {
    return this._typePatternList[this._displayPatternNum].roman;
  }
  public get displayPrevRoman(): string {
    return this._typePatternList[this._displayPatternNum].prevRoman;
  }
  public get displayNextRoman(): string {
    return this._typePatternList[this._displayPatternNum].nextRoman;
  }
  public get isChunkFinished(): boolean {
    return this._isChunkFinished;
  }
  public get additionalRomanCount(): number {
    return this._additionalRomanCount;
  }
}

class Chunk {
  private _kana: string;
  private _kanaCount: number = 0;

  private _roman: string;
  private _prevRoman: string;
  private _nextRoman: string;
  private _typePatternList: TypePatternList;

  private readonly _vowels: Array<string> = ['a', 'i', 'u', 'e', 'o', 'n'];

  /** かなをチャンクに分割し、打鍵パターンを準備する */
  public constructor(kana: string) {
    this._kana = kana;

    if (kana.length == 1) {
      this._typePatternList = new TypePatternList(ChunkPattern.list.get(kana)!);
    }
    else { // かなが2文字以上の場合
      if (kana[0] === 'っ') { // チャンクの1文字目が「っ」
        // 「っ」を除いた場合のパターン
        const curPatterns: Array<Array<string>> = ChunkPattern.list.get(kana.substr(1))!;

        let newPatterns: Array<Array<string>> = [];

        // 子音の繰り返し
        for (const roman of curPatterns) {
          const romanFirstChar: string = roman[0][0];
          if (!this._vowels.includes(romanFirstChar)) {
            newPatterns.push([romanFirstChar].concat(roman));
          }
        }

        // 「っ」単体
        for (const roman of curPatterns) {
          for (const xtu of ChunkPattern.list.get('っ')!) {
            newPatterns.push(xtu.concat(roman));
          }
        }

        this._typePatternList = new TypePatternList(newPatterns);
      }
      else if (kana[0] === 'ん') { // チャンクの1文字目が「ん」
        // 「ん」を除いた場合のパターン
        const curPatterns: Array<Array<string>> = ChunkPattern.list.get(kana.substr(1))!;

        let newPatterns: Array<Array<string>> = [];

        const xnPatterns: Array<Array<string>> = ChunkPattern.list.get('ん')!;
        // 「n」をつける場合
        for (const roman of curPatterns) {
          for (const xn of xnPatterns) {
            if (xn !== ['n']) {
              newPatterns.push(xn.concat(roman));
            }
            else {
              // 次の文字がa/i/u/e/o/nでないなら「n」が使える
              if (!this._vowels.includes(roman[0][0])) {
                newPatterns.push(xn.concat(roman));
              }
            }
          }
        }
        this._typePatternList = new TypePatternList(newPatterns);
      }
      else { // チャンクの1文字目が「っ」でも「ん」でもない
        this._typePatternList = new TypePatternList(ChunkPattern.list.get(kana)!);
      }
    }
    this._roman = this._typePatternList.displayRoman;
    this._prevRoman = this._typePatternList.displayPrevRoman;
    this._nextRoman = this._typePatternList.displayNextRoman;
  }

  /** 入力が正しければtrue、そうでなければfalseを返す */
  public update(inputChar: string): boolean {
    /** かなが終わった場合の処理 */
    const kanaFinished = (newKanaCount: number) => {
      this._kanaCount = newKanaCount;
    };
    const ret = this._typePatternList.update(inputChar, kanaFinished);

    if (this._typePatternList.isChunkFinished) {
      this._kanaCount = this._kana.length;
    }
    this._roman = this._typePatternList.displayRoman;
    this._prevRoman = this._typePatternList.displayPrevRoman;
    this._nextRoman = this._typePatternList.displayNextRoman;
    return ret;
  }
  public get kanaCount(): number {
    return this._kanaCount;
  }
  public get isChunkFinished(): boolean {
    return this._typePatternList.isChunkFinished;
  }
  public get roman(): string {
    return this._roman;
  }
  public get prevRoman(): string {
    return this._prevRoman;
  }
  public get nextRoman(): string {
    return this._nextRoman;
  }
  public get additionalRomanCount(): number {
    return this._typePatternList.additionalRomanCount;
  }
}

export default class TypingGame {
  /** 漢字かな交じり */
  private _text: string = "";
  private _prevTextList: Array<string> = [];

  private _kanaList: Array<string> = [];
  private _kana: string = "";
  private _kanaCount: number = 0;

  private _chunkList: Chunk[];
  public _chunkCount: number = 0;

  private _prevRoman: string = "";
  private _nextRoman: string = "";

  private _typeCount: number = 0;
  private _missCount: number = 0;
  private _isFinished: boolean = false;

  private _additionalRomanCountSum: number = 0;

  /** text1行あたりの文字数 */
  private readonly _textLineLength: number = 43;
  /** roman1行あたりの文字数 */
  private readonly _romanLineLength: number = 50;
  /** romanの行数 */
  private readonly _romanLineNum: number = 8;


  public constructor() {
    this._generateWords();

    // ローマ字の準備
    this._chunkList = devideIntoChunk(this._kana);
    for (const chunk of this._chunkList) {
      this._prevRoman += chunk.prevRoman;
      this._nextRoman += chunk.nextRoman;
    }
  }

  private _generateWords() {
    // ローマ字が400字ジャストのときは、もう1単語追加する
    for (let romanCount: number = 0; romanCount <= this._romanLength;) {
      const word = TypingWords.getWord();
      const text: string = word.text + "　";
      const kanaList: Array<string> = word.kana.concat(["　"]);
      this._kanaList = this._kanaList.concat(kanaList);

      const kanaStr: string = kanaList.join('');
      const chunkList: Array<Chunk> = devideIntoChunk(kanaStr);
      const romanLength: number = chunkList.reduce((acc, cur) => acc + cur.roman.length, 0);
      romanCount += romanLength;

      this._text += text;
      this._kana += kanaStr;

      window.console.log(romanCount);
    }
  }

  public update(inputChar: string) {
    const result = this._chunkList[this._chunkCount].update(inputChar);
    if (result) { // 正しい入力の場合
      ++this._typeCount;
      // 終了判定
      if (this._typeCount >= this._romanLength + this._additionalRomanCountSum) {
        this._isFinished = true;
      }
    }
    else { // 入力が正しくない場合
      ++this._missCount;
    }
    this._prevRoman = "";
    this._nextRoman = "";
    for (const chunk of this._chunkList) {
      this._prevRoman += chunk.prevRoman;
      this._nextRoman += chunk.nextRoman;
    }
    this._kanaCount = this._chunkList.reduce((acc, cur) => acc + cur.kanaCount, 0);
    if (this._chunkList[this._chunkCount].isChunkFinished) {
      ++this._chunkCount;
      if (this._chunkCount >= this._chunkList.length) {
        // TODO:消す
        this._isFinished = true;
      }
    }

    this._additionalRomanCountSum = this._chunkList.reduce((acc, cur) => acc += cur.additionalRomanCount, 0);
  }

  public isFinished(): boolean {
    return this._isFinished;
  }

  private get _romanLength(): number {
    return this._romanLineLength * this._romanLineNum;
  }
  public get text(): string {
    return this._text;
  }
  public get prevRoman(): string {
    return this._prevRoman;
  }
  public get nextRoman(): string {
    return this._nextRoman;
  }
  public get missCount(): number {
    return this._missCount;
  }
  public get prevTextList(): Array<string> {
    let ret: Array<string> = [];
    for (let i = 0, kanaCount = 0; i < this._text.length; ++i) {
      kanaCount += this._kanaList[i].length;
      if (kanaCount <= this._kanaCount) {
        if (ret.length === 0 || ret[ret.length - 1].length >= this._textLineLength) {
          ret.push(this._text[i]);
        }
        else {
          ret[ret.length - 1] += this._text[i];
        }
      }
    }
    this._prevTextList = ret;
    return ret;
  }
  public get nextTextList(): Array<string> {
    let ret: Array<string> = [];
    const prevTextLength = this._prevTextList.join("").length;
    for (let i = 0; i < this._text.length; ++i) {
      if (i % this._textLineLength === 0) {
        ret.push("");
      }
      if (i >= prevTextLength) {
        ret[ret.length - 1] += this._text[i];
      }
    }
    // 最後を空白で埋める
    const prevTextLastLine: string | undefined = this._prevTextList[ret.length - 1];
    const prevTextLastLineLength: number = (prevTextLastLine === undefined ? 0 : this._prevTextList[ret.length - 1].length);
    while ((prevTextLastLineLength + ret[ret.length - 1].length) % this._textLineLength !== 0) {
      ret[ret.length - 1] += "　";
    }
    return ret;
  }
  public get prevNextTextList() {
    let ret: Array<{}> = [];
    const prevTextList = this.prevTextList;
    const nextTextList = this.nextTextList;
    for (let i = 0; i < 8; ++i) {
      ret.push({
        "prev": prevTextList[i],
        "next": nextTextList[i],
        "key": `prevNextTextList${i}`
      });
    }
    return ret;
  }
  public get prevRomanList(): string[] {
    let ret: string[] = [];
    for (let i = 0; i < this._romanLineNum; ++i) {
      const lineBeginIndex: number = i * this._romanLineLength + this._additionalRomanCountSum;
      // 入力済みの行
      if (this._prevRoman.length >= lineBeginIndex + this._romanLineLength) {
        ret.push(this._prevRoman.substr(lineBeginIndex, this._romanLineLength));
      }
      // 入力中の行
      else if (this._prevRoman.length >= lineBeginIndex) {
        ret.push(this._prevRoman.substr(lineBeginIndex));
      }
      // 未入力の行
      else {
        ret.push("");
      }
    }
    return ret;
  }
  public get nextRomanList(): string[] {
    let ret: string[] = [];
    let tmp: number = 0;
    for (let i = 0; i < this._romanLineNum; ++i) {
      const lineBeginIndex: number = i * this._romanLineLength + this._additionalRomanCountSum;
      // 入力済みの行
      if (this._prevRoman.length >= lineBeginIndex + this._romanLineLength) {
        ret.push("");
      }
      // 入力中の行
      else if (this._prevRoman.length >= lineBeginIndex) {
        tmp = lineBeginIndex + this._romanLineLength - this._prevRoman.length;
        ret.push(this._nextRoman.substr(0, tmp));
      }
      else {
        ret.push(this._nextRoman.substr(tmp, this._romanLineLength));
        tmp += 50;
      }
      /*
      if (this._nextRoman.length >= (i + 1) * 50) {
        ret.push(this._nextRoman.substr(i * 50, 50));
      }
      else if (this._nextRoman.length >= i * 50) {
        ret.push(this._nextRoman.substr(i * 50));
      }
      else {
        ret.push('');
      }
      */
    }
    return ret;
  }
  public get prevNextRomanList() {
    let ret: {}[] = [];
    const prevRomanList: string[] = this.prevRomanList;
    const nextRomanList: string[] = this.nextRomanList;
    for (let i = 0; i < this._romanLineNum; ++i) {
      ret.push({
        "prev": prevRomanList[i],
        "next": nextRomanList[i],
        "key": `prevNextRomanList${i}`
      });
    }
    return ret;
  }
}