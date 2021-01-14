<template>
  <div class="calendar-demo">
    <div v-if='selectData' class="select-date">
      <span>{{selectData.date}}</span>
      <span>{{selectData.chinaWeekDay}}</span>
      <span>{{selectData.animal}}年</span>
      <span>{{selectData.lunarYear}}年{{selectData.gzMonth}}月{{selectData.gzDay}}日</span>
      <span>{{selectData.lunarlYear}}年{{selectData.lunarMonth}}{{selectData.lunarDay}}</span>
    </div>
    <Calendar show-mark :defaultDate='currentDate' :show-lunar='true' :active-class='activeClass' @change='selectDate'></Calendar>
  </div>
</template>

<script>
import Calendar from './calendar/Calendar.vue'
export default {
  name: 'App',
  components: {
    Calendar
  },
  data() {
    return {
      currentDate: new Date(),
      activeClass: 'test',
      selectData: null
    }
  },
  methods: {
    selectDate(date){
      this.selectData = date;
    }
  }
}
</script>

<style>
.calendar-demo {
  margin-top: 20px;
}
.select-date{
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.test{
  background-color: #fb0;
  color: #fff!important;
  font-weight: 500;
}
</style>
