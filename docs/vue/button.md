---
sidebarDepth: 1
---
# Button按钮

<jc-qrcode name="button"/>


**引入**

```vue
<script>
import jcButton from '@/components/jc-button/jc-button.vue';
export default{
    components: { jcButton }
}
</script>
```

**代码演示**

### 按钮类型

按钮支持 default、primary、info、warning、danger 五种类型，默认为 default。

```vue
<jc-button type="default" text="默认按钮"></jc-button>
<jc-button type="primary" text="主要按钮"></jc-button>
<jc-button type="info" text="信息按钮"></jc-button>
<jc-button type="warning" text="警告按钮"></jc-button>
<jc-button type="danger" text="危险按钮"></jc-button>
```

### 朴素按钮

通过 plain 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```vue
<jc-button plain type="primary" text="主要按钮"></jc-button>
<jc-button plain type="info" text="信息按钮"></jc-button>
```

### 禁用状态

通过 disabled 属性来禁用按钮，禁用状态下按钮不可点击

```vue
<jc-button plain type="primary" text="主要按钮" disabled></jc-button>
<jc-button plain type="info" text="信息按钮" disabled></jc-button>
```

### 按钮形状

通过 square 设置方形按钮，通过 round 设置圆形按钮

```vue
<jc-button round type="primary" text="圆形按钮"></jc-button>
<jc-button square type="info" text="方形按钮"></jc-button>
```

### 图标按钮

通过 icon 属性设置按钮图标，支持 Icon 组件里的所有图标。

```vue
<jc-button plain type="primary" icon='add'></jc-button>
<jc-button plain type="primary" icon='add'>按钮</jc-button>
<jc-button plain type="info" icon='person'>按钮</jc-button>
```


### 按钮尺寸

支持 large、normal、small、mini 四种尺寸，默认为 normal。

```vue
<jc-button type="primary" size="large">大号按钮</jc-button>
<jc-button type="primary" size="normal">普通按钮</jc-button>
<jc-button type="primary" size="small">小型按钮</jc-button>
<jc-button type="primary" size="mini">迷你按钮</jc-button>
```

### 自定义颜色

通过 color 属性可以自定义按钮的颜色

```vue
<jc-button color="#7232dd" text="主要按钮"></jc-button>
<jc-button plain color="#7232dd" text="主要按钮"></jc-button>
```

### 属性说明

| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 primary info warning danger | string | default |
| size | 尺寸，可选值为 large normal small mini | string | normal |
| text | 按钮文字 | string | - |
| color | 按钮颜色 | string | - |
| bgColor | 按钮背景颜色 | string | - |
| icon | 图标名称 | string | - |
| plain | 是否为朴素按钮 | boolean | false |
| square | 是否为方形按钮 | boolean | false |
| round | 是否为圆形按钮 | boolean | false |
| disabled | 是否禁用按钮 | boolean | false |

### 事件

| 事件名 | 说明 | 回调参数 | 
| --- | --- | --- |
| click | 点击按钮，且按钮状态不为加载或禁用时触发 | event | 

