# Input 输入框

<jc-qrcode name="input"/>

**引入**

```vue
<script>
import jcInput from "@/components/jc-input/jc-input.vue";
export default {
  components: { jcInput },
  data() {
    return {
      text: true,
    };
  },
};
</script>
```

**代码演示**

### 基础用法

可以通过 v-model 双向绑定输入框的值，通过 placeholder 设置占位提示文字

```vue
<jc-input label="文本" v-model="text" placeholder="请输入文本" />
<jc-input label="文本" v-model="text" placeholder="请输入文本" required />
```

### 自定义类型

根据 type 属性定义不同类型的输入框，默认值为 text

```vue
<jc-input label="文本" v-model="text" placeholder="请输入文本" />
<jc-input
  label="手机号"
  type="digit"
  v-model="text"
  maxlength="11"
  placeholder="请输入手机号"
/>
<jc-input
  label="密码"
  type="password"
  v-model="text"
  placeholder="请输入密码"
/>
```

### 禁用输入框

通过 readonly 将输入框设置为只读状态，通过 disabled 将输入框设置为禁用状态

```vue
<jc-input label="文本" v-model="text" placeholder="请输入文本" readonly />
<jc-input label="文本" v-model="text" placeholder="请输入文本" disabled />
```

### 密码输入框

通过 show-password 右边出现展示、隐藏图标

```vue
<jc-input label="密码" v-model="text4" placeholder="请输入密码" show-password />
```

### 显示图标

通过 left-icon 和 right-icon配置输入框两侧的图标,通过eftIcon和rightIcon插槽自定义左右两边的图片

```vue
<jc-input
  left-icon="help-l"
  label="文本"
  v-model="text4"
  placeholder="请输入文本"
  readonly
/>
<jc-input label="文本" v-model="text4" placeholder="请输入文本" readonly>
	<template #leftIcon>
		<image src="@/static/logo.png" mode="" class="label-icon-img"></image>
	</template>
</jc-input>
<jc-input
  right-icon="help-l"
  label="文本"
  v-model="text4"
  placeholder="请输入文本"
  readonly
/>
<jc-input label="文本" v-model="text4" placeholder="请输入文本" readonly>
	<template #rightIcon>
		<image src="@/static/logo.png" mode="" class="label-icon-img"></image>
	</template>
</jc-input>
```


### 插入按钮

通过 button 插槽可以在输入框尾部插入按钮。

```vue
<jc-input label="短信验证码" v-model='text6' maxlength="4" type="number" placeholder="请输入验证码">
	<template #button>
		<jc-button size="small" type="primary">发送验证码</jc-button>
	</template>
</jc-input>
<jc-input label="文本" v-model='text6' maxlength="4" type="number" placeholder="请输入文本">
	<template #button>
		<jc-button color="#666" round plain size='mini'>标签</jc-button>
	</template>
</jc-input>
```

### 高度自适应

对于 textarea，可以通过 autoHeight 属性设置高度自适应

```vue
	<jc-input label="留言" v-model='text' type="textarea" border="none" placeholder="请输入留言" autoHeight />
```

### 显示字数统计

设置 maxlength 和 showWordLimit 属性后会在底部显示字数统计

```vue
	<jc-input label="留言" v-model='text' type="textarea" border="none" placeholder="请输入留言" maxlength="100" showWordLimit />
```

### 属性说明

| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 输入框左侧文本 | string | '' |
| labelWidth | 左侧文本宽度，默认单位为rpx | string、number | 180 |
| leftIcon | 左侧图标名称 | string | - |
| rightIcon | 右侧图标名称 | string | - |
| name | 名称，提交表单的标识符 | string | - |
| required | 是否显示表单必填星号 | boolean |false |
| value | 当前输入的值 | number、string | - |
| type | 输入框类型, 可选值为text、digit、number、textarea、password | string | text |
| placeholder | 输入框为空时占位符 | string | - |
| placeholderClass | 指定 placeholder 的样式类 | string | 'jc-placeholder' |
| clearable | 是否启用清除图标，点击清除图标后会清空输入框 | boolean | false |
| border | 内边框,none、normal、top、bottom  | string | 'bottom' |
| borderColor | 边框颜色 | string | '#f5f5f5' |
| maxlength | 输入的最大字符数 | string、number | -1 |
| disabled | 是否禁用输入框	 | boolean | false |
| readonly | 是否只读 | boolean | false |
| autofocus | 是否自动聚焦 | boolean | false |
| autoHeight | 是否自适应内容高度，只对 textarea 有效 | boolean | false |
| showWordLimit | 是否显示字数统计，需要设置maxlength属性，只对 textarea 有效 | boolean | false |
| showPassword | 是否显示密码按钮 | boolean | false |

### 事件

| 事件名 | 说明 | 回调参数 | 
| --- | --- | --- |
| input | 输入框内容变化时触发 | value: string (当前输入的值) | 




