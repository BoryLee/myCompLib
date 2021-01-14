<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class='calendar-title'>
        日历
      </div>
      <div class='calendar-subtitle'>
        {{subtitle}}
      </div>
      <div class='calendar-weekdays'>
        <div class='calendar-weekday' v-for="(weekday, weekdayIndex) in weekdays" :key='weekdayIndex'>
          <span :class="{'red' :weekdayIndex === 0 || weekdayIndex === 6}">{{weekday}}</span>
        </div>
      </div>
    </div>
    <div class="calendar-body" @scroll='scroll'>
      <div class="calendar-month"
            v-for="(item,dateIndex) in showDates"
          :key='dateIndex'>
        <span class="calendar-month-watermark" v-if='showMark'>{{item.month}}</span>
        <span class='calendar-month-title'>{{ !item.isCurrent ? item.monthTitle : '' }}</span>
        <div class="calendar-days">
          <div
              class='calendar-day'
              :class="getClassName(item.isCurrentMonth,day)"
              :style='{color : getDayColor(day)}'
              v-for='(day,dayIndex) in item.days'
              :key='dayIndex'
              @click='selectOneDay(item.date,dayIndex,dateIndex)'
              >
            <span>{{day.solarDay}}</span>
            <span v-if='showLunar'>{{lunarToFestival(day)}}</span>
            <span v-if='day.task'>{{day.task}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="calendar-footer">
    </div>
  </div>
</template>

<script>
import { calendar } from '../libs/calendar.js';
import { getCurrentPageDays,getOtherMonthDate,getDateList } from '../utils/util.js'
const COLUMN = 7;
const ROW = 6;
export default {
  name: 'Calendar',
  props: {
    defaultDate: {
      type: Date
    },
    showMark: {
      type: Boolean,
      default: true
    },
    showLunar: {
      type: Boolean,
      default: true
    },
    activeClass: {
        type: String,
    }
  },
  data() {
    return {
      weekdays: calendar.weekdays,
      subtitle: '',
      showDates : [],
    }
  },
  watch: {
    defaultDate(value){
      if(value){
        this.initDate(value);
      }
    }
  },
  created(){
    if(this.defaultDate){
      this.initDate(this.defaultDate);
    }
  },
  mounted(){
    this.getScrollHeight();
  },
  methods: {
    getDayColor(day){
      return !day.isPast && !day.isFuture && (day.weekDay === 6 || day.weekDay === 7) ? 'red' : '';
    },
    getClassName(isCurrentMonth,day){
      if(day.isSelect){
        if(isCurrentMonth){
          return this.activeClass ? this.activeClass : 'select';
        }
      }else if(day.isPast){
        return 'past';
      }else if(day.isFuture){
        return 'future';
      }
    },
    lunarToFestival(day){
      if(day.lunarFestival){
        return day.lunarFestival;
      }else if(day.festival){
        return day.festival;
      }else{
        return day.lunarDay;
      }
    },
    getScrollHeight(){
      const calendarDOM = document.getElementsByClassName('calendar-month')[0];
      const { height } = calendarDOM.getBoundingClientRect();
      this.scrollHeight = height;
    },
    initDate(date){
      this.subtitle = this.getSubtitle(date);
      const nextDate = getOtherMonthDate(date,'next');
      let ary = [];
      for(let i = 0; i < 10;i++){
        let len = ary.length;
        if(i == 0){
          const {days,month,monthTitle} = this.getInitialDate(date);
          ary.push({
            date: date,
            isCurrent: true,
            isCurrentMonth: true,
            days,month,monthTitle
          })
        }else{
          const {days,month,monthTitle} = this.getInitialDate(getOtherMonthDate(ary[len-1]['date'],'next'));
          ary.push({
            date: getOtherMonthDate(ary[len-1]['date'],'next'),
            isCurrent: false,
            isCurrentMonth: false,
            days,month,monthTitle
          })
        }
      }
      this.showDates = ary;
    },
    getInitialDate(date) {
      const dateList = getDateList(date);
      let [year,month,day] = dateList;
      this.dateList = dateList;
      month = month + 1;
      this.monthTitle =  year+'年'+month+'月';
      this.month = month;
      let weekday = new Date(year,month-1,1).getDay();
      let currentMonthDays,lastMonthDays,pastDays,futureDays;
      currentMonthDays = calendar.solarDays(year,month);
      let ary1,ary2,ary3;
      pastDays = weekday - 1 + 1;
      const countDays = COLUMN * ROW;
      futureDays = countDays - pastDays - currentMonthDays;
      if(month === 1){
        lastMonthDays = calendar.solarDays(year-1,12);
        ary1 =getCurrentPageDays(calendar,pastDays,'past',year-1,12,lastMonthDays)
      }else{
        lastMonthDays = calendar.solarDays(year,month-1);
        ary1 =getCurrentPageDays(calendar,pastDays,'past',year,month-1,lastMonthDays);
      }
      ary2 = getCurrentPageDays(calendar,currentMonthDays,'today',year,month,undefined,day);
      if(month===12){
        ary3 = getCurrentPageDays(calendar,futureDays,'future',year+1,1);
      }else{
        ary3 = getCurrentPageDays(calendar,futureDays,'future',year,month+1);
      }
      return {
        days: ary1.concat(ary2,ary3),
        month,
        monthTitle: this.monthTitle
      };
    },
    selectOneDay(selectDate,index,dateIndex){
      const [year,month] = getDateList(this.defaultDate);
      const [selectYear,selectMonth] = getDateList(selectDate);
      if(selectYear === year && selectMonth === month){
        this.showDates = this.showDates.map((day,i)=>{
          if(i === dateIndex){
            day.isCurrentMonth = true;
          }else{
              day.isCurrentMonth = false;
          }
        day.days = day.days.map((item,num)=>{
            if(num === index){
              item['isSelect'] = true;
            }else{
              item['isSelect'] = false;
            }
            return item;
        })
          return day;
        })
      }else{
        this.showDates = this.showDates.map((day,i)=>{
          if(i === dateIndex){
              day.isCurrentMonth = true;
            day.days.map((item,num)=>{
                if(num === index){
                  item['isSelect'] = true;
                }else{
                  item['isSelect'] = false;
                }
                return item;
            })
          }else{
              day.isCurrentMonth = false;
            day.days.map((item,num)=>{
                item['isSelect'] = false;
                return item;
            })
          }
          return day;
      });
    }
      this.$emit('change',{...this.showDates[dateIndex]['days'][index],time:getDateList(selectDate).slice(-3) });
    },
    getSubtitle(date){
      let [year,month] = getDateList(date);
      return `${year}年${month+1}月`;
    },
    scroll(e){
      let scrollTop = e.target.scrollTop;
      let index = Math.floor(scrollTop / this.scrollHeight);
      this.showDates = this.showDates.map((date,i)=>{
        if(i === index){
          date.isCurrent = true;
        }else{
          date.isCurrent = false;
        }
        return date;
      })
      this.$nextTick(()=>{
        const { date } = this.showDates[index];
        this.subtitle = this.getSubtitle(date);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar{
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 500px;
  .calendar-header{
    color: #323233;
    .calendar-title, .calendar-subtitle{
      font-size: 16px;
      height: 44px;
      font-weight: 500;
      line-height: 44px;
      text-align: center;
    }
    .calendar-subtitle{
      font-size: 14px;
    }
    .calendar-weekdays{
      display: flex;
      .calendar-weekday{
        flex: 1;
        font-size: 12px;
        text-align: center;
        .red{
          color: #ee0a24;
        }
      }
    }
  }
  .calendar-body{
    flex: 1;
    overflow: auto;
    .calendar-month{
      position: relative;
      display: flex;
      flex-direction: column;
      .calendar-month-title{
        font-weight: 500;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
      }
      .calendar-month-watermark{
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 0;
        transform: translate(-50%,-50%);
        font-size: 160px;
        color: rgba(242, 243, 245, 0.8);
      }
      .calendar-days{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .calendar-day{
          width: 14.2857%;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          word-break: break-all;
          margin: 6px 0;
          position: relative;
          z-index: 1;
          height: 40px;
          align-items: center;
          &.select{
            color: #fff!important;
            background-color: #ee0a24;
            font-weight: bolder;
          }
          &.past,&.future{
            color: #bfbfbf
          }
        }
      }
    }
  }
}
</style>
