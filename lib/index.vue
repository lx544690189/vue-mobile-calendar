<template>
  <popover :show.sync="show">
    <inlineCalendar></inlineCalendar>
  </popover>
</template>

<script>
import './index.less';
import popover from './popover';
import inlineCalendar from './inlineCalendar';

export default {
  name: 'calendar',
  data() {
    return {
      isInline: this.inline,
    };
  },
  components: {
    popover,
    inlineCalendar,
  },
  props: {
    show: Boolean,
    default: false,
  },
};
</script>
