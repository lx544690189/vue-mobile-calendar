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
      <div class="m-week-day">周一</div>
      <div class="m-week-day">周二</div>
      <div class="m-week-day">周三</div>
      <div class="m-week-day">周四</div>
      <div class="m-week-day">周五</div>
      <div class="m-week-day">周六</div>
      <div class="m-week-day">周日</div>
    </div>
    <div class="m-months" v-for="(item,index) in fullDate" :key="index" :style="{'transform': 'translate3d(' + (index) + '%, 0, 0)'}">
      <div class="m-row">
        <div class="m-day">25</div>
        <div class="m-day">25</div>
        <div class="m-day">25</div>
        <div class="m-day">25</div>
        <div class="m-day">25</div>
        <div class="m-day">25</div>
        <div class="m-day">25</div>
      </div>
      <div class="m-row">1</div>
      <div class="m-row">1</div>
      <div class="m-row">1</div>
      <div class="m-row">1</div>
      <div class="m-row">1</div>
    </div>
  </div>
</template>

<script>
import './inlineCalendar.less'
import dayjs from 'dayjs'

export default {
  data () {
    return {
      fullDate: [[], [], []]
    }
  },
  mounted () {
    this.fullDate = this.getFullDate('2019-3')
    console.log('date: ', this.fullDate)
  },
  methods: {
    getFullDate (year, month) {
      const thisDate = dayjs(`${year}-${month}`)
      const prevDate = thisDate.subtract(1, 'month')
      const nextDate = thisDate.add(1, 'month')
      return [
        this.getDate(prevDate),
        this.getDate(thisDate),
        this.getDate(nextDate)
      ]
    },
    getDate (thisDate) {
      let date = []
      const prevDate = thisDate.subtract(1, 'month')
      const firstDayOfWeek = thisDate.day()
      const dayCountOfThisMonth = thisDate.daysInMonth()
      const dayCountOfPrevMonth = prevDate.daysInMonth()
      for (let i = 0; i < 7 * 6; i++) {
        if (i < firstDayOfWeek - 1) {
          date[i] = dayCountOfPrevMonth - (firstDayOfWeek - i - 2)
        } else if (i >= firstDayOfWeek - 1 && i <= firstDayOfWeek + dayCountOfThisMonth - 2) {
          date[i] = i - firstDayOfWeek + 2
        } else {
          date[i] = i - firstDayOfWeek - dayCountOfThisMonth + 2
        }
      }
      return date
    }
  }
}
</script>
