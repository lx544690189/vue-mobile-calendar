<template>
  <div id="app">
    <button @click="click">显示/隐藏</button>
    <calendar :show.sync="show"/>
  </div>
</template>

<script>
import { calendar } from '../lib/index.js';
export default {
  components: {
    calendar,
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    click() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="less">
html,body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
