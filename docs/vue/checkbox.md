# Checkbox复选框

<jc-qrcode name="checkbox"/>

**引入**

```vue
<script>
	import jcCheckboxGroup from '@/components/jc-checkbox/jc-checkbox-group.vue'
	import jcCheckbox from '@/components/jc-checkbox/jc-checkbox.vue'
	export default {
		components: { jcCheckboxGroup,jcCheckbox },
		data() {
			return {
				'checkbox': ['1']
			}
		}
	}
</script>
```

**代码演示**

### 基础用法

通过 v-model 绑定值当前选中项的 name

```vue
<jc-checkbox-group v-model="checkbox">
	<jc-checkbox name="1">项目一</jc-checkbox>
	<jc-checkbox name="2">项目二</jc-checkbox>
</jc-checkbox-group>
```

### 竖直排列

将 direction 属性设置为 column 后，复选框组会变成竖直排列

```vue
<jc-checkbox-group v-model='checkbox' direction='column'>
	<jc-checkbox name='1'>项目一</jc-checkbox>
	<jc-checkbox name='2'>项目二</jc-checkbox>
</jc-checkbox-group>
```

### 只读状态

通过 read-only 属性禁止选项切换

```vue
<jc-checkbox-group v-model='radio' read-only>
	<jc-checkbox name='1'>项目一</jc-checkbox>
	<jc-checkbox name='2'>项目二</jc-checkbox>
</jc-checkbox-group>
```

### 禁用状态

通过 disabled 属性禁止选项切换

```vue
<jc-checkbox-group v-model='radio' disabled>
	<jc-checkbox name='1'>项目一</jc-checkbox>
	<jc-checkbox name='2'>项目二</jc-checkbox>
</jc-checkbox-group>
```

### 自定义颜色

自定义选中和未选中的颜色

```vue
<jc-checkbox-group v-model='radio'>
	<jc-checkbox name="1" checkedColor="blue">项目一</jc-checkbox>
	<jc-checkbox name="2" checkedColor="red">项目二</jc-checkbox>
</jc-checkbox-group>
```


### jcCheckboxGroup属性说明

| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 所有选中项的标识符 | [] | - |
| direction | 排列方向，可选值为row、column | string | row |
| disabled | 是否禁用所有单选框	 | boolean | false |
| readOnly | 是否只读 | string、number | false |

### jcCheckbox属性说明

| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 左侧图标名称 | string | - |
| checkedColor | 选中颜色 | string | #912222 |
| inCheckedcolor | 未选中颜色 | string | #999999 |
| iconSize | 图标大小 | string、number | 30 |
