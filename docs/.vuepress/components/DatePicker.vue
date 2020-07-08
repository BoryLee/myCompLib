<template>
  <div>
    <transition name='fade'>
    <div class='date-picker' v-if='visible'>
      <div class='mask'></div>
      <div class='panel' v-clickoutside='handleClickOut'>
        <div class='date-picker-header' :style="{backgroundColor: headerBgColor}">
          <div class='txt solar' :style="{color: (isLunar ?  defaultColor : activeColor)}" @click.stop="changeCalendar(0)">{{solarText}}</div>
          <div class='txt lunar' :style="{color: (!isLunar ?  defaultColor : activeColor)}" @click.stop="changeCalendar(1)">{{lunarText}}</div>
          <div class='txt confirm' :style="{color: confirmColor}" @click.stop='confirmEvent'>{{confirmText}}</div>
        </div>
        <div class='date-picker-body'>
          <picker :listData='item' @chooseItem='chooseItem' v-for='(item,index) in [yearData,monthData,dayData,hours,minutes,seconds]'
            :key='index' :keyIndex='index' :defaultValue='defaultValueData[index]'></picker>
        </div>
      </div>
    </div>
  </transition>
  </div>
</template>
<script>
  import Picker from './picker/src/picker.vue';
  import clickoutside from './directives/clickoutside.js'
  import {
    calendar
  } from './libs/calendar.js';
  import {
    getYears,
    getMonths,
    getDays,
    getHours,
    getMinutes,
    getSeconds,
    getDateTime,
    formateTime,
    addZero,
    createArray,
    getDateStringTime,
    chinaHours,
    getChinaTime
  } from './utils/util.js'
  export default {
    name: 'DatePicker',
    components: {
      Picker
    },
    props: {
      level: {
        type: String,
        default: '5'
      },
      isShowLunar: {
        type: Boolean,
        default: false
      },
      isShowChinaTime: {
        type: Boolean,
        default: false
      },
      currentTime: {
        type: String,
        default: ''
      },
      startYear: {
        type: Number,
        default: 1900
      },
      endYear: {
        type: Number,
        default: 2100
      },
      isLunar: {
        type: Boolean,
        default: false
      },
      headerBgColor: {
        type: String,
        default: '#fff'
      },
      solarText: {
        type: String,
        default: '阳历'
      },
      lunarText: {
        type: String,
        default: '阴历'
      },
      activeColor: {
        type: String,
        default: '#39f'
      },
      defaultColor: {
        type: String,
        default: '#828282'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      confirmColor: {
        type: String,
        default: '#39f'
      }
    },
    computed: {
      yearData() {
        return this.isLunar ? this.ganZhiYears : this.years;
      },
      monthData() {
        return this.isLunar ? this.ganZhiMonths : this.months;
      },
      dayData() {
        return this.isLunar ? this.ganZhiDays : this.days;
      }
    },
    watch: {
      currentTime: {
        handler(value) {
          if (value.length) {
            this.years = getYears(this.startYear, this.endYear);
            this.months = getMonths();
            this.hours = getHours();
            this.minutes = getMinutes();
            this.seconds = getSeconds();
            let ary = value.split(' ');
            const selectTime = ary[1];
            const timeArray = selectTime.split(':');
            const dateArray = ary[0].split('-');
            this.days = getDays(dateArray[0], dateArray[1]);
            this.defaultValueData = dateArray.concat(timeArray);
            this.$nextTick(() => {
              this.selectYear = dateArray[0];
              this.selectMonth = dateArray[1];
              this.selectDay = dateArray[2];
              const names = ['year', 'month', 'day', 'hour', 'minute', 'second', 'china'];
              let multiIndex = [];
              names.forEach((name, i) => {
                if (name == 'china') {
                  multiIndex.push(0);
                } else {
                  const index = this[name + 's'].findIndex(item => item == this.defaultValueData[i]);
                  multiIndex.push(index);
                }
                this.multiIndex = multiIndex;
              })
              if (this.isLunar) {
                if (this.isShowChinaTime) {
                  const time =
                    `${this.hours[this.multiIndex[3]]}:${this.minutes[this.multiIndex[4]]}:${this.seconds[this.multiIndex[5]]}`;
                  const {
                    name
                  } = getChinaTime(time);
                  const index = this.chinaHours.findIndex(item => item.name == name);
                  this.multiIndex.splice(this.multiIndex.length - 1, 1, index)
                }
                this.getLunarDate()
              }
            })
          }
        },
        immediate: true
      }
    },
    directives: {
      clickoutside: clickoutside
    },
    data() {
      return {
        multiIndex: [],
        defaultValueData: [],
        visible: false,
        selectYear: '',
        selectMonth: '',
        selectDay: '',
        selectTime: '',
        years: [],
        months: [],
        days: [],
        hours: [],
        minutes: [],
        seconds: [],
        ganZhiYears: [],
        ganZhiMonths: [],
        ganZhiDays: [],
      }
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      handleClickOut(e) {
        if (e.target.className === 'mask') {
          this.hide()
        }
      },
      chooseItem(...value) {
        const [val, scrollIndex, index] = value;
        this.multiIndex.splice(index, 1, scrollIndex);
        const names = ['Year', 'Month', 'Day'];
        if (!this.isLunar) {
          if (index == 1) {
            this.selectMonth = val;
            this.days = getDays(this.selectYear, this.selectMonth);
            if (this.multiIndex[index + 1] + 1 > this.days.length) {
              this.multiIndex.splice(index + 1, 1, this.days.length - 1);
              this.selectDay = addZero(this.days.length);
              this.defaultValueData.splice(index + 1, 1, this.selectDay + '')
            }
          } else if (index == 0) {
            this.selectYear = val;
          } else {
            this['select' + names[index]] = val;
          }
          this.selectTime =
            `${addZero(this.multiIndex[3])}:${addZero(this.multiIndex[4])}:${addZero(this.multiIndex[5])}`;
          this.$nextTick(() => {
            this.selectDate = `${this.selectYear}-${this.selectMonth}-${this.selectDay} ${this.selectTime}`;
          })
        } else {
          if (index == 0) {
            this.defaultValueData.splice(index, 1, this.ganZhiYears[this.multiIndex[index]])
            this.selectYear = Number(this.ganZhiYears[this.multiIndex[0]].slice(0, 4));
            const leapMonth = calendar.leapMonth(this.selectYear);
            this.ganZhiMonths = this.months.map(month => calendar.toChinaMonth(month));
            let monthCount, monthIndex;
            if (leapMonth > 0) { //所选的年有闰年
              this.ganZhiMonths.splice(leapMonth, 0, `闰${calendar.toChinaMonth(leapMonth)}`);
            }
            if (this.multiIndex[1] + 1 > this.ganZhiMonths.length) {
              this.multiIndex.splice(1, 1, this.ganZhiMonths.length - 1);
              this.defaultValueData.splice(index + 1, 1, this.monthData[this.ganZhiMonths.length - 1])
            }
            const month = this.ganZhiMonths[this.multiIndex[1]];
            monthIndex = this.ganZhiMonths.findIndex(item => item == month);
            if (leapMonth > 0) {
              if (monthIndex == leapMonth) {
                this.selectMonth = monthIndex;
                this.isLeap = true;
                monthCount = calendar.leapDays(this.selectYear);
              } else {
                if (monthIndex > leapMonth) {
                  this.selectMonth = monthIndex
                } else {
                  this.selectMonth = monthIndex + 1;
                }
                this.isLeap = false;
                monthCount = calendar.monthDays(this.selectYear, this.selectMonth)
              }
            } else {
              this.selectMonth = monthIndex + 1;
              this.isLeap = false;
              monthCount = calendar.monthDays(this.selectYear, this.selectMonth)
            }
            const ganZhiDays = [];
            for (let i = 1; i <= monthCount; i++) {
              ganZhiDays.push(calendar.toChinaDay(i));
            }
            this.ganZhiDays = ganZhiDays;
            if (this.multiIndex[2] + 1 > this.ganZhiDays.length) {
              this.multiIndex.splice(2, 1, this.ganZhiDays.length - 1);
              this.defaultValueData.splice(2, 1, this.dayData[this.ganZhiDays.length - 1])
            }
          } else if (index == 1) {
            this.defaultValueData.splice(index, 1, this.ganZhiMonths[this.multiIndex[index]])
            const leapMonth = calendar.leapMonth(this.selectYear);
            let monthCount, monthIndex;
            const month = this.ganZhiMonths[this.multiIndex[1]];
            monthIndex = this.ganZhiMonths.findIndex(item => item == month);
            if (leapMonth > 0) {
              if (monthIndex == leapMonth) {
                this.selectMonth = monthIndex;
                this.isLeap = true;
                monthCount = calendar.leapDays(this.selectYear);
              } else {
                if (monthIndex > leapMonth) {
                  this.selectMonth = monthIndex
                } else {
                  this.selectMonth = monthIndex + 1;
                }
                this.isLeap = false;
                monthCount = calendar.monthDays(this.selectYear, this.selectMonth)
              }
            } else {
              this.selectMonth = monthIndex + 1;
              this.isLeap = false;
              monthCount = calendar.monthDays(this.selectYear, this.selectMonth)
            }
            const ganZhiDays = [];
            for (let i = 1; i <= monthCount; i++) {
              ganZhiDays.push(calendar.toChinaDay(i));
            }
            this.ganZhiDays = ganZhiDays;
            if (this.multiIndex[2] + 1 > this.ganZhiDays.length) {
              this.multiIndex.splice(2, 1, this.ganZhiDays.length - 1);
              this.selectDay = this.multiIndex[2] + 1;
              this.defaultValueData.splice(2, 1, this.ganZhiDays[this.ganZhiDays.length - 1])
            }
          } else if (index == 2) {
            this.defaultValueData.splice(index, 1, this.ganZhiDays[this.multiIndex[index]])
            this.selectDay = this.multiIndex[2] + 1;
          } else if (index == 6) {
            const {
              startTime
            } = this.chinaHours[scrollIndex];
            this.selectTime = startTime;
          }
        }
      },
      getLunarDate() {
        const lunarData = calendar.solar2lunar(this.selectYear, this.selectMonth, this.selectDay);
        const {
          lYear,
          lMonth,
          lDay,
          isLeap,
          IMonthCn,
          IDayCn
        } = lunarData;
        this.selectYear = lYear;
        this.selectMonth = lMonth;
        this.selectDay = lDay;
        this.isLeap = isLeap;
        this.ganZhiYears = this.years.map(year => `${year}${calendar.getGanZhiYear(year)}`);
        const yearIndex = this.ganZhiYears.findIndex(item => item.indexOf(lYear) > -1);
        this.multiIndex.splice(0, 1, yearIndex);
        const leapMonth = calendar.leapMonth(lYear);
        this.ganZhiMonths = this.months.map(month => calendar.toChinaMonth(month));
        let monthCount;
        if (leapMonth > 0) { //所选的年有闰年
          this.ganZhiMonths.splice(leapMonth, 0, `闰${calendar.toChinaMonth(leapMonth)}`);
        } else {
          monthCount = calendar.monthDays(lYear, lMonth)
        }
        const monthIndex = this.ganZhiMonths.findIndex(item => item == IMonthCn);
        this.multiIndex.splice(1, 1, monthIndex);
        if (leapMonth > 0) {
          if (leapMonth == monthIndex) {
            monthCount = calendar.leapDays(lYear);
          } else {
            monthCount = calendar.monthDays(this.selectYear, this.selectMonth)
          }
        }
        const ganZhiDays = [];
        for (let i = 1; i <= monthCount; i++) {
          ganZhiDays.push(calendar.toChinaDay(i));
        }
        this.ganZhiDays = ganZhiDays;
        const dayIndex = this.ganZhiDays.findIndex(item => item == IDayCn);
        this.multiIndex.splice(2, 1, dayIndex);
        this.$nextTick(() => {
          const names = ['yearData', 'monthData', 'dayData', 'hours', 'minutes', 'seconds'];
          this.multiIndex.forEach((item, index) => {
            if (this[names[index]]) {
              this.defaultValueData.splice(index, 1, this[names[index]][item] + '')
            }
          })
        })
        if (this.isShowChinaTime) {
          const time =
            `${this.hours[this.multiIndex[3]]}:${this.minutes[this.multiIndex[4]]}:${this.seconds[this.multiIndex[5]]}`;
          const {
            name
          } = getChinaTime(time);

          const index = this.chinaHours.findIndex(item => item.name == name);
          this.multiIndex.splice(this.multiIndex.length - 1, 1, index)
        }

      },
      getSolarDate() {
        const solarData = calendar.lunar2solar(this.selectYear, this.selectMonth, this.selectDay, this.isLeap);
        const {
          cYear,
          cMonth,
          cDay,
          lYear,
          lMonth,
          lDay,
          isLeap,
          IMonthCn,
          IDayCn
        } = solarData;
        this.selectYear = cYear;
        this.selectMonth = cMonth;
        this.selectDay = cDay;
        this.isLeap = isLeap;
        const yearIndex = this.years.findIndex(item => item == cYear);
        const monthIndex = this.months.findIndex(item => item == cMonth);
        const dayIndex = this.days.findIndex(item => item == cDay);
        this.multiIndex.splice(0, 1, yearIndex);
        this.multiIndex.splice(1, 1, monthIndex);
        this.multiIndex.splice(2, 1, dayIndex);
        this.$nextTick(() => {
          const names = ['yearData', 'monthData', 'dayData', 'hours', 'minutes', 'seconds'];
          this.multiIndex.forEach((item, index) => {
            if (this[names[index]]) {
              this.defaultValueData.splice(index, 1, this[names[index]][item] + '')
            }

          })
        })
      },
      changeCalendar(index) {
        if (index == 0) { //阳历
          if (!this.isLunar) return;
          this.$emit('changecalendar', false);
          this.getSolarDate();
        } else if (index == 1) { //阴历
          if (this.isLunar) return;
          this.$emit('changecalendar', true);
          this.getLunarDate()
        }
      },
      confirmEvent() {
        let selectDate;
        if (this.isLunar) {
          selectDate = calendar.lunar2solar(this.selectYear, this.selectMonth, this.selectDay, this.isLeap);
        } else {
          selectDate = calendar.solar2lunar(this.selectYear, this.selectMonth, this.selectDay);
        }
        selectDate['date'] = getDateStringTime(selectDate['date']);
        selectDate['lunarDate'] = getDateStringTime(selectDate['lunarDate']);
        let time;
        if (this.isShowChinaTime) {
          const {
            startTime,
            name
          } = this.chinaHours[this.multiIndex[6]];
          selectDate['chinaTime'] = name;
          time = startTime;
        } else {
          time =
            `${this.hours[this.multiIndex[3]]}:${this.minutes[this.multiIndex[4]]}:${this.seconds[this.multiIndex[5]]}`;
          selectDate['chinaTime'] = getChinaTime(time) && getChinaTime(time)['name'];
        }
        this.hide();
        this.$emit('change', { ...selectDate,
          time
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
 .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter,
  .fade-leave-to
    {
    opacity: 0;
  }

  .date-picker {
    .mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, .5);
      z-index: 99998;
    }

    .panel {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      max-height: 80%;
      overflow: auto;
      z-index: 100001;
      background-color: #fff;

      .date-picker-header {
        width: 100%;
        display: flex;
        align-items: center;
        height: 40px;
        border-bottom: 1px solid #f6f6f6;

        .txt {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &:nth-child(1) {
            margin-left: 30px;
            text-align: left;
          }

          &:nth-child(2) {
            text-align: center;
            max-width: 50%;
            font-weight: 500;
            font-size: 16px;

          }

          &:nth-child(3) {
            margin-right: 30px;
            text-align: right;
          }
        }
      }

      .date-picker-body {
        height: 252px;
        display: flex;
      }
    }

  }
</style>
