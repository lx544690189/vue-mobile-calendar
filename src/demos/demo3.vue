<template>
  <div id="demo-3" class="demo">
    <div class="demo-title">demo-3：内联视图</div>
    <inlineCalendar />
  </div>
</template>

<script>
import { inlineCalendar } from 'vue-mobile-calendar';
export default {
  components: {
    inlineCalendar,
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
