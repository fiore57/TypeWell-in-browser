import { Mode } from './type-well'
import { getRandomInt } from './utils'

type WordData = {
  text: string
  kana: string[]
}

type WordFileData = {
  list: WordData[]
}

export default class TypingWords {
  public static words: WordData[][] = [[], [], [], []]

  /** 単語ファイルを読み込む */
  public static async load(): Promise<void> {
    const files = ['khjy.json', 'ktkn.json', 'knj.json', 'ktwz.json']

    this.words = await Promise.all(
      files.map(async (file): Promise<WordData[]> => {
        const response = await fetch(`/words/${file}`)

        if (!response.ok) {
          throw new Error(
            `単語ファイルの読み込みに失敗しました: /words/${file} (${response.status})`,
          )
        }

        const json = (await response.json()) as WordFileData

        // JSONファイルは { list: [...] } という形式
        if (!Array.isArray(json.list)) {
          throw new Error(`単語ファイルの形式が不正です: ${file}`)
        }

        return json.list
      }),
    )
  }

  public static getWord(mode: Mode): WordData {
    const wordList = this.words[mode]

    if (!wordList || wordList.length === 0) {
      throw new Error(`単語ファイルがロードされていません（mode: ${mode}）`)
    }

    const rand = getRandomInt(wordList.length)
    return wordList[rand]!
  }
}
