<template>
	<div class="modal" :class="{show:open}" @click="handelModalClick">
		<transition name="popup-slide-bottom">
			<div class="calendar" v-show="open" ref="calendar">
				<div class="toolbar">
					<div class="toolbar-inner">
						<div class="calendar-month-picker">
							<a class="calendar-prev" @click="handelMonthClick('pre')">
								<div class="pre-img"></div>
							</a>
							<div class="current-month-value">{{ month[currentViewMonth.month - 1]}}</div>
							<a class="calendar-next" @click="handelMonthClick('next')">
								<div class="next-img"></div>
							</a>
						</div>
						<div class="calendar-year-picker">
							<a class="calendar-prev" @click="handelYearClick('pre')">
								<div class="pre-img"></div>
							</a>
							<div class="current-year-value">{{ currentViewMonth.year }}</div>
							<a class="calendar-next" @click="handelYearClick('next')">
								<div class="next-img"></div>
							</a>
						</div>
					</div>
				</div>
				<div class="calendar-inner">
					<div class="calendar-week">
						<div class="calendar-week-day" v-for="(item,index) in week" :key="index">{{item}}</div>
					</div>
					<div class="calendar-month" ref="calendar-touch">
						<div class="calendar-month-wrapper"
							:style="{'transform': 'translate3d(' + (translateX_parent) + '%, 0, 0)'}">
							<div class="calendar-month-pre"
								:style="{'transform': 'translate3d(' + (translateX-100) + '%, 0, 0)'}">
								<div class="calendar-month-row" v-for="(row, row_index) in dateObj.pre.allDay_list" :key="row_index">
									<div class="calendar-day"
										v-for="(col, col_index) in row"
                    :key="col_index"
										@click="handelDayClick(col,col_index,dateObj.pre.start,dateObj.pre.end)"
										:class="{'grey':row_index*7+row_index*7+col_index<dateObj.pre.start || row_index*7+col_index>dateObj.pre.end ,'selected':col.selected }">
										<span :class="{'today':col.isToday,'invalid':col.invalid}">
											{{ col.value }}
										</span>
									</div>
								</div>
							</div>
							<div class="calendar-month-current"
								:style="{'transform': 'translate3d(' + translateX + '%, 0, 0)'}">
								<div class="calendar-month-row" v-for="(row, row_index) in dateObj.current.allDay_list" :key="row_index">
									<div class="calendar-day"
										v-for="(col, col_index) in row"
                    :key="col_index"
										@click="handelDayClick(col,row_index*7+col_index,dateObj.current.start,dateObj.current.end)"
										:class="{'grey':row_index*7+col_index<dateObj.current.start || row_index*7+col_index>dateObj.current.end ,'selected':col.selected }">
										<span :class="{'today':col.isToday,'invalid':col.invalid}">
											{{ col.value }}
										</span>
									</div>
								</div>
							</div>
							<div class="calendar-month-next"
								:style="{'transform': 'translate3d(' + (translateX+100) + '%, 0, 0)'}">
								<div class="calendar-month-row" v-for="(row, row_index) in dateObj.next.allDay_list" :key="row_index">
									<div class="calendar-day"
										v-for="(col, col_index) in row"
                    :key="col_index"
										@click="handelDayClick(col,row_index*7+col_index,dateObj.next.start,dateObj.next.end)"
										:class="{'grey':row_index*7+col_index<dateObj.next.start || row_index*7+col_index>dateObj.next.end ,'selected':col.selected }">
										<span :class="{'today':col.isToday,'invalid':col.invalid}">
											{{ col.value }}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'calendar',
		props: {
			value: {
				type: Boolean,
				default: false
			},
			closeByClickmask: {
				type: Boolean,
				default: true
			},
			format: {
				type: String,
				default: "yyyy-MM-dd"
			},
			defaultDate: {
				type: Date,
        		default:null
			},
			maxDate:{
				type: Date,
        		default:null
			},
			minDate:{
				type: Date,
        		default:null
			},
			month: {
				type: Array,
        		default:function(){
        			return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        		}
			},
			week: {
				type: Array,
        		default:function(){
        			return ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
        		}
			}
		},
		data() {
			return {
				open:false,
				dateObj: {
					pre:{},
					current:{},
					next:{}
				},
				translateX:0,
				translateX_parent:0,
				translateTime:0,
				currentViewMonth:{
					year:2017,
					month:6,
					day:1
				},
				selectedDate:{
					year:null,
					month:null,
					day:null
				},
				touch:{
					startX:null,
					startY:null
				}
			}
		},
		watch: {
			open(val) {
				this.$emit('input', val);
			},
			value(val) {
				this.open = val;
      },
      minDate(val){
        this.assignSelectedDate();
      },
      maxDate(val){
        this.assignSelectedDate();
      }
		},
		created() {
			this.init();
		},
		mounted() {
			if(this.value){
				this.open = true;
			}
			this.$refs["calendar-touch"].addEventListener('touchstart', this.handleTouchStart);
			this.$refs["calendar-touch"].addEventListener('touchend', this.handleTouchEnd);
		},
		beforeDestroy() {
			this.$refs["calendar-touch"].removeEventListener('touchstart', this.handleTouchStart);
			this.$refs["calendar-touch"].removeEventListener('touchend', this.handleTouchEnd);
		},
		methods: {
			//初始化
			init(){
				if(this.defaultDate){
					if(this.defaultDate instanceof Date){
						let dateArray = dateFormat(this.defaultDate,"yyyy-MM-dd").split("-");
						this.selectedDate = {
							year:parseInt(dateArray[0]),
							month:parseInt(dateArray[1]),
							day:parseInt(dateArray[2])
						};
						this.currentViewMonth = {
							year:parseInt(dateArray[0]),
							month:parseInt(dateArray[1]),
							day:parseInt(dateArray[2])
						};
					}else{
						console.error("error parameter of defaultDate!")
					}
				}else{
					let dateArray = dateFormat(new Date(),"yyyy-MM-dd").split("-");
					this.currentViewMonth = {
						year:parseInt(dateArray[0]),
						month:parseInt(dateArray[1]),
						day:parseInt(dateArray[2])
					};
				}
				if(!this.month instanceof Array || !this.week instanceof Array || this.month.length != 12 || this.week.length != 7){
					console.error("error parameter of month or week!")
				}
				this.createdDate();
			},
			handleTouchStart(event){
				this.touch.startX = event.touches[0].clientX;
        		this.touch.startY = event.touches[0].clientY;
			},
			handleTouchEnd(event){
			    let endX = event.changedTouches[0].pageX,
			    	endY = event.changedTouches[0].pageY,
			    	distanceX = endX-this.touch.startX,
			    	distanceY = endY-this.touch.startY;
			    if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX>0 && Math.abs(distanceX)>50){
			        this.handelMonthClick('pre',true);
			    }else if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX<0 && Math.abs(distanceX)>50){
			        this.handelMonthClick('next',true);
			    }
			},
			handelModalClick(e){
				if(this.closeByClickmask&&!this.$refs.calendar.contains(e.target)){
					this.open = false;
				}
			},
			//创建日期
			createdDate() {
				let year = this.currentViewMonth.year;
				let month = this.currentViewMonth.month;
				this.dateObj.pre = getAllDayInMonth(month==1?year-1:year,month==1?12:month-1);
				this.dateObj.current= getAllDayInMonth(year,month);
				this.dateObj.next = getAllDayInMonth(month==12?year+1:year,month==12?1:month+1);
				this.assignSelectedDate();
			},
			//判断过度动画是否结束
			isTranslateEnd(){
				if(this.translateTime != 0){
					let timeDuring = new Date() - this.translateTime;
					if(timeDuring<450){
						return false;
					}
				}
				return true;
			},
			//月份切换
			handelMonthClick(action,translateCheck){
				if(translateCheck&&!this.isTranslateEnd())return;
				this.translateTime = new Date();
				if(action == "pre"){
					this.translateX += 100;
					if(this.currentViewMonth.month == 1){
						this.currentViewMonth.year--;
						this.currentViewMonth.month = 12;
					}else{
						this.currentViewMonth.month--;
					}
					setTimeout(()=>{
						this.translateX_parent -= 100;
						this.createdDate();
					},450)
				}
				if(action == "next"){
					this.translateX -= 100;
					if(this.currentViewMonth.month == 12){
						this.currentViewMonth.year++;
						this.currentViewMonth.month = 1;
					}else{
						this.currentViewMonth.month++;
					}
					setTimeout(()=>{
						this.translateX_parent += 100;
						this.createdDate();
					},450)
				}
			},
			//年份切换
			handelYearClick(action){
				//if(!this.isTranslateEnd())return;
				this.translateTime = new Date();
				if(action == "pre"){
					this.translateX += 100;
					this.currentViewMonth.year--;
					setTimeout(()=>{
						this.translateX_parent -= 100;
						this.createdDate();
					},430)
				}
				if(action == "next"){
					this.translateX -= 100;
					this.currentViewMonth.year++;
					setTimeout(()=>{
						this.translateX_parent += 100;
						this.createdDate();
					},430)
				}
			},
			//日期选择
			handelDayClick(col,index,start, end){
				if(!this.isTranslateEnd())return;
				if(col.invalid)return;
				this.translateTime = new Date();
				this.open = false;
				if(!col.selected){
					this.removeSelectedDate();
					col.selected = true;
					this.selectedDate.day = col.value;
					if(index+1 <= start){
						this.selectedDate.month = this.currentViewMonth.month==1?12:this.currentViewMonth.month-1;
						this.selectedDate.year = this.currentViewMonth.month==1?this.currentViewMonth.year-1:this.currentViewMonth.year;
						this.handelMonthClick("pre",false)
					}else if(index > end){
						this.selectedDate.month = this.currentViewMonth.month==12?1:this.currentViewMonth.month+1;
						this.selectedDate.year = this.currentViewMonth.month==12?this.currentViewMonth.year+1:this.currentViewMonth.year;
						this.handelMonthClick("next",false)
					}else{
						this.selectedDate.month = this.currentViewMonth.month;
						this.selectedDate.year = this.currentViewMonth.year;
					}
					let date = new Date(this.selectedDate.year,this.selectedDate.month - 1,this.selectedDate.day);
					this.$emit('change', date,dateFormat(date,this.format));
				}
			},
			//移除已选择日期
			removeSelectedDate(){
				for(let key in this.dateObj){
					for(let row in this.dateObj[key].allDay_list){
						for(let col in this.dateObj[key].allDay_list[row]){
							if(this.dateObj[key].allDay_list[row][col].selected){
								this.dateObj[key].allDay_list[row][col].selected = false;
							}
						}
					}
				}
			},
			//设定已选日期,高亮当天，置灰不可选日期
			assignSelectedDate(){
				for(let key in this.dateObj){
					for(let row in this.dateObj[key].allDay_list){
						for(let col in this.dateObj[key].allDay_list[row]){
							let year = this.dateObj[key].year,
								month = this.dateObj[key].month,
								day = this.dateObj[key].allDay_list[row][col].value,
								index = row*7 + parseInt(col);
							if(index < this.dateObj[key].start){
								year = month==1?year - 1:year;
								month = month==1?12:month - 1;
							}else if(index > this.dateObj[key].end){
								year = month==12?year + 1:year;
								month = month==12?1:month + 1;
							}
							let date = new Date(year,month-1,day),
								today = new Date();
							if(this.selectedDate.year == year && this.selectedDate.month == month && this.selectedDate.day == day){
								this.dateObj[key].allDay_list[row][col].selected = true;
							}
							if(0 <= today-date && today-date < 24*60*60*1000 ){
								this.dateObj[key].allDay_list[row][col].isToday = true;
							}
              if(this.minDate && date - new Date(this.minDate.getFullYear(),this.minDate.getMonth(),this.minDate.getUTCDate()) < 0
              || this.maxDate && date - new Date(this.maxDate.getFullYear(),this.maxDate.getMonth(),this.maxDate.getUTCDate()+1) > 0){
								this.dateObj[key].allDay_list[row][col].invalid = true;
							}else{
                this.dateObj[key].allDay_list[row][col].invalid = false;
              }
						}
					}
				}
			}
		}
	}
	
	function getAllDayInMonth(year, month) {
		let allDay = new Array();
		let day = new Date();
		day.setFullYear(year, month - 1, 1);
		let firstDayInweek = day.getDay()==0?7:day.getDay();
		day.setFullYear(year, month, 0);
		let daysCount = day.getDate();
		let start = firstDayInweek - 1;
		let end = firstDayInweek + daysCount -2;
		for(let i = 0; i < daysCount; i++) {
			allDay[firstDayInweek + i - 1] = i + 1;
		}
		day.setFullYear(year, month - 1, 0);
		let preDaysCount = day.getDate();
		for(let i = firstDayInweek - 1; i > 0; i--) {
			allDay[i - 1] = preDaysCount - (firstDayInweek - (i + 1));
		}
		for(let i = daysCount + firstDayInweek; i < 6 * 7 + 1; i++) {
			allDay[i - 1] = i - (daysCount + firstDayInweek) + 1;
		}
		let allDay_list = new Array();
		for(let i = 0; i < 6; i++) {
			let item = new Array();
			for(let j = 0; j < 7; j++) {
				item[j] = {
					value : allDay[i * 7 + j],
					selected : false
				}
			}
			allDay_list.push(item)
		}
		return {allDay_list,start,end,year,month};
	}
	
	function dateFormat(date,fmt) {
		var o = {
			"M+": date.getMonth() + 1,
			"d+": date.getDate()
		};
		if(/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
</script>

<style scoped>
	.modal{
		position: absolute;
	    left: 0;
	    top: 0;
	    background: rgba(0,0,0,.4);
	    z-index: 9999;
	    opacity: 0;
	    transition: opacity .3s;
	    -webkit-transition: opacity .3s;
	}
	.modal.show{
		width: 100%;
	    height: 100%;
		opacity: 1;
	}
	.calendar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 300px;
		background-color: #fff;
		z-index: 10000;
		transform: translateY(0);
		-webkit-transform: translateY(0);
		transition-duration: .2s;
		-webkit-transition-duration: .2s;
		transition-timing-function: linear;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
   		-webkit-touch-callout: none;
	}
	
	.popup-slide-bottom-enter,
	.popup-slide-bottom-leave-active {
		transform: translateY(300px);
	}
	
	.fade-enter-active {
		transition: opacity .5s
	}
	
	.fade-enter,
	.fade-leave {
		opacity: 0
	}
	
	.toolbar {
		position: relative;
	}
	
	.toolbar-inner {
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
	
	.calendar-month-picker,
	.calendar-year-picker {
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		min-width: 120px;
	}
	
	.current-month-value,.current-year-value{
		width: 70px;
		-webkit-flex-shrink: 1;
	    -ms-flex: 0 1 auto;
	    flex-shrink: 1;
	    position: relative;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	
	.calendar-prev,
	.calendar-next {
		padding: 10px 10px;
	}
	
	.pre-img,
	.next-img {
		background-size: 100% 100%;
		width: 20px;
		height: 20px;
	}
	
	.pre-img {
		background-image: url(data:image/png;base64,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);
	}
	
	.next-img {
		background-image: url(data:image/png;base64,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);
	}
	
	.calendar-inner {
		box-sizing: border-box;
	}
	
	.calendar-week {
		position: relative;
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		height: 20px;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		font-size: 11px;
		background: #f7f7f8;
	}
	
	.calendar-week::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background-color: #c4c4c4;
		transform: translateY(-0.5px);
		transform: scaleY(0.5);
	}
	
	.calendar-week-day {
		flex-grow: 1;
		text-align: center;
		width: 14.28571429%;
		width: -webkit-calc(100% / 7);
		width: calc(100% / 7);
		line-height: 20px;
		-webkit-flex-shrink: 1;
	    -ms-flex: 0 1 auto;
	    flex-shrink: 1;
	    position: relative;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    padding: 0 5px;
	}
	
	.calendar-month{
		position: relative;
		width: 100%;
		height: 240px;
		overflow: hidden;
	}
	
	.calendar-month-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	
	.calendar-month-pre,.calendar-month-current,.calendar-month-next{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition-duration: 400ms;
		transition-timing-function: ease-in-out;
	}
	
	.calendar-month-row {
		position: relative;
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		width: 100%;
		-webkit-flex-shrink: 1;
		-ms-flex: 0 1 auto;
		-webkit-flex-shrink: 1;
		-ms-flex-negative: 1;
		flex-shrink: 1;
		height: 40px;
	}
	
	.calendar-month-row::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background-color: #ccc;
		transform: translateY(-0.5px);
		-webkit-transform: translateY(-0.5px);
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
	}
	
	.calendar-day {
		box-sizing: border-box;
		font-size: 15px;
		color: #3d4145;
		text-align: center;
		cursor: pointer;
		flex-grow: 1;
		line-height: 40px;
		width: 14.28571429%;
		width: -webkit-calc(100% / 7);
		width: calc(100% / 7);
		color: black;
	}
	
	.calendar-day.grey{
		color: #757575;
	}
	
	.calendar-day span{
		display: inline-block;
	    width: 30px;
	    height: 30px;
	    line-height: 30px;
	    border-radius: 100%;
	}
	
	.calendar-day span.invalid{
		color: #e0e0e0;
		cursor: not-allowed;
	}
	.calendar-day span.today{
		background-color: #eeeeee;
	}
	.calendar-day.selected span{
		color: #fff;
		background: #0894ec;
	}
</style>