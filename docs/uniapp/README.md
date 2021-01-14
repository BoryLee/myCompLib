# uni-app开发经验分享


uni-app是一个基于Vue.js的跨平台的开发的框架，这意味着只要你会vue就可以使用该框架编写一套代码，发布到ios、android、web、各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。
本文主要是分享我使用uni-app的一些经验和总结，所以有关该框架的详细资料，可以通过[uni-app官方网站](https://uniapp.dcloud.io/)查阅该框架的详细介绍，通过安装官网提供的开发工具[HBuilder X](https://www.dcloud.io/hbuilderx.html)来开发项目。

**本文主要针对我开发时常用到的方法，举的例子都是对于App来说的，当然也适用于小程序**

## 应用生命周期

- onLaunch
    - 初始化完成时触发: 刚打开app，但是未见到里面的内容，可以在该方法里面进行**版本更新**提示
- onShow
    - 启动或从后台进入前台显：app启动看到里面的内容
- onHide
    - 从前台进入后台：应用在后台（比如打开了其他app、电话来了等）

## 路由

对于app来说，每个页面对应一个路由，在uni-app中路由需要在根目录下pages.json的pages字段进行配置，具体查看[pages.json配置列表](https://uniapp.dcloud.io/collocation/pages),注意：pages节点的第一项为应用入口页（即首页）

### 路由跳转

官方api地址：https://uniapp.dcloud.io/api/router

- uni.navigateTo： 保留当前页面，跳转到应用内的某个页面，url可带参，类似于vue-router中的router.push
- uni.redirectTo： 关闭当前页面，跳转到应用内的某个页面，url可带参，类似于vue-router中router.replace
- uni.reLaunch：关闭所有页面，打开到应用内的某个页面，url可带参
- uni.switchTab：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面，url不可带参，
- uni.navigateBack：关闭当前页面，返回上一页面或多级页面，类似于vue-router中的router.go(-n)

**注意** 

url有长度限制，太长的字符串会传递失败,可通过窗口通信(下面会介绍)、全局变量或encodeURIComponent等多种方式解决

示例：

```vue
//pageA页面
const data = {
    //多个参数
}
uni.navigateTo({
    url: `/pages/pageB/pageB?data=encodeURIComponent(JSON.stringify(data))`
})

//pageB页面
onLoad(option){
    const data = JSON.parse(decodeURIComponent(option.data));
}

```


## 页面生命周期

- onLoad
    - 监听页面加载，其参数为上个页面传递的数据，常用于获取上一个页面传过来的参数
- onShow
    - 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面返回当前页面
- onReady
    - 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
- onHide
    - 监听页面隐藏。uni.navigateTo跳转到下个页面或者app后台运行 
- onUnload
    - 监听页面卸载。当前页面中执行uni.navigateBack  
- onPullDownRefresh
    - 监听用户下拉动作，一般用于下拉刷新。
- onReachBottom  
    - 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据
- onTabItemTap
    - 点击 tab或者执行uni.switchTab 时触发，参数为Object 
- onBackPress
    - 监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack。在回调函数中如果想进行一些逻辑判断的话，可以通过动态的设置return true禁止返回上一个页面，return false返回上一个页面
    
    ```vue
    onBackPress(event){
        const { from } = event;
        if(from === 'backbutton'){
            //逻辑判断
            return true;
        }else if(from === 'navigateBack'){
            return false;
        }
    }
    ```

  
## 组件生命周期

组件生命周期同vue

详细资料查阅: 

- [vue官网生命周期](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)
- [uni-app组件生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=%e7%bb%84%e4%bb%b6%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f) 

## 通信

### globalData

App.vue 中定义globalData的相关配置：

```vue
//App.vue
<script>
    export default{
        globalData: {
            msg: "hello world!"
        }
    }
</script>

//page中使用
//获取数据
getApp().globalData.msg
//更改数据
getApp().globalData.msg = 'uni-app!'
```
### 路由跳转传参

```vue
//pageA页面
uni.navigateTo({
    url: `/pages/pageB/pageB?name=uni-app&age=18`
})

//pageB页面
onLoad(option){
    const { name, age } = option;
}

```

### EventChannel

多用于页面间事件通信，页面A跳转到B传参，B页面返回A页面传参

```vue
//pageA
uni.navigateTo({
		url: '/pages/pageB/pageB',
		events:{
				fromBackPageData：function(data){
					console.log('fromBackPageData',data);
				}
	   },
    success(res){
			res.eventChannel.emit('passToNextPage',{name: 'pageA'})
    }
})

//pageB
onLoad(){
    const eventChannel = this.getOpenerEventChannel();
    <!--获取上一个页面传递的数据-->
	  eventChannel.on('passToNextPage',data => {
			console.log('passToNextPage', data);
	   })
	   <!--传递数据给上一个页面-->
	   eventChannel.emit('fromBackPageData',{name: 'backData'})
}
```

### 页面通信

- `uni.$emit`(事件名，参数),触发全局的自定事件;
- `uni.$on`(事件名,回调函数),监听全局的自定义事件，事件可以由 `uni.$emit` 触发;
- `uni.$once`(事件名,回调函数),监听全局的自定义事件，事件可以由 `uni.$emit` 触发，但是只触发一次，在第一次触发之后移除监听器;
- `uni.$off`(事件名,回调函数),移除全局自定义事件监听器

**注意：**
常用于跨页面、跨组件通讯；
要及时销毁事件监听

示例： 

```vue
//pageA
<template>
    <button @click='handleEvent'>pageA</button>
</template>
<script>
    export default {
        methods: {
          handleEvent(){
            uni.$emit('pageAEvent',{name: 'pageA'})
          }  
        }
    }
</script>
```

```vue
//pageB
<template>
    <button @click='handleEvent'>pageA</button>
</template>
<script>
    export default {
        onLoad(){
            uni.$on('pageAEvent',data => {
                console.log(data)
            })
        },
        onUnload(){
            uni.$off('pageAEvent',() => {
                console.log('移除事件pageAEvent');
            })
        }
    }
</script>
```
>组件间通信也可以这么使用，看情况处理

###  其他与vue通信方式一致

#### 1.事件总线：跨页面和组件

```js
class Bus{
    constructor(){
        this.callbacks = {};
    } 
    $on(eventName,cb){
        this.callbacks[eventName] = this.callbacks[name] || [];
        this.callbacks[name].push(cb);
    }
    $emit(eventName,args){
        if(this.callbacks){
            this.callbacks[name].forEach(cb => cb(args))
        }
    }
}
```

```js
// main.js
Vue.prototype.$bus = new Bus()
或
Vue.prototype.$bus = new Vue()
```

```vue
//pageA或componentA
this.$bus.$emit(事件名,参数)
```

```vue
//pageB或componentB
this.$bus.$on(事件名,回调函数)
```



#### 2.vuex： 跨页面和组件，创建唯一的全局数据管理者store，通过它管理数据并通知组件状态变更

```js
const store = new Vuex.Store({
    state: {},
    getters: {
    },
    actions: {
    },
    mutations: {
    } 
})

```



#### 3.props：属性传值，父给子传值
```vue
//父组件
<template>
    <child name='uni-app'></child>
</template>
```

```vue
//子组件
<template>
    <view>{{ name }}</view>
</template>
<script>
    export default{
        props: {
            name: String,
            default: ''
        }
    }
</script>
```
    
#### 4.自定义事件：子给父传值
```vue
//父组件
<template>
    父组件
    <child @onClick='handleEvent'></child>
</template>
<script>
    export default{
        methods: {
          handleEvent(value){
            console.log('来自子组件的数据',value)
          }  
        }
    }
</script>
```

```vue
//子组件
<template>
    <view>
        <button @click='handleEvent'>子组件</button>
    </view>
</template>
<script>
    export default{
        methods: {
          handleEvent(){
            this.$emit('onClick',{name: 'uni-app'});
          } 
        }
    }
</script>
```

#### 5.插槽
##### 匿名插槽
```vue
//父组件
<template>
    <child>hello world! uni-app!!!</child>
</template>
```

```vue
//子组件
<template>
    <view><slot></slot></view>
</template>
```

##### 具名插槽
```vue
//父组件
<template>
    <child>
        <template v-slot:header>头部</template>
        hello world! uni-app!!!
         <template v-slot:footer>尾部</template>
    </child>
</template>
```

```vue
//子组件
<template>
    <view>
        <slot name='header'></slot>
        <slot></slot>
        <slot name='footer'></slot>
    </view>
</template>
```

##### 作用域插槽 
```vue
//父组件
<template>
   <view>
      <child>
        <template v-slot:default='{user}'>
            {{user.name}}
        </template>
        <template v-slot:category='{list}'>
            <ul>
                <li v-for="item in list" :key='item'>{{item}}</li>
            </ul>
        </template>
      </child>
   </view>
    
</template>
```

```vue
//子组件
<template>
    <view>
        <slot :user='user'></slot>
        <slot name='category' :list='list'></slot>
    </view>
</template>
<script>
    export default{
        data(){
            return {
                user: {
                   name: 'uni-app',
                   age: 18 
                },
                list:['vue','react','node'] 
            }
        }
    }
</script>
```

#####  $refs：获取子节点引用:父传子

```vue
//父组件
<template>
    <view>
        <child ref='child'></child>
    </view>
</template>
<script>
export default {
    mounted(){
        this.$refs.child.passData('child')
    }
}
</script>
```

```vue
//子组件
<script>
export default {
    methods: {
       passData(data) {
        console.log("来自父组件的参数",data);
       }
    }
}
</script>
```


#####  `$parent`和`$root`：兄弟组件之间通信可通过共同祖辈搭桥

```vue
//父组件
<template>
    <view>
        <child1></child1>
        <child2></child2>
    </view>
</template>

```

```vue
//子组件child1
<template>
    <view>
        <view @click="handleEvent"></view>
    </view>
</template>
<script>
    export default {
        methods: {
            handleEvent(){
                this.$parent.$emit(事件名,参数)
            }
        }
    }
</script>

```
```vue
//子组件child2
<script>
    export default {
        mounted(){
            this.$parent.$on(事件名,回调函数) 
        } 
    }
</script>

```
##### `$children`：父组件可以通过`$children`访问子组件实现父子通信

```vue
//父组件
<template>
    <view>
        <child></child>
    </view>
</template>
<script>
    export default {
        mounted(){
            this.$children[0].title = 'uni-app'
        } 
    }
</script>
```
```vue
//子组件child
<template>
    <view>
        {{ title }}
    </view>
</template>
<script>
    export default {
        data() {
            return {
                title: 'vue'
            }
        }
    }
</script>

```

**注意：$children不能保证子元素顺序**

##### `$attrs`和`$listeners`:父子组件

>`$attrs`:包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

示例：

```vue
//父组件
<template>
     <child1 title='uni-app' :name='name' v-bind='$attrs'></child1>
</template>
export default {
  components: {
    Child
  },  
  data() {
    return {
      name: 'vue'
    }
  }
};
</script>

```

```vue
//子组件
<template>
    <view>
     来自$attrs： {{ $attrs.title }}
     来自prop：{{ name }}
    </view>
</template>
<script>
    export default {
        name: 'Child1'
        props: {
            name: {
                type: String,
                default: ''
            }
        },
        mounted () {
            console.log(this.$attrs);
        },
    }
</script>
```

>`$listeners`:包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

```vue
//父组件
<template>
    <child @click='handleEvent' @change='handleChange' v-on='$listeners'></child>
</template>
export default {
  components: {
    Child
  },  
  methods: {
    handleEvent() {
      console.log('handleEvent');
    },
    handleChange(){
      console.log('handleChange');
    }
  },
};
</script>

```


```vue
//子组件
<script>
    export default {
      mounted () {
           for(let eventName in this.$listeners){
               this.$listeners[eventName]()
            }
        },
    }
</script>
```

##### provide和inject 能够实现祖先和后代之间传值

```vue
//祖先组件
export default {
   provide(){
    return {
        name: 'uni-app'
    }
   }
}
```

```vue
//后代组件
<template>
    <view>
        {{ name }}
    </view>
</template>
export default {
   inject: ['name']
}
```
**在接下来的组件章节会做更进一步的介绍**

## 组件
## canvas

## 开发过程中遇到的问题及解决方案

### 1. picker在各平台的实现是有UI差异的，如何保持统一？
 
 使用picker-view 组件替代 
 
### 2.app端利用vue开发自定义弹窗组件，无法遮挡navigationBar和tabbar

原因：小程序和App的vue页面，主体是webview渲染的，也就是嵌套了的html页面，navigationBar和tabbar都是原生组件，在uni-app中原生组件脱离在 WebView 渲染流程，层级最高，所以vue开发的前端组件无法遮挡navigationBar和tabbar

解决方案：

- 可以使用nvue开发，全部是原生渲染，不涉及层级问题；
    - 具体开发请查阅uni-app官方提供的[nvue教程](https://uniapp.dcloud.io/nvue-outline)
- plus.nativeObj.view，它是一个原生的类画布的控件，可以画出任何界面；
    - 不建议使用，有3个弊端：1. api很底层，开发比较复杂；2. 不支持动画；3. 不支持内部滚动
- subNVue是原生渲染的nvue子窗体，把一个nvue页面以半屏的方式覆盖在vue页面上；
    - subNVue的官方的详细介绍：https://ask.dcloud.net.cn/article/35948
- 弹出部分区域透明的nvue页面,即看起来是在本窗体弹出一个元素，但实际上是弹出了一个部分区域蒙灰透明的新窗体。
    - 使用方式可以参考官方建议的插件：https://ext.dcloud.net.cn/plugin?id=953

### 3.自定义loading,带动图效果

当请求接口时，为了避免用户等待，在数据未返回是页面展示loading，uni-app提供了uni.showLoading这个api来使用，但是如果产品经理可能会觉得很丑，我们不得不自定义，但是官方没有提供相关接口，于是我们想到要自定义loading组件，但是在uni-app中要想每个页面使用loading组件需要在每个页面引入，可能还需要通过一些方法来控制它的显示和隐藏，如果一个页面并发多个请求时可能还会出现问题(我就经历过，ios没问题，安卓有问题，猜测和渲染的时机有关)，通过查阅资料，可以通过html5+提供的方法plus.nativeUI.showWaiting来解决，具体查阅：https://www.html5plus.org/doc/zh_cn/nativeui.html#plus.nativeUI.showWaiting

示例：

```javascript
#ifdef APP-PLUS
    let loading；
    // #ifdef APP-PLUS
    //请求开始
		loading = plus.nativeUI.showWaiting('数据加载中...', {
			background: 'rgba(0,0,0,0.3)', 
			color: '#fff',
			width:'100%',
			height: '100%',
			size: '15px',
			loading: {
				display: 'block',
				icon: '/static/11.png',//自定义图片地址
				width: '80px',//图片宽高
				height: '80px',
				interval: '500ms'
			}
		});
		//请求成功或失败
		loading.close()
	// #endif
```

**注意：**

自定义loading图标的路径，png格式，并且必须是本地资源地址； loading图要求宽是高的整数倍，显示等待框时按照图片的高横向截取每帧刷新。例如，一个gif图有10部分组成，要把这10个图拼成一个高为100px，宽10*100的png格式图片，当loading显示时，图片会通过设置好的interval时间进行动画，类似于css中的不断改变background-position值。

### 4.把页面内容生成图片

##### 使用html2canvas第三方库

> 只适用于h5和app端，其他端请参考相关平台的api进行实现

可能有人要说这个库是基于dom的，在h5端可以使用，而app端没有dom不能使用，那么接下来就主要介绍下在app端如何使用的：

**renderjs**

示例:

下载html2canvas.min.js这个库，放到项目目录下的static文件夹下

```vue
<template>
	<view class="content">
		<view class="main" id="main">
			<text>renderjs示例</text>
		</view>
		<button type="default" @click="html2canvas.onClick">生成图片</button>
		<view class="image-container">
			<image :src="imageUrl" mode="" class="img"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: ''
			}
		},
		methods: {
			generatorImage(url){
				this.imageUrl = url;
			}
		}
	}
</script>
<script module="html2canvas" lang="renderjs">
	export default {
		mounted() {
			// 动态引入较大类库避免影响页面展示
			const script = document.createElement('script')
			// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
			script.src = 'static/html2canvas.min.js'
			document.head.appendChild(script)
		},
		methods: {
			onClick(event, instance) {
				html2canvas(document.querySelector("#main")).then(canvas => {
					const url = canvas.toDataURL();
					// 调用 service 层的方法
					instance.callMethod('generatorImage', url)
				});
			}
		}
	}
</script>
```
示例代码地址： https://github.com/BoryLee/uniapp-renderjs

##### html5+截屏绘制

参考资料：http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewDrawOptions

```vue
<template>
	<view class="content">
		<view class="main" id="main">
			<text>renderjs示例</text>
		</view>
		<button class="btn" type="default" @click="plusClick">plus生成图片</button>
		<view class="image-container" v-if='plusUrl'>
			<image :src="plusUrl" mode="" class="img"></image>
			<text>plus图片</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				plusUrl: ''
			}
		},
		methods:{
			plusClick(){
				const self = this;
				const {statusBarHeight} = uni.getSystemInfoSync()
				const query = uni.createSelectorQuery().in(this);
				query.select('#main').boundingClientRect(data => {
					console.log(data);
					const { top,left,width,height } = data;
					// #ifdef APP-PLUS
					const pages = getCurrentPages();
					const page = pages[pages.length - 1];
					const ws = page.$getAppWebview();
					const bitmap = new plus.nativeObj.Bitmap('test');
					ws.draw(bitmap,
						function() {
							bitmap.save(`_doc/${new Date().getTime()}.jpg`, {
								overwrite: true,
								quality: 100,
								clip: {
									top:top + 44 + statusBarHeight,
									left,
									width,
									height
								},
							}, function(result) {
								self.plusUrl = result.target;
							}, function(e) {
								console.log('保存图片失败：' + JSON.stringify(e));
							});
						},
						function(e) {
							console.log('截屏绘制图片失败：' + JSON.stringify(e));
						});
					
					// #endif
				}).exec();
				
			}
		}
	}
</script>

```
示例代码地址： https://github.com/BoryLee/uniapp-renderjs
































