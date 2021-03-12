
# Switch开关

<jc-qrcode name="switch"/>

**引入**

```vue
<script>
	import jcSwitch from '@/components/jc-switch/jc-switch.vue'
	export default {
		components: { jcSwitch },
        data(){
            return { 
               checked: true 
            }
        }
	}
</script>
```

**代码演示**

### 基础用法
通过 v-model 绑定开关的选中状态，true 表示开，false 表示关

```vue
<jc-switch v-model="checked"></jc-switch>
```

### 只读状态
通过 read-only 属性只能读取，只读状态下开关不可点击

```vue
<jc-switch v-model="checked" read-only></jc-switch>
```

### 禁用状态
通过 disabled 属性来禁用开关，禁用状态下开关不可点击

```vue
<jc-switch v-model="checked" disabled></jc-switch>
```

### 自定义大小
通过 width 属性设置自定义开关的大小

```vue
<jc-switch v-model="checked" :width="50"></jc-switch>
<jc-switch v-model="checked"></jc-switch>
<jc-switch v-model="checked" :width="150"></jc-switch>
```

### 自定义颜色
activeColor 属性表示打开时的背景色，inActiveColor表示关闭时的背景色

```vue
<jc-switch v-model="checked" activeColor="#1989fa" inActiveColor="#f00"></jc-switch>
```

### 异步控制

需要异步控制开关时，可以使用 value 属性和 input 事件代替 v-model，并在 input 事件回调函数中手动处理开关状态

```vue
<jc-switch :value="checked" @input='onInput'></jc-switch>
<jc-dialog ref='dialog' title="提示" content="是否切换开关?" showCancelButton></jc-dialog>
```

```javascript
onInput(checked){
	this.$refs['dialog'].open()
}
```

### jcSwitch属性说明

| 参数 | 参数描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 开关选中状态 | boolean | - |
| readOnly | 是否为只读状态 | boolean | false |
| disabled | 是否为禁用状态 | boolean | false |
| width | 选中颜色 | string | #912222 |
| activeColor | 关闭时的背景色 | string | #912222 |
| inActiveColor | 图标大小 | string、number | #DDDDDD |
