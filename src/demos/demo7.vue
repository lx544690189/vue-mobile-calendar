<template>
  <div id="demo-7" class="demo">
      <div class="note">2019-07-14 V3.2.0新增api：changeDate(date)</div>
    <div class="demo-title">
      demo-7：切换已选日期
    </div>
    <button
      class="btn"
      mode='single'
      @click="changeDate"
    >
      切换已选日期为{{tomorrow.format('YYYY-MM-DD')}}
    </button>
    <inlineCalendar
      ref="inlineCalendar"
      :defaultDate="defaultDate"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  data() {
    return {
      defaultDate: dayjs(),
      tomorrow: dayjs().add(1, 'day'),
    };
  },
  methods: {
    changeDate() {
      this.$refs.inlineCalendar.changeDate(this.tomorrow);
    },
  },
};
</script>

<style scoped  lang="less">
  #demo-7{
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
