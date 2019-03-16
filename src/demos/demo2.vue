<template>
  <div id="demo-2" class="demo">
    <div class="demo-title">demo-2：指定已选日期、不可选择日期</div>
    <button class="btn" @click="selectDate('single')">单选模式</button>
    <button class="btn" @click="selectDate('multiple')">多选模式</button>
    <button class="btn" @click="selectDate('during')">时间段选择模式</button>
    <p>
      mode={{mode}}
    </p>
    <p v-if="mode==='single'">
      defaultDate={{this.defaultDate.format('YYYY-MM-DD')}}
    </p>
    <p v-if="mode==='multiple' || mode==='during'">
      defaultDate={{this.defaultDate.map(item=>item.format('YYYY-MM-DD'))}}
    </p>
    <p v-if="mode==='single' || mode==='multiple'">
      disabledDate={{this.disabledDate.map(item=>item.format('YYYY-MM-DD'))}}
    </p>
    <p>
      已选日期：{{this.date}}
    </p>
    <calendar
      :show.sync="show"
      :mode="mode"
      :defaultDate="defaultDate"
      :disabledDate="disabledDate"
      @change="onChange"
     />
  </div>
</template>

<script>
import dayjs from 'dayjs';
const DEFAULT_DATE = {
  single: dayjs().add(2, 'day'),
  multiple: [dayjs(), dayjs().add(2, 'day'), dayjs().add(3, 'day')],
  during: [dayjs(), dayjs().add(3, 'day')],
};
export default {
  data() {
    return {
      show: false,
      mode: 'single',
      date: '',
      defaultDate: DEFAULT_DATE.single,
      disabledDate: [dayjs().subtract(2, 'day'), dayjs().add(1, 'day')],
    };
  },
  methods: {
    selectDate(mode) {
      this.show = true;
      this.mode = mode;
      this.defaultDate = DEFAULT_DATE[mode];
      this.date = '';
    },
    onChange(date) {
      if (this.mode === 'single') {
        this.date = date.format('YYYY-MM-DD');
      } else {
        this.date = JSON.stringify(date.map((item) => item.format('YYYY-MM-DD')));
      }
    },
  },
};
</script>

<style scoped  lang="less">
  #demo-2{
    padding: 10px;
    background: #fff;
    .btn{
      margin-right: 20px;
    }
  }
</style>
