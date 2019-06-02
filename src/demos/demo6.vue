<template>
  <div id="demo-6" class="demo">
      <div class="note">2019-6-2 V3.1.0新增api：changeDateView(date)</div>
    <div class="demo-title">
      demo-5：切换当前显示的时间视图
    </div>
    <button class="btn" @click="changeDate">切换回“今天”所在的月视图</button>
    <inlineCalendar ref="inlineCalendar"/>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  methods: {
    changeDate() {
      // 不传时间默认回到“今天”
      this.$refs.inlineCalendar.changeDateView();
    },
  },
};
</script>

<style scoped  lang="less">
  #demo-6{
    padding: 10px;
    background: #fff;
    .btn{
      margin-right: 20px;
    }
    .note{
      font-size: 14px;
      padding: 10px 0;
      color: red;
    }
  }
</style>
