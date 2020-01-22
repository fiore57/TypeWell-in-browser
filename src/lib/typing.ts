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

class ChunkPattern {
  static list = new Map([
    ['あ', ['a']],
    ['い', ['i', 'yi']],
    ['う', ['u', 'wu', 'whu']],
    ['え', ['e']],
    ['お', ['o']],
    ['うぁ', ['wha']],
    ['うぃ', ['whi', 'wi']],
    ['うぇ', ['whe', 'we']],
    ['うぉ', ['who']],
    ['ゐ', ['wi']],
    ['ゑ', ['we']],
    ['ぁ', ['la', 'xa']],
    ['ぃ', ['li', 'xi', 'lyi', 'xyi']],
    ['ぅ', ['lu', 'xu']],
    ['ぇ', ['le', 'xe', 'lye', 'xye']],
    ['ぉ', ['lo', 'xo']],
    ['ぃぇ', ['ye']],
    ['か', ['ka', 'ca']],
    ['き', ['ki']],
    ['く', ['ku', 'cu', 'qu']],
    ['け', ['ke']],
    ['こ', ['ko', 'co']],
    ['きゃ', ['kya']],
    ['きぃ', ['kyi']],
    ['きゅ', ['kyu']],
    ['きぇ', ['kye']],
    ['きょ', ['kyo']],
    ['くゃ', ['qya']],
    ['くゅ', ['qyu']],
    ['くょ', ['qyo']],
    ['くぁ', ['qwa', 'qa', 'kwa']],
    ['くぃ', ['qwi', 'qi', 'qyi']],
    ['くぅ', ['qwu']],
    ['くぇ', ['qwe', 'qe', 'qye']],
    ['くぉ', ['qwo', 'qo']],
    ['が', ['ga']],
    ['ぎ', ['gi']],
    ['ぐ', ['gu']],
    ['げ', ['ge']],
    ['ご', ['go']],
    ['ぎゃ', ['gya']],
    ['ぎぃ', ['gyi']],
    ['ぎゅ', ['gyu']],
    ['ぎぇ', ['gye']],
    ['ぎょ', ['gyo']],
    ['ぐぁ', ['gwa']],
    ['ぐぃ', ['gwi']],
    ['ぐぅ', ['gwu']],
    ['ぐぇ', ['gwe']],
    ['ぐぉ', ['gwo']],
    ['ヵ', ['lka', 'xka']],
    ['ヶ', ['lke', 'xke']],
    ['さ', ['sa']],
    ['し', ['si', 'ci', 'shi']],
    ['す', ['su']],
    ['せ', ['se', 'ce']],
    ['そ', ['so']],
    ['しゃ', ['sya', 'sha']],
    ['しぃ', ['syi']],
    ['しゅ', ['syu', 'shu']],
    ['しぇ', ['sye', 'she']],
    ['しょ', ['syo', 'sho']],
    ['すぁ', ['swa']],
    ['すぃ', ['swi']],
    ['すぅ', ['swu']],
    ['すぇ', ['swe']],
    ['すぉ', ['swo']],
    ['ざ', ['za']],
    ['じ', ['zi', 'ji']],
    ['ず', ['zu']],
    ['ぜ', ['ze']],
    ['ぞ', ['zo']],
    ['じゃ', ['zya', 'ja', 'jya']],
    ['じぃ', ['zyi', '', 'jyi']],
    ['じゅ', ['zyu', 'ju', 'jyu']],
    ['じぇ', ['zye', 'je', 'jye']],
    ['じょ', ['zyo', 'jo', 'jyo']],
    ['た', ['ta']],
    ['ち', ['ti', 'chi']],
    ['つ', ['tu', 'tsu']],
    ['て', ['te']],
    ['と', ['to']],
    ['ちゃ', ['tya', 'cha', 'cya']],
    ['ちぃ', ['tyi', '', 'cyi']],
    ['ちゅ', ['tyu', 'chu', 'cyu']],
    ['ちぇ', ['tye', 'che', 'cye']],
    ['ちょ', ['tyo', 'cho', 'cyo']],
    ['つぁ', ['tsa']],
    ['つぃ', ['tsi']],
    ['つぇ', ['tse']],
    ['つぉ', ['tso']],
    ['てゃ', ['tha']],
    ['てぃ', ['thi']],
    ['てゅ', ['thu']],
    ['てぇ', ['the']],
    ['てょ', ['tho']],
    ['とぁ', ['twa']],
    ['とぃ', ['twi']],
    ['とぅ', ['twu']],
    ['とぇ', ['twe']],
    ['とぉ', ['two']],
    ['だ', ['da']],
    ['ぢ', ['di']],
    ['づ', ['du']],
    ['で', ['de']],
    ['ど', ['do']],
    ['ぢゃ', ['dya']],
    ['ぢぃ', ['dyi']],
    ['ぢゅ', ['dyu']],
    ['ぢぇ', ['dye']],
    ['ぢょ', ['dyo']],
    ['でゃ', ['dha']],
    ['でぃ', ['dhi']],
    ['でゅ', ['dhu']],
    ['でぇ', ['dhe']],
    ['でょ', ['dho']],
    ['どぁ', ['dwa']],
    ['どぃ', ['dwi']],
    ['どぅ', ['dwu']],
    ['どぇ', ['dwe']],
    ['どぉ', ['dwo']],
    ['っ', ['ltu', 'xtu', 'ltsu']],
    ['な', ['na']],
    ['に', ['ni']],
    ['ぬ', ['nu']],
    ['ね', ['ne']],
    ['の', ['no']],
    ['にゃ', ['nya']],
    ['にぃ', ['nyi']],
    ['にゅ', ['nyu']],
    ['にぇ', ['nye']],
    ['にょ', ['nyo']],
    ['は', ['ha']],
    ['ひ', ['hi']],
    ['ふ', ['hu', 'fu']],
    ['へ', ['he']],
    ['ほ', ['ho']],
    ['ひゃ', ['hya']],
    ['ひぃ', ['hyi']],
    ['ひゅ', ['hyu']],
    ['ひぇ', ['hye']],
    ['ひょ', ['hyo']],
    ['ふぁ', ['fwa', 'fa']],
    ['ふぃ', ['fwi', 'fi', 'fyi']],
    ['ふぅ', ['fwu']],
    ['ふぇ', ['fwe', 'fe', 'fye']],
    ['ふぉ', ['fwo', 'fo']],
    ['ふゃ', ['fya']],
    ['ふゅ', ['fyu']],
    ['ふょ', ['fyo']],
    ['ば', ['ba']],
    ['び', ['bi']],
    ['ぶ', ['bu']],
    ['べ', ['be']],
    ['ぼ', ['bo']],
    ['びゃ', ['bya']],
    ['びぃ', ['byi']],
    ['びゅ', ['byu']],
    ['びぇ', ['bye']],
    ['びょ', ['byo']],
    ['ヴぁ', ['va']],
    ['ヴぃ', ['vi']],
    ['ヴ', ['vu']],
    ['ヴぇ', ['ve']],
    ['ヴぉ', ['vo']],
    ['ヴゃ', ['vya']],
    ['ヴぃ', ['vyi']],
    ['ヴゅ', ['vyu']],
    ['ヴぇ', ['vye']],
    ['ヴょ', ['vyo']],
    ['ぱ', ['pa']],
    ['ぴ', ['pi']],
    ['ぷ', ['pu']],
    ['ぺ', ['pe']],
    ['ぽ', ['po']],
    ['ぴゃ', ['pya']],
    ['ぴぃ', ['pyi']],
    ['ぴゅ', ['pyu']],
    ['ぴぇ', ['pye']],
    ['ぴょ', ['pyo']],
    ['ま', ['ma']],
    ['み', ['mi']],
    ['む', ['mu']],
    ['め', ['me']],
    ['も', ['mo']],
    ['みゃ', ['mya']],
    ['みぃ', ['myi']],
    ['みゅ', ['myu']],
    ['みぇ', ['mye']],
    ['みょ', ['myo']],
    ['や', ['ya']],
    ['ゆ', ['yu']],
    ['よ', ['yo']],
    ['ゃ', ['lya', 'xya']],
    ['ゅ', ['lyu', 'xyu']],
    ['ょ', ['lyo', 'xyo']],
    ['ら', ['ra']],
    ['り', ['ri']],
    ['る', ['ru']],
    ['れ', ['re']],
    ['ろ', ['ro']],
    ['りゃ', ['rya']],
    ['りぃ', ['ryi']],
    ['りゅ', ['ryu']],
    ['りぇ', ['rye']],
    ['りょ', ['ryo']],
    ['わ', ['wa']],
    ['を', ['wo']],
    ['ん', ['n', 'nn', "n'", 'xn']],
    ['ゎ', ['lwa', 'xwa']],
    ['　', [' ']],
    ['ー', ['-']]
  ]);
  private static _initialize = (() => {
    for (let chunk_pattern of ChunkPattern.list) {
      const kana = chunk_pattern[0];
      if (kana.length >= 2) {
        let multi_pattern: Array<string> = [];
        for (let c of kana) {
          if (multi_pattern.length === 0) {
            multi_pattern = ChunkPattern.list.get(c)!;
          }
          else {
            let tmp: Array<string> = [];
            for (const p1 of multi_pattern) {
              for (const p2 of ChunkPattern.list.get(c)!) {
                tmp.push(p1 + p2);
              }
            }
            multi_pattern = tmp;
          }
        }
        ChunkPattern.list.set(kana, chunk_pattern[1].concat(multi_pattern));
      }
    }
  })();
}

