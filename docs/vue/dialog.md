# Dialog 弹出层

<jc-qrcode name="dialog"/>

**代码演示**

### 基础用法

```vue
<template>
    <view>
        <jc-cell-group title="基础用法">
            <jc-cell title="提示弹窗" @click="cellClick('dialog1')"></jc-cell>
	        <jc-cell title="提示弹窗(无标题)" @click="cellClick('dialog2')"></jc-cell>
	        <jc-cell title="提示弹窗(只有标题)" @click="cellClick('dialog3')"></jc-cell>
	        <jc-cell title="确认弹窗" @click="cellClick('dialog4')"></jc-cell>
        </jc-cell-group>
        <jc-dialog ref='dialog1' title="你好" content="说明当前状态、提示用户解决方案最好不要超过两行。"></jc-dialog>
        <jc-dialog ref='dialog2' content="说明当前状态、提示用户解决方案最好不要超过两行。"></jc-dialog>
        <jc-dialog ref='dialog3' showCancelButton title="你好"></jc-dialog>
        <jc-dialog ref='dialog4' showCancelButton title="你好" content="说明当前状态、提示用户解决方案最好不要超过两行。"></jc-dialog>	
    </view>
</template>
<script>
	import jcCellGroup from '@/components/jc-cell-group/jc-cell-group.vue'
	import jcCell from '@/components/jc-cell/jc-cell.vue'
	import jcDialog from '@/components/jc-dialog/jc-dialog.vue'
	export default{
		components: { jcCellGroup,jcCell,jcDialog },
		methods:{
			cellClick(name){
				this.$refs[name].open()
			}
        }
	}
</script>
```

### 异步调用

```vue
<template>
    <view>
        <jc-cell-group title="异步调用">
           <jc-cell title="提示弹窗" @click="cellClick('dialog5')"></jc-cell>
        </jc-cell-group>
       	<jc-dialog ref='dialog5' showCancelButton title="你好" content="说明当前状态、提示用户解决方案最好不要超过两行。" :before-confirm='beforeConfirm' :before-cancel='beforeCancel'></jc-dialog>
    </view>
</template>
<script>
	import jcCellGroup from '@/components/jc-cell-group/jc-cell-group.vue'
	import jcCell from '@/components/jc-cell/jc-cell.vue'
	import jcDialog from '@/components/jc-dialog/jc-dialog.vue'
	export default{
		components: { jcCellGroup,jcCell,jcDialog },
		methods:{
			cellClick(name){
				this.$refs[name].open()
			},
			beforeCancel(action,done){
				if(action==='cancel'){
					setTimeout(()=>{
						done()
					},1000)
				}
			},
			beforeConfirm(action,done){
				if(action==='confirm'){
					setTimeout(()=>{
						done()
					},1000)
				}
			}
        }
	}
</script>
```

### 带图标

通过icon或者icon插槽自定义图标

```vue
<jc-dialog ref='dialog6'  icon='astro-l'  showCancelButton title="你好" content="说明当前状态、提示用户解决方案最好不要超过两行。" />
<jc-dialog ref='dialog7' showCancelButton title="你好" content="说明当前状态、提示用户解决方案最好不要超过两行。">
	<template #icon>
		<image src="/static/logo.png" mode="" class="dialog-icon"></image>
	</template>
</jc-dialog>
```

### 自定义内容

通过coontent插槽自定义内容

```vue
<jc-dialog ref='dialog8' showCancelButton title="你好">
	<template #content>
		<view class="dialog-custom">
			<text class="dialog-custom-title">内容标题</text>
			<text class="dialog-custom-content">说明当前状态、提示用户解决方案最好不要超过两行。说明当前状态、提示用户解决方案最好不要超过两行。说明当前状态、提示用户解决方案最好不要超过两行。说明当前状态、提示用户解决方案最好不要超过两行。说明当前状态、提示用户解决方案最好不要超过两行。说明当前状态、提示用户解决方案最好不要超过两行。</text>
		</view>
	</template>
</jc-dialog>
```
### jcDialog属性说明

| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标名 | string | - |
| width | 弹窗宽度,单位rpx | string | ‘560rpx’ |
| borderRadius | 圆角大小,单位rpx | string | ‘16rpx’ |
| title | 标题 | string | - |
| content | 文本内容 | string | - |
| showConfirmButton | 是否展示确认按钮 | boolean | true |
| showCancelButton | 是否展示取消按钮 | boolean | false |
| confirmButtonText | 确认按钮文案 | string| 确认 |
| confirmButtonColor | 确认按钮颜色 | string | #912222 |
| cancelButtonText | 取消按钮文案 | string | 取消 |
| cancelButtonColor | 取消按钮颜色 | string | #333333 |
| overlay | 是否展示遮罩层 | boolean | true |
| beforeConfirm | 关闭前的回调函数，调用 done() 后关闭弹窗 | function | (action, done) => void |
| beforeCancel | 取消前的回调函数，调用 done() 后关闭弹窗| function | (action, done) => void |