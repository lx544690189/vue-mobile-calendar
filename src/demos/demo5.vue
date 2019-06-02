<template>
  <div id="demo-5" class="demo">
      <div class="note">2019-6-2 V3.1.0新增api：minDate、maxDate，不能与disabledDate同时使用</div>
    <div class="demo-title">
      demo-5：指定最大、最小可选日期
    </div>
    <p>
      minDate: {{minDate.format('YYYY-MM-DD')}}
    </p>
    <p>
      maxDate: {{maxDate.format('YYYY-MM-DD')}}
    </p>
    <inlineCalendar :minDate="minDate" :maxDate="maxDate"/>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  data() {
    return {
      minDate: dayjs(new Date()),
      maxDate: dayjs(new Date()).add(20, 'day'),
    };
  },
};
</script>

<style scoped  lang="less">
  #demo-5{
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
