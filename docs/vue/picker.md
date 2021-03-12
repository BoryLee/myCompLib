# Picker 输入框

<jc-qrcode name="picker"/>

**代码演示**

### 基础用法

通过 columns 属性配置选项数据，columns 是一个包含字符串或对象的数组

```vue
<template>
  <view>
    <jc-cell-group title="基础用法">
      <jc-cell
        title="选择器"
        isLink
        @click="openPicker('picker1')"
        :value="content1"
      ></jc-cell>
    </jc-cell-group>
    <jc-picker
      ref="picker1"
      mode="selector"
      :columns="columns1"
      :defaultIndex="defaultIndex"
      @change="onChange1"
    />
  </view>
</template>
<script>
import jcCellGroup from "@/components/jc-cell-group/jc-cell-group.vue";
import jcCell from "@/components/jc-cell/jc-cell.vue";
import jcPicker from "@/components/jc-picker/jc-picker.vue";
export default {
  components: {
    jcCellGroup,
    jcCell,
    jcPicker,
  },
  data() {
    return {
      columns1: ["北京", "上海", "广州", "深圳", "郑州", "武汉", "成都"],
      defaultIndex: 2,
    };
  },
  methods: {
    openPicker(name) {
      this.$refs[name].open();
    },
    onChange1(values, columns, index) {
      if (!isNaN(index)) {
        this.defaultIndex = index;
      }
      this.content1 = values.join("/");
    },
  },
};
</script>
```

### 默认选中项

mode 设置为 selector 时是单列选择器，可以通过 default-index 属性设置初始选中项的索引

```vue
<jc-picker mode="selector" :columns="columns1" :defaultIndex="2" />
```

### 多列选择

mode 置为 multiSelector 时是多列选择器，columns 属性可以通过对象数组的形式配置多列选择

```vue
<template>
  <view>
    <jc-picker mode="multiSelector" :columns="columns2"></jc-picker>
  </view>
</template>
<script>
export default{
data() {
    return {
        columns2: [{
		values: ['周一', '周二', '周三', '周四', '周五'],
		defaultIndex: 2,
	},
	{
		values: ['上午', '下午', '晚上'],
		defaultIndex: 1,
	}
],
    }
}
</script>
```

### 级联选择

mode 置为 multiSelector 时是多列选择器，使用 columns 的 children 字段可以实现选项级联的效果

```vue
<template>
  <view>
    <jc-picker mode="multiSelector" :columns="columns3" :value='value'></jc-picker>
  </view>
</template>
<script>
 export default{
 data() {
     return {
        value: ['浙江', '金华', '义乌市'],
        columns3: [{
			text: '浙江',
			children: [{
					text: '杭州',
					children: [{
						text: '西湖区'
					}, {
						text: '余杭区'
					}],
				},
				{
					text: '温州',
					children: [{
						text: '鹿城区'
					}, {
						text: '瓯海区'
					}],
				},
				{
					text: '金华',
					children: [{
						text: '金东区'
					}, {
						text: '武义县'
					}, {
						text: '义乌市'
					}]
				}
			],
		},
		{
			text: '福建',
			children: [{
					text: '福州',
					children: [{
						text: '鼓楼区'
					}, {
						text: '台江区'
					}],
				},
				{
					text: '厦门',
					children: [{
						text: '思明区'
					}, {
						text: '海沧区'
					}],
				},
			],
		},
	],

     }
 }
</script>
```

### 属性说明

| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 选择器类型 可选 selector、multiSelector| string | 'selector' |
| confirmButtonText | 确定按钮文字| string | '确定' |
| confirmButtonColor | 确定按钮文字颜色| string | '#912222' |
| cancelButtonText | 取消按钮文字| string | '取消' |
| cancelButtonColor | 取消按钮文字颜色| string | '#333333' |
| title | 标题文字| string | '标题' |
| showToolbar | 是否显示顶部栏 | boolean | true |
| columns | 对象数组，配置每一列显示的数据 | array | [] |
| keyValue | 选项对象中，选项文字对应的键名 | string | 'text' |
| defaultIndex | 单列选择时，默认选中项的索引 | string、number | 0 |
