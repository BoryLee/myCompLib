# Radio单选框

<jc-qrcode name="radio"/>

**引入**

```vue
<script>
	import jcRadioGroup from '@/components/jc-radio/jc-radio-group.vue'
	import jcRadio from '@/components/jc-radio/jc-radio.vue'
	export default {
		components: { jcRadioGroup,jcRadio },
		data() {
			return {
				radio: '1'
			}
		}
	}
</script>
```

**代码演示**

### 基础用法

通过 v-model 绑定值当前选中项的 name

```vue
<jc-radio-group v-model='radio'>
	<jc-radio name='1'>项目一</jc-radio>
	<jc-radio name='2'>项目二</jc-radio>
</jc-radio-group>
```

### 竖直排列

将 direction 属性设置为 column 后，单选框组会变成竖直排列

```vue
<jc-radio-group v-model='radio' direction='column'>
	<jc-radio name='1'>项目一</jc-radio>
	<jc-radio name='2'>项目二</jc-radio>
</jc-radio-group>
```

### 只读状态

通过 read-only 属性禁止选项切换

```vue
<jc-radio-group v-model='radio' read-only>
	<jc-radio name='1'>项目一</jc-radio>
	<jc-radio name='2'>项目二</jc-radio>
</jc-radio-group>
```

### 禁用状态

通过 disabled 属性禁止选项切换

```vue
<jc-radio-group v-model='radio' disabled>
	<jc-radio name='1'>项目一</jc-radio>
	<jc-radio name='2'>项目二</jc-radio>
</jc-radio-group>
```

### 自定义颜色

自定义选中和未选中的颜色

```vue
<jc-radio-group v-model='radio'>
	<jc-radio name='1' checkedColor="blue" inCheckedcolor='red'>项目一</jc-radio>
	<jc-radio name='2' checkedColor="blue" inCheckedcolor='red'>项目二</jc-radio>
</jc-radio-group>
```


### jcRadioGroup属性说明

| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中项的标识符 | string | - |
| direction | 排列方向，可选值为row、column | string | row |
| disabled | 是否禁用所有单选框	 | boolean | false |
| readOnly | 是否只读 | string、number | false |

### jcRadio属性说明

| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 左侧图标名称 | string | - |
| checkedColor | 选中颜色 | string | #912222 |
| inCheckedcolor | 未选中颜色 | string | #999999 |
| iconSize | 图标大小 | string、number | 30 |
