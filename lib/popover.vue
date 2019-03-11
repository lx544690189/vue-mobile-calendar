<template>
  <transition name="m-popup-slide-bottom">
    <div class="m-popover" v-show="show">
      <slot/>
    </div>
  </transition>
</template>

<script>
import './popover.less';

export default {
  name: 'popover',
  props: {
    show: Boolean,
    default: false,
  },
};
</script>
