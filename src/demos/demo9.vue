<template>
  <div id="demo-9" class="demo">
      <div class="note">2019-8-17 V3.3.0新增api：v-slot:day</div>
    <div class="demo-title">demo-9：自定义日期显示的内容</div>
    <inlineCalendar>
      <template v-slot:day="scope">
        <div v-if="scope.date.value === 1" class="point"></div>
      </template>
    </inlineCalendar>
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
  methods: {
  },
};
</script>

<style scoped  lang="less">
  #demo-9{
    padding: 10px;
    background: #fff;
    .note{
      font-size: 14px;
      padding: 10px 0;
      color: red;
    }
  }
  .point{
    width: 6px;
    height: 6px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 20%;
    right:20%;
  }
</style>
