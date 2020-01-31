import { eMode } from './typeWell';
import { getRandomInt } from './utils';

import * as firebase from 'firebase/app';
import 'firebase/storage'

// ストレージを準備
const firebaseConfig = {
  apiKey: "AIzaSyCzbC_wMYpuJFiqz9CRlT6W-ytVSzL1CN8",
  authDomain: "typewell-in-browser.firebaseapp.com",
  databaseURL: "https://typewell-in-browser.firebaseio.com",
  projectId: "typewell-in-browser",
  storageBucket: "typewell-in-browser.appspot.com",
  messagingSenderId: "810686145856",
  appId: "1:810686145856:web:79e7686e61aacfdd8046a5",
  measurementId: "G-4B7N3R3NP1"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const fileNameList: string[] = [
  "khjy.json", "ktkn.json", "knj.json", "ktwz.json"
];

for (let i = 0; i < 4; ++i) {
  const ref = storage.ref(fileNameList[i]);
  ref.getDownloadURL().then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onload = (event) => {
      // 読み込まれたあとの処理
      TypingWords.m_words[i] = xhr.response.list;
    };
    xhr.open("GET", url);
    xhr.send();
  }).catch((error) => {
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        window.console.error("Word file not found");
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        window.console.error("Permission denied");
        break;
      case 'storage/canceled':
        // User canceled the upload
        window.console.error("User canceled the upload");
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        window.console.error("Unknown error has occurred");
        break;
    }
  });
}

interface WordsObj {
  text: string,
  kana: string[]
}

export default class TypingWords {
  public static m_words: WordsObj[][] = [[], [], [], []];
  public static getWord(mode: eMode) {
    const wordList = this.m_words[mode];
    const rand = getRandomInt(wordList.length);
    return wordList[rand];
  }
  public static get isWordsLoaded() {
    for (const list of this.m_words) {
      if (list.length == 0) return false;
    }
    return true;
  }
}