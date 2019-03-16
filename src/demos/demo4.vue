<template>
  <div id="demo-4" class="demo">
    <div class="demo-title">demo-4：日期选择事件的回调</div>
    <inlineCalendar :dayClick="dayClick"/>
  </div>
</template>

<script>
import { inlineCalendar } from 'vue-mobile-calendar';
export default {
  components: {
    inlineCalendar,
  },
  data() {
    return {
      dayClick: (date) => {
        /* eslint-disable no-alert */
        const confirm = window.confirm(`已选日期：${date.format('YYYY-MM-DD')}，是否选择此日期？`);
        return confirm;
      },
    };
  },
};
</script>

<style scoped  lang="less">
  #demo-4{
    padding: 10px;
    background: #fff;
    .btn{
      margin-right: 20px;
    }
  }
</style>