function devideIntoChunk(text: string): Array<Chunk> {
  let ret: Array<Chunk> = [];
  for (let i = 0; i < text.length; ++i) {
    // 最後の1文字の場合、必ずその文字が1チャンク
    if (i >= text.length - 1) {
      ret.push(new Chunk(text[i]));
      break;
    }

    // 「っ」でも「ん」でもないとき
    if (text[i] !== 'っ' && text[i] !== 'ん') {
      // その文字から2文字がチャンクパターンに存在しない場合、その文字が1チャンク
      if (!ChunkPattern.list.has(text[i] + text[i + 1])) {
        ret.push(new Chunk(text[i]));
      }
      // その文字から2文字がチャンクパターンに存在する場合、2文字で1チャンク
      else {
        ret.push(new Chunk(text[i] + text[i + 1]));
        ++i;
      }
    }
    // 「っ」か「ん」のとき
    else {
      // 最後から2番目の文字の場合
      if (i >= text.length - 2) {
        // かつ、次の文字がスペースでない場合、2文字で1チャンク
        if (text[i + 1] !== '　') {
          ret.push(new Chunk(text[i] + text[i + 1]));
          break;
        }
        // 次の文字がスペースの場合、2文字で2チャンク
        else {
          ret.push(new Chunk(text[i]));
          ret.push(new Chunk(text[i + 1]));
          break;
        }
      }

      // 「っ」「ん」の後ろの2文字がチャンクパターンに存在しない場合
      // 「っ」「ん」を含めて2文字で1チャンク
      if (!ChunkPattern.list.has(text[i + 1] + text[i + 2])) {
        ret.push(new Chunk(text[i] + text[i + 1]));
        ++i;
      }
      // 「っ」「ん」の後ろの2文字がチャンクパターンに存在する場合
      // 「っ」「ん」を含めて3文字で1チャンク
      else {
        ret.push(new Chunk(text[i] + text[i + 1] + text[i + 2]));
        i += 2;
      }
    }
  }

  return ret;
}

