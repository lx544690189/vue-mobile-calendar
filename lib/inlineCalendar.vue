<template>
  <div class="m-calendar">
    <div class="m-toolbar">
      <div class="m-year-selector">
        <a class="m-prev-btn" @click="changeYear('prev')"></a>
        <span>{{showDate.year}} 年</span>
        <a class="m-next-btn" @click="changeYear('next')"></a>
      </div>
      <div class="m-month-selector">
        <a class="m-prev-btn" @click="changeMonth('prev')"></a>
        <span>{{showDate.month}} 月</span>
        <a class="m-next-btn" @click="changeMonth('next')"></a>
      </div>
    </div>
    <div class="m-week-header">
      <div
        class="m-week-day"
        v-for="item in weekNames"
        :key="item"
      >
        {{item}}
      </div>
    </div>
    <div
      class="m-months-container"
    >
      <div
        class="m-months-wrapper"
        :style="{'transform': 'translate3d(' + (-translateX)*100 + '%, 0, 0)'}"
      >
        <div
          class="m-months"
          v-for="(month,monthIndex) in fullDate"
          :key="monthIndex"
          :style="{'transform': 'translate3d(' + (monthIndex-1+translateX)*100 + '%, 0, 0)'}"
        >
          <div
            class="m-row"
            v-for="(week,weekIndex) in month"
            :key="weekIndex"
          >
            <div
              class="m-day"
              v-for="(day,dayIndex) in week"
              :key="dayIndex"
            >
              <span
                :class="{
                  'm-day-num':true,
                  'm-grey': day.isGrey,
                  'm-today': day.isToday,
                  'm-disable': false,
                  'm-select': day.isSelect,
                }"
              >
                {{day.value}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './inlineCalendar.less';
import dayjs from 'dayjs';

export default {
  props: {
    defaultDate: {
      type: [Date, Number, Array, String],
    },
    mode: {
      type: String,
      default: 'single',
    },
    monthNames: {
      type: Array,
      default: function() {
        return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
      },
    },
    weekNames: {
      type: Array,
      default: function() {
        return ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      },
    },
  },
  data() {
    return {
      fullDate: [[], [], []],
      flag: [[], [], []],
      translateX: 0,
      showDate: {
        year: undefined,
        month: undefined,
      },
      dateNow: {
        year: dayjs().year(),
        month: dayjs().month() + 1,
        date: dayjs().date(),
      },
      selectDate: undefined,
    };
  },
  // computed: {
  //   selectDate() {
  //     let date;
  //     const { mode, defaultDate } = this.$props;
  //     switch (mode) {
  //     case 'single':
  //       if (defaultDate) {
  //         date = dayjs(defaultDate).startOf('day');
  //       }
  //       break;

  //     default:
  //       break;
  //     }
  //     return date;
  //   },
  // },
  // watch: {
  //   showDate(value) {
  //     this.getFullDate(value);
  //   },
  // },
  created() {
    let { defaultDate, mode } = this;
    let dateToShow = dayjs().startOf('month');
    if (mode === 'single' && defaultDate) {
      this.selectDate = dayjs(defaultDate).startOf('day');
      dateToShow = this.selectDate.startOf('month');
    }
    if (mode === 'multiple' && Array.isArray(defaultDate)) {
      if (defaultDate.length > 0) {
        this.selectDate = defaultDate.map((item) => dayjs(item).startOf('day'));
      } else {
        this.selectDate = [];
      }
    }
    this.showDate = {
      year: dateToShow.year(),
      month: dateToShow.month() + 1,
    };
    this.getFullDate(this.showDate);
  },
  methods: {
    // 切换年份
    changeYear(action) {
      const date = dayjs(`${this.showDate.year}-${this.showDate.month}`);
      let computedDate;
      switch (action) {
      case 'prev':
        this.translateX += 1;
        computedDate = date.subtract(1, 'year');
        break;
      case 'next':
        this.translateX -= 1;
        computedDate = date.add(1, 'year');
        break;
      }
      this.showDate = {
        year: computedDate.year(),
        month: computedDate.month() + 1,
      };
      this.getFullDate(this.showDate);
    },
    // 切换月份
    changeMonth(action) {
      const date = dayjs(`${this.showDate.year}-${this.showDate.month}`);
      let computedDate;
      switch (action) {
      case 'prev':
        this.translateX += 1;
        computedDate = date.subtract(1, 'month');
        break;
      case 'next':
        this.translateX -= 1;
        computedDate = date.add(1, 'month');
        break;
      }
      this.showDate = {
        year: computedDate.year(),
        month: computedDate.month() + 1,
      };
      this.getFullDate(this.showDate);
    },
    // 当前日期是否被选中
    isSelect(date) {
      let select = false;
      switch (this.$props.mode) {
      case 'single':
        if (this.selectDate && date.isSame(this.selectDate)) {
          select = true;
        }
        break;
      case 'multiple':
        if (this.selectDate.length > 0 && this.selectDate.some((item) => date.isSame(item))) {
          select = true;
        }
        break;
      default:
        break;
      }
      return select;
    },
    getFullDate() {
      const date = dayjs(`${this.showDate.year}-${this.showDate.month}`);
      console.log('date: ', date.format('YYYY-MM'));
      const thisDate = this.getDate(date);
      const prevDate = this.getDate(date.subtract(1, 'month'));
      const nextDate = this.getDate(date.add(1, 'month'));
      this.fullDate = [
        prevDate.fullDate,
        thisDate.fullDate,
        nextDate.fullDate,
      ];
      console.log('this.fullDate: ', this.fullDate);
      this.flag = [
        prevDate.flag,
        thisDate.flag,
        nextDate.flag,
      ];
    },
    getDate(thisDate) {
      let date = [];
      const prevDate = thisDate.subtract(1, 'month');
      const nextDate = thisDate.add(1, 'month');
      const firstDayOfWeek = thisDate.day() || 7;
      const dayCountOfThisMonth = thisDate.daysInMonth();
      const dayCountOfPrevMonth = prevDate.daysInMonth();
      const prevIndexOfThisMonth = firstDayOfWeek - 1;
      const NextIndexOfThisMonth = firstDayOfWeek + dayCountOfThisMonth - 2;
      for (let i = 0; i < 7 * 6; i++) {
        // 上月
        if (i < prevIndexOfThisMonth) {
          const value = dayCountOfPrevMonth - (firstDayOfWeek - i - 2);
          date[i] = {
            value,
            isGrey: true,
            isToday: prevDate.date(value).isSame(dayjs().startOf('day')),
            isSelect: this.isSelect(prevDate.date(value)),
          };
        }
        // 当月
        if (
          i >= prevIndexOfThisMonth &&
          i <= NextIndexOfThisMonth
        ) {
          const value = i - firstDayOfWeek + 2;
          date[i] = {
            value,
            isGrey: false,
            isToday: thisDate.date(value).isSame(dayjs().startOf('day')),
            isSelect: this.isSelect(thisDate.date(value)),
          };
        }
        // 下月
        if (i > NextIndexOfThisMonth) {
          const value = i - firstDayOfWeek - dayCountOfThisMonth + 2;
          date[i] = {
            value,
            isGrey: true,
            isToday: nextDate.date(value).isSame(dayjs().startOf('day')),
            isSelect: this.isSelect(nextDate.date(value)),
          };
        }
      }
      const fullDate = [];
      for (let i = 0; i < 6; i++) {
        fullDate.push(date.slice(i * 7, (i + 1) * 7));
      }
      const flag = {
        year: thisDate.year(),
        month: thisDate.month() + 1,
        firstIndex: prevIndexOfThisMonth,
        lastIndex: NextIndexOfThisMonth,
      };
      return {
        fullDate,
        flag,
      };
    },
  },
};
</script>
