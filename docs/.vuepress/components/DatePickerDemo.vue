<template>
    <div>
      <div class='app'>
        <div @click='openDatePicker' class="time">{{time}}</div>
        <date-picker
                ref='date-picker'
                :isLunar='isLunar'
                :currentTime='currentTime'
                @change='datePickerChange'
                @changecalendar='changeCalendar'></date-picker>
        </div>
    </div>
</template>
<script>
export default {
  name: 'App',
  data(){
    return {
      time: '请选择日期',
      lunarTime: '',
      currentTime: '2020-07-03 11:30:30',
      isLunar: false
    }
  },
  methods: {
    openDatePicker(){
      this.$refs['date-picker'].show();
    },
    datePickerChange(value){
      console.log('datePickerChange',value)
      const {date,time,chinaTime,gzYear,IMonthCn,IDayCn,lYear} = value;
      const dateTime = `${date} ${time}`;
      this.currentTime = dateTime;
      if(this.isLunar){
      	if(this.isShowChinaTime){
      		this.time = `${lYear}年${IMonthCn}${IDayCn} ${chinaTime}`;
      	}else{
      		this.time = `${lYear}年${IMonthCn}${IDayCn} ${time}`;
      	}

      }else{
      	this.time = dateTime;
      }
    },
    changeCalendar(value){
      this.isLunar = value;
    }
  }
}
</script>
<style lang="scss" scoped>
  .app{
    display: flex;
    justify-content: center;
  }
</style>
