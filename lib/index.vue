<template>
  <popover :show.sync="show">
    <inlineCalendar v-bind="$props" @change="handelChange"></inlineCalendar>
  </popover>
</template>

<script>
import './index.less';
import popover from './popover';
import inlineCalendar from './inlineCalendar';

export default {
  name: 'calendar',
  components: {
    popover,
    inlineCalendar,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    ...inlineCalendar.props,
  },
  methods: {
    handelChange(val) {
      this.$emit('change', val);
    },
  },
};
</script>
