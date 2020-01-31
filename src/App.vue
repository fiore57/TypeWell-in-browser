<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <TypeWell msg="test"/>
    <Help/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TypeWell from './components/TypeWell.vue';
import Help from './components/Help.vue';

@Component({
  components: {
    TypeWell,
    Help,
  },
})
export default class App extends Vue {
  public keyInput(event: KeyboardEvent) {
    const ignoreKeyList: string[] = [
      " ", "F1", "F2", "F3", "F4"
    ];
    for(const ignoreKey of ignoreKeyList){
      if(event.key === ignoreKey){
        event.preventDefault(); // デフォルトアクションを止める
      }
    }
  }

  beforeMount() {
    window.addEventListener('keydown', this.keyInput, true);
  }

  beforeDestroy() {
    window.removeEventListener('keydown', this.keyInput, true);
  }
}
</script>

<style lang="scss">
@import "@/assets/style.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
