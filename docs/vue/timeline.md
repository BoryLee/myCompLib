# TimeLine 时间轴

<jc-qrcode name="timeline"/>

**代码演示**

### 基础用法

```vue
<jc-timeline>
	<jc-timeline-item title="2021-03-04" content="您提交了订单，请等待系统确认"></jc-timeline-item>	
    <jc-timeline-item title="2021-03-04" content="您提交了订单，请等待系统确认"></jc-timeline-item>	
    <jc-timeline-item title="2021-03-04" content="您提交了订单，请等待系统确认"></jc-timeline-item>	
    <jc-timeline-item title="2021-03-04" content="您提交了订单，请等待系统确认"></jc-timeline-item>				
</jc-timeline>
```

### 轴点类型

```vue
<jc-timeline>
	<jc-timeline-item color='#f00' title="2021-03-04" content="您提交了订单，请等待系统确认"></jc-timeline-item>	
    <jc-timeline-item color='#f00' dotType='stroke' title="2021-03-04" content="您提交了订单，请等待系统确认"></jc-timeline-item>	
    <jc-timeline-item color='rgb(69, 103, 0)' title="2021-03-04" content="您提交了订单，请等待系统确认"></jc-timeline-item>	
    <jc-timeline-item title="2021-03-04" content="您提交了订单，请等待系统确认"></jc-timeline-item>				
</jc-timeline>
```

### 自定义轴点样式

```vue
<template>
  <view>
    <jc-timeline>
      <jc-timeline-item
        title="2021-03-04"
        content="您提交了订单，请等待系统确认"
      >
        <template #dot>
          <image src="/static/logo.png" mode="" class="dot-img"></image>
        </template>
      </jc-timeline-item>
      <jc-timeline-item
        title="2021-03-04"
        content="您提交了订单，请等待系统确认"
        dotColor="f00"
        dotType="stroke"
      >
      </jc-timeline-item>
      <jc-timeline-item
        title="2021-03-04"
        content="您提交了订单，请等待系统确认"
        dotColor="rgb(69, 103, 0)"
        dotType="stroke"
      >
      </jc-timeline-item>
      <jc-timeline-item
        title="2021-03-04"
        content="您提交了订单，请等待系统确认"
        dotColor="f00"
      >
      </jc-timeline-item>
    </jc-timeline>
  </view>
</template>
```

### jcTimeline属性说明
| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | - |
| titleColor | 标题颜色 | string | #333 |
| content | 内容 | string | - |
| contentColor | 内容颜色 | string | #999 |
| size | 轴点大小 | Number | 24 |
| dotType | 轴点样式，fill，stroke | string | fill |
| dotColor | 轴点颜色 | string | - |
| lineColor | 线的颜色 | string | #c2c2c2 |
