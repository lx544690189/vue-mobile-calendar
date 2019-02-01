<template>
  <div :class="inline? 'm-calendar' : 'm-calendar m-popover' ">
    <div class="m-toolbar">
      <div class="m-year-selector">year</div>
      <div class="m-month-selector">month</div>
    </div>
    <div class="m-week-header">
      <div class="m-week-day">周一</div>
      <div class="m-week-day">周二</div>
      <div class="m-week-day">周三</div>
      <div class="m-week-day">周四</div>
      <div class="m-week-day">周五</div>
      <div class="m-week-day">周六</div>
      <div class="m-week-day">周日</div>
    </div>
    <div class="m-months">
      <div class="m-row">
        
      </div>
      <div class="m-row">
        
      </div>
    </div>
  </div>
</template>

<script>
import "./index.less";

export default {
  name: "calendar",
  props: {
    inline: Boolean,
    default: false,
  }
};
</script>

