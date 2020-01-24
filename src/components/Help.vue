<template>
  <div id="help">

    <h3>操作方法</h3>
    <div class="inline-block-list">
      <ul>
        <li>Enter: スタート</li>
        <li>Esc: リセット</li>
      </ul>
    </div>

    <h3>概要</h3>
    <p>「ブラウザ版 タイプウェル国語R」は、GANGAS様制作「タイプウェル国語R」風のタイピング練習アプリです。</p>
    <p>私（fiore）が勝手に作ったアプリですので、このアプリに関するお問い合わせ（不具合報告・要望・苦情等）はオリジナル作者にしないようお願いいたします。</p>

    <h4>動作確認済み環境</h4>
    <div class="center-list">
      <ul>
        <li>Windows 10</li>
        <ul>
          <li>Vivaldi</li>
        </ul>
      </ul>
    </div>


  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Help extends Vue {
  public thanks: string = "タイプウェルという素晴らしいソフトを開発してくださったGANGAS氏に深くお礼申し上げます。\n ※このアプリに関する問い合わせは、GANGAS氏ではなく、私(fiore)までお願いします。"

}
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
p{
  text-align: left;
  margin-left: 50px;
  margin-right: 50px;
}

</style>
