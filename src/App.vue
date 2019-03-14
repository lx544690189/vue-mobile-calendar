<template>
  <div id="app">
    <button @click="click">显示/隐藏</button>
    <calendar :show.sync="show" :defaultDate="defaultDate" :mode="mode" :disabledDate="disabledDate" @change="onChange"/>
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
      disabledDate: [new Date('2019-2-28'), new Date('2019-3-2')],
      // mode: 'single',
      // defaultDate: new Date(),
      // mode: 'multiple',
      // defaultDate: [new Date(), new Date('2019-2-28')],
      mode: 'during',
      defaultDate: [new Date('2019-3-20'), new Date('2019-3-25')],
    };
  },
  methods: {
    click() {
      this.show = !this.show;
    },
    onChange(date) {
      console.log('change date: ', date);
    },
  },
};
</script>

<style lang="less">
html,body{
  margin: 0;
  padding: 0;
  background: #fff;
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