class TypePattern {
  private _roman: string;
  private _isValid: boolean = true;
  private _romanCount: number = 0;
  public constructor(roman: string) {
    this._roman = roman;
  }
  public get isValid() {
    return this._isValid;
  }
  public getCurChar() {
    return this._roman[this._romanCount];
  }
  public increment() {
    ++this._romanCount;
  }
  public isFinished(): boolean {
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
  private _isFinished: boolean = false;
  public constructor(roman_list: Array<string>) {
    this._typePatternList = roman_list.map(roman => new TypePattern(roman));
  }
  private isCorrectInput(input_char: string): boolean {
    for (const typePattern of this._typePatternList) {
      if (typePattern.isValid && typePattern.getCurChar() === input_char)
        return true;
    }
    return false;
  }
  // 正しい入力であればtrue、そうでなければfalseを返す
  public update(input_char: string): boolean {
    // 正しい入力でない場合、即return
    window.console.log(input_char);
    if (!this.isCorrectInput(input_char)) {
      return false;
    }
    // 正しい入力の場合
    this._typePatternList.forEach(typePattern => {
      if (!typePattern.isValid) return;
      if (input_char === typePattern.getCurChar()) {
        typePattern.increment()
        if (typePattern.isFinished()) {
          this._isFinished = true;
          return;
        }
      }
      else {
        if (typePattern === this._typePatternList[this._displayPatternNum]) {
          this._displayPatternNum = -1;
        }
        typePattern.invalidate();
      }
    });

    if (this._displayPatternNum === -1) {
      for (let i = 0; i < this._typePatternList.length; ++i) {
        if (this._typePatternList[i].isValid) {
          this._displayPatternNum = i;
          break;
        }
      }
    }
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
  public get isFinished(): boolean {
    return this._isFinished;
  }
}

class Chunk {
  private _kana: string;
  private _roman: string;
  private _prevRoman: string;
  private _nextRoman: string;
  private _typePatternList: TypePatternList;
  private readonly _vowels: Array<string> = ['a', 'i', 'u', 'e', 'o', 'n'];
  private _isNextVowel: boolean = false;  // 次のチャンクがa/i/u/e/o/nから始まるか否か
  public constructor(kana: string) {
    this._kana = kana;
    if (kana.length == 1) {
      this._typePatternList = new TypePatternList(ChunkPattern.list.get(kana)!);
    }
    else {
      if (kana[0] === 'っ') { // チャンクの1文字目が「っ」
        // 「っ」を除いた場合のパターン
        const curPatterns: Array<string> = ChunkPattern.list.get(kana.substr(1))!;

        let newPatterns: Array<string> = [];

        // 子音の繰り返し
        for (const roman of curPatterns) {
          if (!this._vowels.includes(roman[0])) {
            newPatterns.push(roman[0] + roman);
          }
        }

        // 「っ」単体
        for (const roman of curPatterns) {
          for (const xtu of ChunkPattern.list.get('っ')!) {
            newPatterns.push(xtu + roman);
          }
        }

        this._typePatternList = new TypePatternList(newPatterns);
      }
      else if (kana[0] === 'ん') { // チャンクの1文字目が「ん」
        // 「ん」を除いた場合のパターン
        const curPatterns: Array<string> = ChunkPattern.list.get(kana.substr(1))!;

        let newPatterns: Array<string> = [];

        const xnPatterns: Array<string> = ChunkPattern.list.get('ん')!;
        // 「n」をつける場合
        for (const roman of curPatterns) {
          for (const xn of xnPatterns) {
            if (xn !== 'n') {
              newPatterns.push(xn + roman);
            }
            else {
              // 次の文字がa/i/u/e/o/nでないなら「n」が使える
              if (!this._vowels.includes(roman[0])) {
                newPatterns.push(xn + roman);
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
  // 入力が正しければtrue、そうでなければfalseを返す
  public update(input_char: string): boolean {
    const ret = this._typePatternList.update(input_char);
    this._roman = this._typePatternList.displayRoman;
    this._prevRoman = this._typePatternList.displayPrevRoman;
    this._nextRoman = this._typePatternList.displayNextRoman;
    return ret;
  }
  public get isFinished(): boolean {
    return this._typePatternList.isFinished;
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
}

export default class TypingGame {
  private _text: string = "";
  private _kana: string = "";
  private _prevRoman: string = "";
  private _nextRoman: string = "";
  private _missCount: number = 0;
  private _chunkList: Array<Chunk>;
  m_kana_count: number = 0;
  public m_chunk_count: number = 0;
  m_kana_in_chunk_count: number = 0;
  m_is_finished: boolean = false;
  constructor() {
    for (let romanCount: number = 0; romanCount < 400;) {
      const word = TypingWords.getWord();
      const text: string = word.text + "　";
      const kanaList: Array<string> = word.kana.concat(["　"]);

      const kanaStr: string = kanaList.join('');
      const chunkList: Array<Chunk> = devideIntoChunk(kanaStr);
      const romanLength: number = chunkList.reduce((acc, cur) => acc + cur.roman.length, 0);
      romanCount += romanLength;

      this._text += text;
      this._kana += kanaStr;
    }

    // ローマ字の準備
    window.console.log(this._kana);

    this._chunkList = devideIntoChunk(this._kana);
    for (const chunk of this._chunkList) {
      this._prevRoman += chunk.prevRoman;
      this._nextRoman += chunk.nextRoman;
    }
  }
  public update(input_char: string) {
    const result = this._chunkList[this.m_chunk_count].update(input_char);
    if (result) { // 正しい入力の場合

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
    if (this._chunkList[this.m_chunk_count].isFinished) {
      ++this.m_chunk_count;
      if (this.m_chunk_count >= this._chunkList.length) {
        this.m_is_finished = true;
      }
    }
  }
  public isFinished(): boolean {
    return this.m_is_finished;
  }

  public get text(): string {
    return this._text;
  }
  public get prevRoman(): string {
    // TODO: 改行処理
    return this._prevRoman;
  }
  public get nextRoman(): string {
    return this._nextRoman;
  }
  public get missCount(): number {
    return this._missCount;
  }
  public get prevRomanList(): Array<string> {
    let ret: Array<string> = [];
    for (let i = 0; i < 8; ++i) {
      if (this._prevRoman.length >= (i + 1) * 50) {
        ret.push(this._prevRoman.substr(i * 50, 50));
      }
      else if (this._prevRoman.length >= i * 50) {
        ret.push(this._prevRoman.substr(i * 50));
      }
      else {
        ret.push('');
      }
    }
    return ret;
  }
  public get nextRomanList(): Array<string> {
    let ret: Array<string> = [];
    let tmp: number = 0;
    for (let i = 0; i < 8; ++i) {
      if (this._prevRoman.length >= (i + 1) * 50) {
        ret.push("");
      }
      else if (this._prevRoman.length >= i * 50) {
        tmp = (i + 1) * 50 - this._prevRoman.length;
        ret.push(this._nextRoman.substr(0, tmp));
      }
      else {
        ret.push(this._nextRoman.substr(tmp, 50));
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
    let ret: Array<{}> = [];
    for (let i = 0; i < 8; ++i) {
      ret.push({
        "prev": this.prevRomanList[i],
        "next": this.nextRomanList[i],
        "key": `prevNextRomanList${i}`
      });
    }
    return ret;
  }
}