<template>
  <div id="demo-8"
       class="demo">
    <div class="demo-title">
      demo-8：during 模式限制只能在所显示的当前月选择
    </div>
    <inlineCalendar mode="during"
                    :day-click="dayClick"
                    :restrict-current-month="true"
                    @change="onChange"
                    @switch="handelSwitch" />
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  methods: {
    onChange(date) {
      console.log(date);
    },
    dayClick(day) {
      console.log('day', dayjs(day).format('YYYY-MM-DD'));
      return true;
    },
    handelSwitch(param) {
      console.log(param);
    },
  },
};
</script>

<style scoped  lang="less">
#demo-8 {
  padding: 10px;
  background: #fff;
}
</style>
