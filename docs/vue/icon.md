
# Icon图标

<jc-qrcode name="icon"/>

**引入**

```vue
<script>
import jcIcon from '@/components/jc-icon/jc-icon.vue';
export default{
    components: { jcIcon }
}
</script>
```
**代码演示**

### 基础用法

Icon 的 name 属性支持传入图标名称

```vue
<jc-icon name="person"/>
```

### 图标颜色

Icon 的 color 属性用来设置图标的颜色

```vue
<jc-icon name="person" color="#1989fa"/>
```

### 图标大小

Icon 的 size 属性用来设置图标的尺寸大小，默认单位为 rpx。

```vue
<jc-icon name="person" size='28'/>
```

### 属性说明

| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 图标名称 | string | - |
| color | 图标颜色 | string | #333333 |
| size | 图标大小，单位px | string、number | 32 |

### 事件

| 事件名 | 说明 | 回调参数 | 
| --- | --- | --- |
| click | 点击图标时触发 | event | 