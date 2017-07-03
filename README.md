# vue-mobile-calendar

![Vue 2.x](https://img.shields.io/badge/vue-2.x-green.svg "Vue 2 Compatible")
> a vue component of calendar for mobile

[demo](https://lx544690189.github.io/vue-mobile-calendar/)

## Build Setup

``` bash
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
onChange | when date change | (date,formatDate)