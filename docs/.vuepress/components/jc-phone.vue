<template>
  <div class="phone">
    <iframe class="demo-page" src="http://115.159.215.55/ui.html"></iframe>
  </div>
</template>
<script>
export default {
    name: 'jc-phone'
}
</script>
<style>
.phone {
  margin: 20px 20px 0;
  background-image: url("/phone.png");
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100%;
  padding: 100px 16px;
  box-sizing: border-box;
  width: 365px;
}

.demo-page {
  width: 100%;
  height: 580px;
  background-color: #fff;
}
</style>