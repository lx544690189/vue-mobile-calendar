<template>
  <div class="m-calendar">
    <div class="m-toolbar">
      <div class="m-year-selector">
        <a class="m-prev-btn"></a>
        <span>2019</span>
        <a class="m-next-btn"></a>
      </div>
      <div class="m-month-selector">
        <a class="m-prev-btn"></a>
        <span>2月</span>
        <a class="m-next-btn"></a>
      </div>
    </div>
    <div class="m-week-header">
      <div
        class="m-week-day"
        v-for="item in weekLan"
        :key="item"
      >
        {{item}}
      </div>
    </div>
    <div class="m-months-container">
      <div
        class="m-months"
        v-for="(month,monthIndex) in fullDate"
        :key="monthIndex"
        :style="{'transform': 'translate3d(' + (monthIndex-1)*100 + '%, 0, 0)'}"
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
            <span >
              {{day}}
            </span>
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
    monthLan: {
      type: Array,
      default: function() {
        return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
      },
    },
    weekLan: {
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
    };
  },
  mounted() {
    this.getFullDate('2019-3');
  },
  methods: {
    getFullDate(year, month) {
      const date = dayjs(`${year}-${month}`);
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
      const firstDayOfWeek = thisDate.day();
      const dayCountOfThisMonth = thisDate.daysInMonth();
      const dayCountOfPrevMonth = prevDate.daysInMonth();
      const prevIndexOfThisMonth = firstDayOfWeek - 1;
      const NextIndexOfThisMonth = firstDayOfWeek + dayCountOfThisMonth - 2;
      for (let i = 0; i < 7 * 6; i++) {
        if (i < prevIndexOfThisMonth) {
          date[i] = dayCountOfPrevMonth - (firstDayOfWeek - i - 2);
        } else if (
          i >= prevIndexOfThisMonth &&
          i <= NextIndexOfThisMonth
        ) {
          date[i] = i - firstDayOfWeek + 2;
        } else {
          date[i] = i - firstDayOfWeek - dayCountOfThisMonth + 2;
        }
      }
      const fullDate = [];
      for (let i = 0; i < 6; i++) {
        fullDate.push(date.slice(i * 7, (i + 1) * 7));
      }
      const flag = {
        year: thisDate.year(),
        month: thisDate.month(),
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
