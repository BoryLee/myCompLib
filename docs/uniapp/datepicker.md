---
title: 阴阳历日期选择器
---

#### 效果图

<img src='https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/2feecfb0-b5bf-11ea-ad76-a11480dcc0f4_0.jpeg?v=1593399013' class='effect'>
<img src='https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/2feecfb0-b5bf-11ea-ad76-a11480dcc0f4_1.jpeg?v=1593399013' class='effect'>
<img src='https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/2feecfb0-b5bf-11ea-ad76-a11480dcc0f4_2.jpeg?v=1593399013' class='effect'>
<img src='https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/2feecfb0-b5bf-11ea-ad76-a11480dcc0f4_3.jpeg?v=1593399013' class='effect'>
<img src='https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/2feecfb0-b5bf-11ea-ad76-a11480dcc0f4_4.jpeg?v=1593399013' class='effect'>


#### 属性说明

 | 属性名          | 类型     | 默认值  | 说明                                |
 | --------------- | -------- | ------- | ----------------------------------- |
 | isShowChinaTime | Boolean  | false   | 是否显示时辰                        |
 | currentTime     | String   |         | 当前时间(格式：yyyy-mm-dd hh:mm:ss) |
 | startYear       | Number   | 1900    | 开始年份                            |
 | endYear         | Number   | 2100    | 结束年份                            |
 | isLunar         | Boolean  | false   | 是否为阴历                          |
 | solarText       | String   | 阳历    | 阳历文字                            |
 | lunarText       | String   | 阴历    | 阴历文字                            |
 | defaultColor    | String   | #000000 | 默认文字颜色                        |
 | activeColor     | String   | #912222 | 选择文字颜色                        |
 | confirmText     | String   | 确定    | 确定文字                            |
 | confirmColor    | String   | #912222 | 确定文字颜色                        |
 | @changecalendar | Function |         | 切换阴阳历,返回是否为阴历           |
 | @confirm        | Function |         | 点击确定事件 ,返回data              |


<style scope>
.effect{
    width: 200px;
    height: 300px;
    margin: 10px;
}
</style>



[下载插件和使用示例](https://ext.dcloud.net.cn/plugin?id=2135)
