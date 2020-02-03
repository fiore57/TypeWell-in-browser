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
          <li>Google Chrome</li>
          <li>Microsoft Edge</li>
          <li>Vivaldi</li>
        </ul>
        <li>Ubuntu 18.04 LTS</li>
        <ul>
          <li>Google Chrome</li>
        </ul>
      </ul>
      <p>Internet Explorerでは動作しません。また、Firefox(Ubuntu)では、レイアウトが崩れることを確認しています（直すかは未定です）。</p>
    </div>

    <h4>お問い合わせ（不具合報告・要望・苦情等）</h4>
    <p>「ブラウザ版 タイプウェル国語R」は私（fiore）が勝手に作ったアプリですので、このアプリに関するお問い合わせはオリジナル作者にしないようお願いいたします。</p>
    <div class="center-list">
      <ul>
        <li><a href="https://www.pc-gear.com" target="_blank">blog</a>（Contactからお願いします）</li>
        <li><a href="https://github.com/fiore57/TypeWell-in-browser" target = "_blank">Github</a>（開発者向け。Issueを立ててください。PRも歓迎です）</li>
      </ul>
    </div>

    <h4>ライセンス</h4>
    <p>「ブラウザ版 タイプウェル国語R」は、MITライセンスのもとで公開されています。詳しくは、<a href="https://github.com/fiore57/TypeWell-in-browser" target = "_blank">Github</a>のLICENSEをご覧ください。</p>

  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p{
  width: min(80vw, 80rem);
  text-align: left;
  margin: 1rem auto;
}
</style>
