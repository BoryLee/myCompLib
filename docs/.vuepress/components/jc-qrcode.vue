<template>
<div class='qrcode'>
    <span>扫码体验</span>
    <div class='qrcode-img' ref='qrcode-img'></div>
</div>
</template>
<script>
export default{
    name: 'jc-qrcode',
    props: {
        name:{
            type: String,
            default: ''
        }
    },
    mounted(){
        if(this.name){
            import('qrcodejs2').then(QRCode=>{
                    var text = `http://115.159.215.55/ui.html#/pages/components/${this.name}/${this.name}`
                    new QRCode.default(this.$refs['qrcode-img'], {
                        text:text,
                        width: 128,
	                    height: 128,
	                    colorDark : "#000000",
	                    colorLight : "#ffffff",
	                    correctLevel : QRCode.CorrectLevel.H
                    });
            })
        }
       
    }
}
</script>
<style>
.qrcode{
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.qrcode-img{
    width: 128px;
    height: 128px;
    margin-top: 10px;
}
</style>