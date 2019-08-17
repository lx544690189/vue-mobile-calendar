<template>
  <transition name="m-fade">
    <div class="m-popover" v-show="show"  @click="onPopoverClick" @touchmove="handelTouchStart">
      <transition name="m-slide">
        <div class="m-popover-container" v-show="show">
          <inlineCalendar v-bind="$props" @change="handelChange" @switch="handelSwitch" ref="calendar">
            <template v-slot:day="{date}">
              <slot name="day" :date="date" />
            </template>
          </inlineCalendar>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import './popover.less';
import inlineCalendar from './inlineCalendar';

export default {
  name: 'calendar',
  components: {
    inlineCalendar,
  },
  props: {
    ...inlineCalendar.props,
    show: {
      type: Boolean,
      default: false,
    },
    closeByClickMask: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    // 手动将inlineCalendar提供的外部方法映射到二次封装的组件中，能正常调用
    this.changeDate = this.$refs.calendar.changeDate;
    this.changeDateView = this.$refs.calendar.changeDateView;
  },
  methods: {
    onPopoverClick(e) {
      if (this.closeByClickMask && !this.$refs.calendar.$el.contains(e.target)) {
        this.$emit('update:show', false);
      }
    },
    handelChange(val) {
      this.$emit('change', val);
    },
    handelSwitch(val) {
      this.$emit('switch', val);
    },
    handelTouchStart(e) {
      // 解决移动端滚动穿透
      e.preventDefault();
    },
  },
};
</script>
