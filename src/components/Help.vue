<template>
  <div id="help">

    <h3>操作方法</h3>
    <div class="inline-block-list">
      <ul>
        <li>Enter: スタート</li>
        <li>Esc: リセット</li>
        <li>F1-F4: モード変更</li>
      </ul>
    </div>

    <h3>概要</h3>
    <p>「ブラウザ版 タイプウェル国語R」は、GANGAS様制作「タイプウェル国語R」風のタイピング練習アプリです。</p>
    <p>本家と比べるとかなり機能は少ないです（タイムとレベルを計測できる程度で、詳細結果やランキングといった機能はありません）。</p>

    <h4>動作確認済み環境</h4>
    <div class="center-list">
      <ul>
        <li>Windows 10</li>
        <ul>
          <li>Chrome</li>
          <li>Vivaldi</li>
        </ul>
      </ul>
    </div>

    <h4>お問い合わせ（不具合報告・要望・苦情等）</h4>
    <p>「ブラウザ版 タイプウェル国語R」は私（fiore）が勝手に作ったアプリですので、このアプリに関するお問い合わせはオリジナル作者にしないようお願いいたします。</p>
    <div class="center-list">
      <ul>
        <li><a href="https://www.pc-gear.com" target="_blank">blog</a></li>
        <li><a href="https://github.com/fiore57/TypeWell-in-browser" target = "_blank">Github</a></li>
      </ul>
    </div>


  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Help extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.inline-block-list {
  li {
    display: inline-block;
    margin: 0 10px;
  }
}
.center-list{
  text-align: left;
  display: flex;
  align-items: center;
  flex-direction: column
}
h3 {
  margin: 40px 0 0;
}
ul {
  padding-left: 15px;
}
li {
  //display: inline-block;
  //margin: 0 10px;
}
a {
  color: #42b983;
}
h4 {
  margin-top: 20px;
  margin-bottom: 0;
}
p{
  text-align: left;
  margin-top: 10px;
  margin-right: 50px;
  margin-bottom: 10px;
  margin-left: 50px;
}

</style>
