---
title: 组件总览
---

::: tip
这是一套与uniapp对应的不依赖于ui库的纯vue开发的适用于移动端的组件
:::


```sh
yarn add jc-mobile-ui
or
npm install jc-mobile-ui
```


**引入项目**

```js
import Vue from 'vue';
import JCMobileUI from 'jc-mobile-ui';
Vue.use(JCMobileUI);
```


## 阴阳历日期选择器

扫二维码体验：

<img :src="$withBase('/assets/datepicker.png')" class='effect'/>


## Radio单选框

<style scope>
.effect.medium-zoom-image{
    width: 200px;
    height: 200px;
    margin: 10px;
}
</style>