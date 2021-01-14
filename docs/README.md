---
home: true
heroImage: /vue.png
heroText:  JCMobileUI组件库
tagline: 宝剑锋从磨砺出，梅花香自苦寒来
actionText: 快速上手 →
actionLink: /uniapp/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2020 borylee
---

::: tip
这是一套适用于公司业务的组件库


移动端计划组件:

- picker(选择器)
- DatetimePicker(时间选择器)
- calendar(日历)
- radio(单选框)
- checkbox(复选框)
- form(表单)
- collapse(折叠面板)
- tag(标签)
- cell(单元格)
- icon(图标库)
- upload(文件上传)
- tab(标签页)
- divider(分割线)
- dropdownMenu(下拉菜单)
- shareSheet(分享面板)
- empty(空状态)
- datePicker(阴阳历日期选择器)
- addressPicker(地址选择器）
- indexBar(索引栏) 
  
:::

**安装**
```sh
yarn add jc-mobile-ui
or
npm install jc-mobile-ui --save
```

**引入JCMobileUI**

在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import JCMobileUI from 'jc-mobile-ui';

Vue.use(JCMobileUI)
```


