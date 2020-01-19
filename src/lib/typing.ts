//const chunk_pattern_list: Map<string, Array<string> = {
//'か': ['ka', 'ca'],
//};
const chunk_pattern_list = new Map([
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
]);

function initChunkPatternList() {
  for (let chunk_pattern of chunk_pattern_list) {
    const kana = chunk_pattern[0];
    if (kana.length >= 2) {
      let multi_pattern: Array<string> = [];
      for (let c of kana) {
        if (multi_pattern.length === 0) {
          multi_pattern = chunk_pattern[1];
        }
        else {
          let tmp: Array<string> = [];
          for (const p1 of multi_pattern) {
            for (const p2 of chunk_pattern[1]) {
              tmp.push(p1 + p2);
            }
          }
          multi_pattern = tmp;
        }
      }
      chunk_pattern[1].concat(multi_pattern);
    }
  }
}
initChunkPatternList();

function devideIntoChunk(text: string): Array<Chunk> {
  let ret: Array<Chunk> = [];
  //let cur_str: string;
  for (let i = 0; i < text.length; ++i) {
    //cur_str += text[i];
    // 最後の1文字の場合、必ずその文字が1チャンク
    if (i >= text.length - 1) {
      ret.push(new Chunk(text[i]));
      break;
    }

    // 「っ」でも「ん」でもないとき
    if (text[i] != 'っ' && text[i] != 'ん') {
      // その文字から2文字がチャンクパターンに存在しない場合、その文字が1チャンク
      if (!chunk_pattern_list.has(text[i] + text[i + 1])) {
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

      // その文字から3文字がチャンクパターンに存在しない場合、2文字が1チャンク
      if (!chunk_pattern_list.has(text[i] + text[i + 1] + text[i + 2])) {
        ret.push(new Chunk(text[i] + text[i + 1]));
        ++i;
      }
      // その文字から3文字がチャンクパターンに存在する場合、3文字で1チャンク
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
    for (let type_pattern of this._typePatternList) {
      if (type_pattern.getCurChar() === input_char)
        return true;
    }
    return false;
  }
  public update(input_char: string) {
    // 正しい入力でない場合、即return
    if (!this.isCorrectInput(input_char)) {
      return;
    }
    // 正しい入力の場合
    for (let type_pattern of this._typePatternList) {
      if (type_pattern.isValid) {
        if (input_char === type_pattern.getCurChar()) {
          type_pattern.increment()
          if (type_pattern.isFinished()) {
            this._isFinished = true;
            return;
          }
        }
        else {
          if (type_pattern === this._typePatternList[this._displayPatternNum]) {
            this._displayPatternNum = -1;
          }
          type_pattern.invalidate();
        }
      }
    }

    if (this._displayPatternNum === -1) {
      for (let i = 0; i < this._typePatternList.length; ++i) {
        if (this._typePatternList[i].isValid) {
          this._displayPatternNum = i;
          return;
        }
      }
    }
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
  public constructor(kana: string) {
    this._kana = kana;
    if (kana.length == 1) {
      this._typePatternList = new TypePatternList(chunk_pattern_list.get(kana)!);
    }
    else {
      this._typePatternList = new TypePatternList(chunk_pattern_list.get(kana)!);
      // 2文字以上の場合
      // 1文字目が「っ」or「ん」のときはパターンを動的生成する
    }
    this._roman = this._typePatternList.displayRoman;
    this._prevRoman = this._typePatternList.displayPrevRoman;
    this._nextRoman = this._typePatternList.displayNextRoman;
  }
  public update(input_char: string) {
    this._typePatternList.update(input_char);
    this._roman = this._typePatternList.displayRoman;
    this._prevRoman = this._typePatternList.displayPrevRoman;
    this._nextRoman = this._typePatternList.displayNextRoman;
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
  private _text: string;
  private _prevRoman: string = "";
  private _nextRoman: string = "";
  m_chunk_list: Array<Chunk>;
  m_kana_count: number = 0;
  public m_chunk_count: number = 0;
  m_kana_in_chunk_count: number = 0;
  m_is_finished: boolean = false;
  constructor(text: string) {
    this._text = text;
    this.m_chunk_list = devideIntoChunk(text);
    for (const chunk of this.m_chunk_list) {
      this._prevRoman += chunk.prevRoman;
      this._nextRoman += chunk.nextRoman;
    }
  }
  public update(input_char: string) {
    this.m_chunk_list[this.m_chunk_count].update(input_char);
    this._prevRoman = "";
    this._nextRoman = "";
    for (const chunk of this.m_chunk_list) {
      this._prevRoman += chunk.prevRoman;
      this._nextRoman += chunk.nextRoman;
    }
    if (this.m_chunk_list[this.m_chunk_count].isFinished) {
      ++this.m_chunk_count;
      if (this.m_chunk_count >= this.m_chunk_list.length) {
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
    return this._prevRoman;
  }
  public get nextRoman(): string {
    return this._nextRoman;
  }
}