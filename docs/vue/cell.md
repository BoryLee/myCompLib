# Cell单元格

<jc-qrcode name="cell"/>

**引入**

```vue
<script>
import jcCellGroup from '@/components/jc-cell-group/jc-cell-group.vue';
import jcCell from '@/components/jc-cell/jc-cell.vue';
export default{
	components: { jcCellGroup,jcCell },
}
</script>
```
**代码演示**

### 基础用法
jcCell 可以单独使用，也可以与 jcCellGroup 搭配使用

```vue
<jc-cell-group title="基础用法">
    <jc-cell title="单元格" value="内容"></jc-cell>
	<jc-cell title="单元格" description="描述" value="内容"></jc-cell>
</jc-cell-group>
```


### 展示图标

通过icon属性在标题左侧展示图标,也可以通过slo自定义图片

```vue
<jc-cell-group title="展示图标">
	<jc-cell title="单元格" icon="time-location-l" value="内容"></jc-cell>
    <jc-cell title="自定义图标" value="内容">
		<template #icon>
			<image src="/static/logo.png" mode="" class="icon-img"></image>
		</template>
	</jc-cell>
</jc-cell-group>
```


### 展示箭头

设置 is-link 属性后会在单元格右侧显示箭头

```vue
<jc-cell-group title="展示箭头">
	<jc-cell title="单元格" isLink></jc-cell>
	<jc-cell title="单元格" value="内容" isLink></jc-cell>
</jc-cell-group>
```

### 页面导航

可以通过to属性进行路由跳转

```vue
<jc-cell-group title="页面导航">
    <jc-cell title="单元格" isLink to='/pages/index/index'></jc-cell>
	<jc-cell title="单元格" value="内容" isLink to='/pages/index/index'></jc-cell>
</jc-cell-group>
```

### 展示徽标

可以通过dot属性是否显示徽标，dotColor设置徽标的背景色，badge设置徽标的数量

```vue
<jc-cell-group title="展示徽标">
	<jc-cell title="单元格" dot isLink dotColor='red'></jc-cell>
	<jc-cell title="自定义颜色" dot isLink dotColor='blue'></jc-cell>
	<jc-cell title="单元格" dot isLink dotColor='red' value="详细描述"></jc-cell>
	<jc-cell title="单元格" dot isLink badge="100" dotColor='red'></jc-cell>
</jc-cell-group>
```

### slot自定义

可以通过dot属性是否显示徽标，dotColor设置徽标的背景色，badge设置徽标的数量

```vue
<jc-cell-group title="slot自定义">
	<jc-cell>
		<template #left>
			<view>左边内容</view>
		</template>
		<template #right>
			<view>右边内容</view>
		</template>
	</jc-cell>
	<jc-cell isLink>
		<template #left>
			<view>左边内容</view>
		</template>
		<template #right>
			<view>右边内容</view>
		</template>
	</jc-cell>
</jc-cell-group>
```


### jcCellGroup属性说明

| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 分组标题 | string | - |
| border-radius | 圆角大小,单位px | string、number | 4 |

### jcCell属性说明

| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 左侧图标名称 | string | - |
| title | 左侧标题 | string | - |
| description | 左侧标题下方的描述信息 | string | - |
| value | 右侧内容 | string | - |
| size | 图标大小 | string、number | 20 |
| to | 路由地址 | string | - |
| replace | 是否在跳转时替换当前页面历史 | boolean | false |
| border | 是否显示内边框 | boolean | true |
| isLink | 是否展示右侧箭头 | boolean | false |
| dot | 是否显示徽标 | boolean | false |
| dotColor | 徽标颜色 | string | red |
| dotColor | 徽标位置，left，right | string | left |
| badge | 徽标数量 | string、number | - |
