---
title: 阴阳历日期选择器
---

<DatePickerDemo></DatePickerDemo>

扫二维码体验：

<img :src="$withBase('/assets/datepicker.png')" class='effect datepicker' />

安装：

```sh
npm install --save bory-date-picker
or yarn add bory-date-picker
```

使用：

```js
import DatePicker from 'bory-date-picker';
import 'bory-date-picker/lib/bory-date-piker.css';
Vue.use(DatePicker)
```

使用示例：

<<< @/docs/.vuepress/components/DatePickerDemo.vue

<style scope>
.effect.datepicker{
    width: 200px;
    height: 200px;
}
</style>