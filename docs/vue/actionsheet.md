# ActionSheet 动作面板

<jc-qrcode name="actionsheet"/>

**代码演示**

### 基础用法

动作面板通过 actions 属性来定义选项，actions 属性是一个由对象构成的数组，数组中的每个对象配置一列

```vue
<template>
	<view>
		<jc-cell-group title="基础用法">
			<jc-cell isLink title="基础用法" @click="cellClick('actionsheet1')"></jc-cell>
		</jc-cell-group>
	    <jc-action-sheet ref='actionsheet1' :actions='actions1' @select='onSelect'></jc-action-sheet>
	</view>
</template>
<script>
	import jcCellGroup from '@/components/jc-cell-group/jc-cell-group.vue'
	import jcCell from '@/components/jc-cell/jc-cell.vue'
	import jcActionSheet from '@/components/jc-action-sheet/jc-action-sheet.vue'
	export default {
		components: {
			jcCellGroup,
			jcCell,
			jcActionSheet
		},
		data() {
			return {
				actions1: [{
						name: '选项一',
					},
					{
						name: '选项二',
					},
					{
						name: '选项三',
					},
				]
			}
		},
		methods: {
			cellClick(name) {
				this.$refs[name].open()
			},
			onSelect(action, index) {
				uni.showToast({
					title: action.name,
					icon: 'none'
				})
			}
		}
	}
</script>
```

### 展示取消按钮

设置 cancel-text 属性后，会在底部展示取消按钮，点击后关闭当前面板并触发 cancel 事件

```vue
<template>
	<view>
		<jc-cell-group title="基础用法">
			<jc-cell isLink title="展示取消" @click="cellClick('actionsheet2')"></jc-cell>
			<jc-cell isLink title="展示标题" @click="cellClick('actionsheet3')"></jc-cell>
			<jc-cell isLink title="展示描述" @click="cellClick('actionsheet4')"></jc-cell>
		</jc-cell-group>
		<jc-action-sheet ref='actionsheet2' :actions='actions' cancel-text="取消" @select='onSelect' @cancel='onCancel'></jc-action-sheet>
		<jc-action-sheet ref='actionsheet3' title="标题" subtitle="这是标题描述" :actions='actions1' cancel-text="取消" @select='onSelect' @cancel='onCancel'></jc-action-sheet>
		<jc-action-sheet ref='actionsheet4' title="标题" subtitle="这是标题描述" :actions='actions2' cancel-text="取消" @select='onSelect' @cancel='onCancel'></jc-action-sheet>
	</view>
</template>
<script>
	import jcCellGroup from '@/components/jc-cell-group/jc-cell-group.vue'
	import jcCell from '@/components/jc-cell/jc-cell.vue'
	import jcActionSheet from '@/components/jc-action-sheet/jc-action-sheet.vue'
	export default {
		components: {
			jcCellGroup,
			jcCell,
			jcActionSheet
		},
		data() {
			return {
				actions: [{
						name: '选项一',
					},
					{
						name: '选项二',
					},
					{
						name: '选项三',
					},
				],
				actions2: [{
						name: '选项一',
						subname: '这是选项一的描述'
					},
					{
						name: '选项二',
					},
					{
						name: '选项三',
					},
				],
			}
		},
		methods: {
			cellClick(name) {
				this.$refs[name].open()
			},
			onCancel(name) {
				uni.showToast({
					title: name,
					icon: 'none'
				})
			},
			onSelect(action, index) {
				uni.showToast({
					title: action.name,
					icon: 'none'
				})
			}
		}
	}
</script>
```


### 展示描述信息

通过 subtitle 可以在菜单顶部显示描述信息，通过选项的 subname 属性可以在选项文字的下面展示描述信息。

```vue
<template>
	<view>
		<jc-cell-group title="基础用法">
			<jc-cell isLink title="展示描述" @click="cellClick('actionsheet4')"></jc-cell>
		</jc-cell-group>
		<jc-action-sheet ref='actionsheet4' title="标题" subtitle="这是标题描述" :actions='actions' cancel-text="取消" @select='onSelect' @cancel='onCancel'></jc-action-sheet>
	</view>
</template>
<script>
	import jcCellGroup from '@/components/jc-cell-group/jc-cell-group.vue'
	import jcCell from '@/components/jc-cell/jc-cell.vue'
	import jcActionSheet from '@/components/jc-action-sheet/jc-action-sheet.vue'
	export default {
		components: {
			jcCellGroup,
			jcCell,
			jcActionSheet
		},
		data() {
			return {
				actions2: [{
						name: '选项一',
						subname: '这是选项一的描述'
					},
					{
						name: '选项二',
					},
					{
						name: '选项三',
					},
				],
			}
		},
		methods: {
			cellClick(name) {
				this.$refs[name].open()
			},
			onCancel(name) {
				uni.showToast({
					title: name,
					icon: 'none'
				})
			},
			onSelect(action, index) {
				uni.showToast({
					title: action.name,
					icon: 'none'
				})
			}
		}
	}
</script>
```

### 自定义面板

通过插槽可以自定义面板的展示内容

```vue
<template>
	<view>
		<jc-cell-group title="自定义面板">
			<jc-cell isLink title="自定义面板" @click="cellClick('actionsheet5')"></jc-cell>
		</jc-cell-group>
		<jc-action-sheet ref='actionsheet5'>
				<view class="content">内容</view>
		</jc-action-sheet>
	</view>
</template>
```

### jcActionSheet属性说明
| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| actions | 面板选项列表 | array | [] |
| cancelText | 取消按钮文字 | string | - |
| title | 顶部标题 | string | - |
| subtitle | 选项上方的描述信息 | string | - |

### 事件

| 事件名 | 说明 | 回调参数 | 
| --- | --- | --- |
| select | 点击选项时触发| action: Action, index: number | 