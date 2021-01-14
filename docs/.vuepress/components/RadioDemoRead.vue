<template>
  <div class="radio-demo">
   <div class='radio-cell'>
     <span>单选：</span>
     <radio v-model='defalutValue' label='a'>radio</radio>
   </div>
    <div class='radio-cell'>
      <span>禁止：</span>
      <radio v-model='defalutValue1' label='a' disabled>radio</radio>
   </div>
    <div class='radio-cell'>
      <span>分组：</span>
      <radio-group v-model='groupValue2'>
        <radio label="a">备选项1</radio>
        <radio label="b">备选项2</radio>
      </radio-group>
   </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      defalutValue: 'test',
      defalutValue1: 'a',
      groupValue2: 'test',
    };
  },
};
</script>

<style scope>
.radio-demo {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.radio-cell{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}
</style>
