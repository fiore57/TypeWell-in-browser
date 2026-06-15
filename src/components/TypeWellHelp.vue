<template>
  <section id="help" class="help">
    <section>
      <h2>操作方法</h2>
      <h3>プレイ画面</h3>
      <div class="inline-block-list">
        <ul>
          <li>Space/Enter: スタート</li>
          <li>Esc: リセット</li>
          <li>F1-F4: モード変更</li>
        </ul>
      </div>
      <h3>結果画面</h3>
      <div class="inline-block-list">
        <ul>
          <li>R (Shift + r): リプレイを再生</li>
          <li>Esc: リセット</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>概要</h2>
      <p>
        「ブラウザ版
        タイプウェル国語R」は、GANGAS様制作「タイプウェル国語R」風のタイピング練習アプリです。
      </p>
      <p>
        本家と比べるとかなり機能は少ないです（タイムとレベルを計測できる程度で、詳細結果やランキングといった機能はありません）。
      </p>

      <h3>お問い合わせ（ワード間違い・不具合報告・要望・苦情等）</h3>
      <p>
        「ブラウザ版
        タイプウェル国語R」は私（fiore）が勝手に作ったアプリですので、このアプリに関するお問い合わせはオリジナル作者にしないようお願いいたします。
      </p>
      <div class="center-list">
        <ul>
          <li>
            <a href="https://www.pc-gear.com" target="_blank">blog</a>（Contactからお願いします）
          </li>
          <li>
            <a href="https://github.com/fiore57/typewell-in-browser" target="_blank">GitHub</a
            >（開発者向け）
          </li>
        </ul>
      </div>

      <h3>ライセンス</h3>
      <p>
        「ブラウザ版 タイプウェル国語R」は、MITライセンスのもとで公開されています。詳しくは、<a
          href="https://github.com/fiore57/typewell-in-browser"
          target="_blank"
          >GitHub</a
        >のLICENSEをご覧ください。
      </p>
    </section>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/shared' as *;
.help {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}
h2 {
  margin-top: 4rem;
}
h3 {
  margin-top: 2rem;
}
</style>
