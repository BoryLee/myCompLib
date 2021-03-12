# Popup 弹出层

<jc-qrcode name="popup"/>

**代码演示**

### 基础用法

```vue
<template>
    <view>
        <jc-cell-group title="基础用法">
	    <jc-cell title="展示弹出层" isLink @click="cellClick('popup')"></jc-cell>
        </jc-cell-group>
        <jc-popup ref='popup'>内容</jc-popup>
    </view>
</template>
<script>
	import jcCellGroup from '@/components/jc-cell-group/jc-cell-group.vue'
	import jcCell from '@/components/jc-cell/jc-cell.vue'
	import jcPopup from '@/components/jc-popup/jc-popup.vue'
	export default{
		components: { jcCellGroup,jcCell,jcPopup },
		methods:{
			cellClick(name){
				this.$refs[name].open()
			}
		}
	}
</script>
```

### 弹出位置

```vue
<template>
    <view>
        <jc-cell-group title="弹出位置">
			<jc-cell title="顶部弹出" isLink @click="cellClick('popup1')"></jc-cell>
			<jc-cell title="底部弹出" isLink @click="cellClick('popup2')"></jc-cell>
			<jc-cell title="左部弹出" isLink @click="cellClick('popup3')"></jc-cell>
			<jc-cell title="右部弹出" isLink @click="cellClick('popup4')"></jc-cell>
		</jc-cell-group>
        <jc-popup ref='popup1' position="top"></jc-popup>
		<jc-popup ref='popup2' position="bottom" :style="{width:'50%'}"></jc-popup>
		<jc-popup ref='popup3' position="left"></jc-popup>
		<jc-popup ref='popup4' position="right"></jc-popup>
    </view>
</template>
```

### 圆角弹窗

```vue
<template>
    <view>
       <jc-cell-group title="圆角弹窗">
			<jc-cell title="圆角弹窗" isLink @click="cellClick('popup5')"></jc-cell>
		</jc-cell-group>
        <jc-popup ref='popup5' round position="bottom"></jc-popup>
    </view>
</template>
```

### jcPopup属性说明
| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 弹出位置，可选值为 top、bottom、right、left | string | center |
| round | 是否显示圆角 | boolean | false |
| size |top、bottom时高度大小，right、left时宽度大小 | string | 40% |