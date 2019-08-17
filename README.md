# vue-mobile-calendar

![Vue 2.x](https://img.shields.io/badge/vue-2.x-green.svg "Vue 2 Compatible")

[![NPM](https://nodei.co/npm/vue-mobile-calendar.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-mobile-calendar/)

> a vue component of calendar for mobile

> 移动端日期选择器（>=vue2.0）

[点击查看DEMO](https://lx544690189.github.io/vue-mobile-calendar/)，或手机扫描下方二维码
<p>
<img src="https://github.com/lx544690189/vue-mobile-calendar/blob/master/screenshot/QRcode.png" width="200" float="left" style="border-radius: 6px" />
</p>
<p>
<img src="https://github.com/lx544690189/vue-mobile-calendar/blob/master/screenshot/single.png" width="200" float="left" style="border-radius: 6px" />
<img src="https://github.com/lx544690189/vue-mobile-calendar/blob/master/screenshot/multiple.png" width="200" float="left" style="border-radius: 6px" />
<img src="https://github.com/lx544690189/vue-mobile-calendar/blob/master/screenshot/single.png" width="200" float="left" style="border-radius: 6px" />
</p>

## 使用方法
### npm安装
```bash
npm install vue-mobile-calendar
```

```javascript
import Calendar from 'vue-mobile-calendar'
Vue.use(Calendar);
```
### 外部引用方式，引入目录文件`disk/Calendar.umd.min.js`
```javascript
<script src='/dist/Calendar.umd.min.js'></script>
```
### **注意**
**本次版本升级api与2.x版本不相同，2.x版本api[请点击查看](https://github.com/lx544690189/vue-mobile-calendar/blob/master/README-2.x.md)**

### 更新日志
- V3.2.1(2019-8-17) 
  - [ feat ] 新增日期中显示自定义内容`v-slot:day`，使用方法查看demo-9
  - [ [PR](https://github.com/lx544690189/vue-mobile-calendar/pull/28) ] during 模式下，增加只能在当前展示的月份上进行选择的 prop 
  - [ [fix](https://github.com/lx544690189/vue-mobile-calendar/issues/25) ] changeDate 参数校验错误
- V3.2.0(2019-7-14) 
  - 新增`yearName`设置“年”的多语言；
  - 新增`changeDate`方法，用于改变已选日期；
  - 修复弹窗calendar未暴露组件的某些方法导致调用报错；
  - 修复移动端滚动穿透问题；
- V3.1.1(2019-6-2) 新增minDate、maxDate设置最大、最小可选日期；新增changeDateView方法，用于重置置当前显示的日期
- V3.0.6(2019-3-26) [增加年月切换事件switch](https://github.com/lx544690189/vue-mobile-calendar/pull/11)
- V3.0.0(2019-3-16) 增加多选、时间段选择模式；增加日期内联显示方式；部分api与2.x不相同，升级请注意

### Quickstart

```javascript
<template>
  <div id="demo">
    <calendar @change="onChange"/>
    <inlineCalendar />
  </div>
</template>

<script>
// Vue.use(Calendar)后可直接使用`<calendar />`和`<inlineCalendar />`组件。calendar为底部弹窗显示，inlineCalendar为页面内联显示（可放置页面任意地方）
export default {
  methods: {
    onChange(date) {
      console.log(date.format('YY-MM-DD'));
    },
  },
};

// 或者在.vue文件中单独引入注册
// import {calendar,inlineCalendar} from 'vue-mobile-calendar';
// export default {
//   components: {
//     calendar,
//   },
// };
</script>
```

## 关于日期类型
组件中日期处理依赖[dayjs](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/API-reference.md#api)(api和moment相同，大小仅2kb)，如在设置`defaultDate`时，所支持类型如下：
> #### 当前时间
> 
> 直接运行 `dayjs()`，得到包含当前时间和日期的 `Dayjs` 对象。
> 
> ```js
> dayjs()
> ```
> 
> ### 时间字符串
> 
> 可以解析传入的一个标准的[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)时间字符串。
> 
> ```js
> dayjs(String)
> dayjs('1995-12-25')
> ```
> 
> ### Date 对象
> 
> 可以解析传入的一个 Javascript Date 对象。
> 
> ```js
> dayjs(Date)
> dayjs(new Date(2018, 8, 18))
> ```
> 
> ### Unix 时间戳 (毫秒)
> 
> 可以解析传入的一个 Unix 时间戳 (13 位数字)。
> 
> ```js
> dayjs(Number)
> dayjs(1318781876406)
> ```
> 
> ### Unix 时间戳 (秒)
> 
> 可以解析传入的一个 Unix 时间戳 (10 位数字)。
> 
> ```js
> dayjs.unix(Number)
> dayjs.unix(1318781876)
> ```
更多api查看[dayjs](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/API-reference.md#api)

### 属性

名称 | 类型 | 默认值 | 说明
---|--- | --- | ---
`mode` | `String` | 'single' | 时间选择模式，`single`:单选模式；`multiple`:多选模式；`during`:时间段选择模式
`defaultDate` | `[Date, Number, Array, String]` | - | 默认已选时间，`mode`为单选模式时为`Dayjs`所支持的时间类型(见上面说明)，如'1995-12-25'；`mode`为多选模式为数组形式；`mode`为时间段选择模式为长度2的数组，如`[startDate,endDate]`
`disabledDate` | `Array` | [] | 不可选日期，仅`mode`为'single'和'multiple'下支持
`enableTouch` | `Boolean` | `true` | 允许手势滑动切换月份
`yearName` | `String` | `'年'` | “年”的文本
`monthNames` | `Array` | `['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']` | 显示的月份文本
`weekNames` | `Array` | `['周一', '周二', '周三', '周四', '周五', '周六', '周日']` | 显示的星期文本
`show` | `Boolean` | `false` | 显示/关闭时间选择器弹窗（仅弹窗显示形式的calendar生效），可以使用sync修饰符`:show.sync="isShow"`来对此属性进行双向绑定，方便控制组件的显示隐藏
`closeByClickMask` | `Boolean` | `true` | 允许点击遮罩层关闭（仅弹窗显示形式的calendar生效）
`dayClick` | `Function` | - | 日期点击时的回调函数，回调参数为当前所点击的日期，`return false`将不会执行选中、取消选中的操作
`switch` | `Function` | - | 年月切换的回调，回调参数为当前显示的年月`{year,month}`
`minDate` | `[Date, Number, Array, String]` | - | (v-3.1.0新增)指定最小可选时间，为`Dayjs`所支持的类型数据，不能与`disabledDate`同时使用
`maxDate` | `[Date, Number, Array, String]` | - | (v-3.1.0新增)指定最大可选时间，为`Dayjs`所支持的类型数据，不能与`disabledDate`同时使用

### 事件

名称 | 说明 | 回调
---|--- | ---
change | 当前所选日期改变 | 回调参数为当前所选日期（dayjs类型，如获取时间字符串：`date.format('YYYY-MM-DD')`），`mode`为单选模式时为`date`；`mode`为多选模式为`[date1,date2]`；`mode`为时间段选择模式为`[startDate,endDate]`，当只选了开始时间时会为`[startDate]`

### 方法

名称 | 说明 | 默认值
---|--- | ---
changeDate | 通过`this.$refs.myCalendar.changeDateView(date)`改变当前已选日期，参数为`Dayjs`所支持的类型数据 | -
changeDateView | 通过`this.$refs.myCalendar.changeDateView(toDate)`改变当前显示的日期，如“回到今天” | `toDate`参数不传默认为当前日期


### slot

名称 | 说明 | 参数
---|--- | ---
date | 日期自定义内容 | 参数及使用见下说明

v-slot:day 使用：
```javascript
<template>
  <inlineCalendar>
    <!-- 自定义日期中内容 -->
    <template v-slot:day="scope">
      <!-- 如每月1号显示圆点 -->
      <div v-if="scope.date.value === 1" class="point" />
    </template>
  </inlineCalendar>
</template>

<script>
// 可获取的scope对象如下
scope = {
  date: {
    value,//当前几号
    dateTime,// 当前日期（dayjs类型）
    isGrey,// 是否当前月的日期
    isToday,// 是否今天
    isSelect,// 是否被选中
    isDisable,// 是否被禁止选择
    isDuring,// 是否在已选日期段内
  }
}
</script>

```

## Reference
- [framework7](https://github.com/nolimits4web/Framework7)