# vue-mobile-calendar

![Vue 2.x](https://img.shields.io/badge/vue-2.x-green.svg "Vue 2 Compatible")

[![NPM](https://nodei.co/npm/vue-mobile-calendar.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/vue-mobile-calendar)

> a vue component of calendar for mobile

> 移动端日期选择器（>=vue2.0）

[demo](https://lx544690189.github.io/vue-mobile-calendar/)

<p>
<img src="https://github.com/lx544690189/vue-mobile-calendar/blob/master/screenshot/screenshot.jpg" width="200" float="left"/>
<img src="https://github.com/lx544690189/vue-mobile-calendar/blob/master/screenshot/QRcode.png" width="300" float="left"/>
</p>

## update log
##### v2.3.0（2018-11-12)
bug fixed:最大值计算错误

##### v2.2.0（2018-7-23）
bug fixed:minDate maxDate 等参数动态改变视图不能实时更新问题

## update log
##### v2.1.0（2018-6-5）

bug fixed:切换月份或者年份时，网页会回到顶端

## Build Setup

```
# install dependencies
npm install

# build for production with minification
npm run build
```

## Usage
### install
```bash
npm install vue-mobile-calendar
```

### or:(from the dist folder)
```javascript
<script src="vue-mobile-calendar.js" type="text/javascript"></script>
```

### Quickstart

```javascript
import Vue from 'vue'
import Calendar from 'vue-mobile-calendar'

Vue.use(Calendar)
```

```vue
<calendar
	v-model="calendarShow"
	:defaultDate="defaultDate"
	@change="handelChange">
</calendar>
```

### Attributes

option | description | type | default
---|--- | --- | ---
v-model | show/hide the calendar | Boolean | false
format | format date | String | "yyyy-MM-dd"
defaultDate | default selected date | Date | new Date()
minDate | optional minimum date | Date | null
maxDate  | optional maximum date | Date | null
closeByClickmask | close by mask | Boolean | true
month | text of month | Array | ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
week | text of day | Array | ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]

### Events

event name | description | 	parameter of callback
---|--- | ---
change | when date change | (date,formatDate)

## Reference
- [framework7](https://github.com/nolimits4web/Framework7)
- [mint-ui](https://github.com/ElemeFE/mint-ui/)