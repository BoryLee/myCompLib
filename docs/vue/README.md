
# 整体介绍

基于uniapp封装的一套通用的组件库

使用方式：

- 传统vue组件，需要安装、引用、注册，三个步骤后才能使用组件
  - 通过import手动引入
- easycom：只要组件安装在项目的components目录下，并符合components/组件名称/组件名称.vue目录结构。就可以不用引用、注册，直接在页面中使用
  - pages.json添加配置项easycom

  ```json
  "easycom": {
		"autoscan": true,
		"custom": {
			"^jc-(.*)": "@/components/jc-$1/jc-$1.vue"
		}
	}
  ```

<!-- ### 效果图

<jc-phone/> -->

::: tip

目前封装的组件有：
- Button 按钮
- Icon 图标
- Cell 单元格
- Radio 单选框
- Checkbox 复选框
- Switch 开关
- Input 输入框
- Picker 输入框
- Dialog 弹出层
- DateTime 时间选择器
- Popup 弹出层
- ActionSheet 动作面板
- TimeLine 时间轴

:::


