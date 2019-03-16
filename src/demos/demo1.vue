<template>
  <div id="demo-1" class="demo">
    <div class="demo-title">demo-1：弹窗视图</div>
    <button class="btn" @click="selectDate('single')">单选模式</button>
    <button class="btn" @click="selectDate('multiple')">多选模式</button>
    <button class="btn" @click="selectDate('during')">时间段选择模式</button>
    <p>
      mode={{mode}}
    </p>
    <p>
      已选日期：{{this.date}}
    </p>
    <calendar :show.sync="show" :mode="mode" @change="onChange"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      mode: 'during',
      date: '',
    };
  },
  methods: {
    selectDate(mode) {
      this.show = true;
      this.mode = mode;
      this.date = '';
    },
    onChange(date) {
      if (this.mode === 'single') {
        this.date = date.format('YYYY-MM-DD');
      } else {
        this.date = JSON.stringify(date.map((item) => item.format('YYYY-MM-DD')));
      }
    },
  },
};
</script>

<style scoped  lang="less">
  #demo-1{
    padding: 10px;
    background: #fff;
    .btn{
      margin-right: 20px;
    }
  }
</style>
