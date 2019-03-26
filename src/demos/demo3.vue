<template>
  <div id="demo-3" class="demo">
    <div class="demo-title">demo-3：内联视图及年月切换 {{ `${year}年${month}月` }}</div>
    <inlineCalendar @switch="handleSwitch" ref="calendar" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: undefined,
      month: undefined,
    };
  },
  mounted() {
    this.handleSwitch(this.$refs.calendar.showDate);
  },
  methods: {
    handleSwitch(date) {
      this.year = date.year;
      this.month = date.month;
    },
  },
};
</script>

<style scoped  lang="less">
  #demo-3{
    padding: 10px;
    background: #fff;
    .btn{
      margin-right: 20px;
    }
  }
</style>
