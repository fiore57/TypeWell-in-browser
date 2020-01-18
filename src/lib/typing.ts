//const chunk_pattern_list: Map<string, Array<string> = {
//'か': ['ka', 'ca'],
//};
const chunk_pattern_list = new Map([
  ["か", ["ca", "ka"]],
  ["さ", ["sa"]],
]);
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
  private _is_valid: boolean = true;
  private _roman_count: number = 0;
  public constructor(roman: string) {
    this._roman = roman;
  }
  public get isValid() {
    return this._is_valid;
  }
  public getCurChar() {
    return this._roman[this._roman_count];
  }
  public increment() {
    ++this._roman_count;
  }
  public isFinished(): boolean {
    return this._roman_count >= this._roman.length;
  }
  public invalidate() {
    this._is_valid = false;
  }
  public get roman(): string {
    return this._roman;
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
  public get isFinished(): boolean {
    return this._isFinished;
  }
}

class Chunk {
  private _kana: string;
  private _roman: string;
  private _type_pattern_list: TypePatternList;
  public constructor(kana: string) {
    this._kana = kana;
    if (kana.length == 1) {
      this._type_pattern_list = new TypePatternList(chunk_pattern_list.get(kana)!);
    }
    else {
      this._type_pattern_list = new TypePatternList([]);
      // 2文字以上の場合
      // 1文字目が「っ」or「ん」のときはパターンを動的生成する
    }
    this._roman = this._type_pattern_list.displayRoman;
  }
  public update(input_char: string) {
    this._type_pattern_list.update(input_char);
    this._roman = this._type_pattern_list.displayRoman;
  }
  public get isFinished(): boolean {
    return this._type_pattern_list.isFinished;
  }
  public get roman(): string {
    return this._roman;
  }
}

export default class TypingGame {
  private _text: string;
  private _roman: string = "";
  m_chunk_list: Array<Chunk>;
  m_kana_count: number = 0;
  public m_chunk_count: number = 0;
  m_kana_in_chunk_count: number = 0;
  m_is_finished: boolean = false;
  constructor(text: string) {
    this._text = text;
    this.m_chunk_list = devideIntoChunk(text);
    for (const chunk of this.m_chunk_list) {
      this._roman += chunk.roman;
    }
  }
  public update(input_char: string) {
    this.m_chunk_list[this.m_chunk_count].update(input_char);
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
  public get roman(): string {
    return this._roman;
  }
}