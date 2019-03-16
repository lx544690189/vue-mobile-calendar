<template>
  <transition name="m-fade">
    <div class="m-popover" v-show="show"  @click="onPopoverClick">
      <transition name="m-slide">
        <div class="m-popover-container" v-show="show">
          <inlineCalendar v-bind="$props" @change="handelChange" ref="calendar" />
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
  methods: {
    onPopoverClick(e) {
      if (this.closeByClickMask && !this.$refs.calendar.$refs.calendar.contains(e.target)) {
        this.$emit('update:show', false);
      }
    },
    handelChange(val) {
      this.$emit('change', val);
    },
  },
};
</script>
