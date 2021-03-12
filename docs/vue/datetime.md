# DateTime 时间选择器

::: tip
支持7种时间类型： 年、年月、年月日、年月日时分、年月日时分秒、时分秒、时分
:::

<jc-qrcode name="datetime"/>

**代码演示**

### 基础用法

```vue
<template>
    <view>
        <jc-cell title="展示年月日" value='请选择年月日时分' isLink @click="cellClick"></jc-cell>
        <jc-dateTime ref='date' type='date' @change='dateTimeChange'></jc-dateTime>
    </view>
</template>
<script>
import jcCell from '@/components/jc-cell/jc-cell.vue'
import jcDateTime from '@/components/jc-dateTime/jc-dateTime.vue'
export default{
    components: { jcCell,jcDateTime },
    data() {
        return { 
            text: '请选择年月日时分'
        }
    },
    methods: { 
        cellClick() {
            this.$refs['date'].open()
        },
       dateTimeChange(value){
           this.text = value;
       } 
    }
}
</script>
```

### jcDateTime属性说明
| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| startYear | Number | 1900 | 开始年 |
| endYear | Number | 当前年 | 结束年 |
| isShowToolBar | Boolean | true | 是否显示顶部栏 |
| cancelButtonText | String | 取消 | 顶部栏左边按钮文字 |
| cancelButtonClass | String | cancel-btn | 顶部栏左边按钮自定义类 |
| toolBarTitle | String | 请选择 | 顶部栏中间标题文字 |
| toolBarTitleClass | String | tool-title | 顶部栏中间标题自定义类 |
| confirmButtonText | String | 确定 | 顶部栏右边按钮文字 |
| confirmButtonClass | String | confirm-btn | 顶部栏右边按钮自定义类 |
| datestring | String | “" | 传入的时间字符串 |
| type | String | date | 时间类型 可选date、year-month、year、datetime、datetime-all、time、hour-minute |
| indicatorStyle | Object  | Null |  自定义indicator样式 |

### 事件

| 事件名 | 说明 | 回调参数 | 
| --- | --- | --- | --- |
| change | 当值变化时触发的事件 | value: 当前选中的时间 | 
