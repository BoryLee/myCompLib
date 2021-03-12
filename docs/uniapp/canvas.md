# canvas 学习

## 基础概述

### 矩形

```javascript
//画笔
const ctx = canvas.getContext("2d");
//填充颜色
ctx.fillStyle = "red";
//描边颜色
ctx.strokeStyle = "blue";
//描边宽度
ctx.lineWidth = 40;
//填充矩形
ctx.fillRect(50, 50, 400, 200);
//描边矩形
ctx.strokeRect(50, 50, 400, 200);
//清理矩形
ctx.clearRect(50, 50, 400, 200);

ctx.beginPath();
ctx.fillStyle = "pink";
ctx.rect(50, 50, 400, 200);
ctx.fill();
```

### 线

```javascript
//画笔
const ctx = canvas.getContext("2d");
ctx.lineWidth = 10;
//开始建立路径
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(400, 50);
ctx.lineTo(400, 150);
ctx.stroke();
```

### 圆弧

```javascript
ctx.beginPath();
ctx.arc(300, 300, 100, 0, (Math.PI * 3) / 2);
ctx.stroke();
```

#### 扇形

```javascript
ctx.beginPath();
ctx.fillStyle = "red";
ctx.moveTo(300, 300);
ctx.arc(300, 300, 100, 0, (Math.PI / 180) * 60);
ctx.fill();
```

#### 切线圆弧

```javascript
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(400, 50);
ctx.lineTo(400, 350);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(50, 50);
ctx.arcTo(400, 50, 400, 350, 100);
ctx.stroke();
```

#### 二次贝塞尔曲线

```javascript
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(400, 50);
ctx.lineTo(400, 350);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(50, 50);
ctx.quadraticCurveTo(400, 50, 400, 350);
ctx.stroke();
```

#### 三次贝塞尔曲线

```javascript
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(400, 50);
ctx.lineTo(400, 350);
ctx.lineTo(600, 350);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(50, 50);
ctx.bezierCurveTo(400, 50, 400, 350, 600, 350);
ctx.stroke();
```

### 渐变

```javascript
const ctx = canvas.getContext("2d");
const gr = ctx.createLinearGradient(50, 50, 400, 400);
const gr = ctx.createRadialGradient(200, 200, 50, 300, 300, 200);
gr.addColorStop(0, "red");
gr.addColorStop(0.5, "green");
gr.addColorStop(1, "blue");
ctx.fillStyle = gr;
ctx.fillRect(50, 50, 350, 350);
```

### 纹理

```javascript
const ctx = canvas.getContext("2d");
const image = new Image();
image.src = "../images/floor.jpg";
image.onload = function() {
  const pattern = ctx.createPattern(image, "no-repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
```

### 描边样式

#### lineCap

```javascript
ctx.save();
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(450, 50);
ctx.lineCap = "butt";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 150);
ctx.lineTo(450, 150);
ctx.lineCap = "round";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 250);
ctx.lineTo(450, 250);
ctx.lineCap = "square";
ctx.stroke();
ctx.restore();
```

#### lineCap

```javascript
ctx.save();
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(450, 50);
ctx.lineCap = "butt";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 150);
ctx.lineTo(450, 150);
ctx.lineCap = "round";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 250);
ctx.lineTo(450, 250);
ctx.lineCap = "square";
ctx.stroke();
ctx.restore();
```

#### lineCap

```javascript
ctx.save();
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(450, 50);
ctx.lineCap = "butt";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 150);
ctx.lineTo(450, 150);
ctx.lineCap = "round";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 250);
ctx.lineTo(450, 250);
ctx.lineCap = "square";
ctx.stroke();
ctx.restore();
```

#### lineCap

```javascript
ctx.save();
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(450, 50);
ctx.lineCap = "butt";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 150);
ctx.lineTo(450, 150);
ctx.lineCap = "round";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 250);
ctx.lineTo(450, 250);
ctx.lineCap = "square";
ctx.stroke();
ctx.restore();
```

#### lineCap

```javascript
ctx.save();
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(450, 50);
ctx.lineCap = "butt";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 150);
ctx.lineTo(450, 150);
ctx.lineCap = "round";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 250);
ctx.lineTo(450, 250);
ctx.lineCap = "square";
ctx.stroke();
ctx.restore();
```

#### lineCap

```javascript
ctx.save();
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(450, 50);
ctx.lineCap = "butt";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 150);
ctx.lineTo(450, 150);
ctx.lineCap = "round";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 250);
ctx.lineTo(450, 250);
ctx.lineCap = "square";
ctx.stroke();
ctx.restore();
```

#### lineJoin

```javascript
ctx.save();
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(450, 50);
ctx.lineTo(150, 150);
ctx.lineJoin = "miter";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 250);
ctx.lineTo(450, 250);
ctx.lineTo(150, 350);
ctx.lineJoin = "round";
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.moveTo(50, 450);
ctx.lineTo(450, 450);
ctx.lineTo(150, 550);
ctx.lineJoin = "bevel";
ctx.stroke();
ctx.restore();
```

#### setLineDash lineDashoffset

```javascript
ctx.save();
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(500, 50);
// ctx.setLineDash([30,60,90])
ctx.setLineDash([30, 30]);
ctx.stroke();
ctx.restore();
ctx.save();
ctx.beginPath();
ctx.moveTo(50, 150);
ctx.lineTo(500, 150);
ctx.setLineDash([30, 30]);
ctx.lineDashOffset = 40;
ctx.stroke();
ctx.restore();
```

#### 投影的属性

- 位置
  - shadowOffsetX
  - shadowOffsetY
- 模糊度
  - shadowBlur
- 颜色

  - shadowColor

  ```javascript
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(300, 200, 100, 0, Math.PI * 2);
  ctx.fillStyle = "#93abff";
  ctx.shadowColor = "#000";
  ctx.shadowOffsetY = 30;
  ctx.shadowBlur = 30;
  ctx.fill();
  ```

  ### 矩阵变换

相对变换矩阵： transform(a,b,c,d,e,f)
绝对变换矩阵： setTransform(a,b,c,d,e,f)

![](media/16071505272174/16072307513186.jpg)

- a,d:x,y 轴向的缩放，默认为 1
- c,b:x,y 轴向的倾斜，默认为 0
- e,f:x,y 轴向的位移，默认为 0


## canvas案例

### 霓虹灯

```javascript
        const canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d");
        const colors = ['red','yellow'];
        
        function draw(){
            ctx.save();
            ctx.translate(300,400);
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.bezierCurveTo(-200,-50,-180,-300,0,-200);
            ctx.bezierCurveTo(180,-300,200,-50,0,0);
            ctx.closePath();
            ctx.strokeStyle = colors[0];
            ctx.lineWidth = 10;
            //虚线
            ctx.setLineDash([30])
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.translate(300,400);
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.bezierCurveTo(-200,-50,-180,-300,0,-200);
            ctx.bezierCurveTo(180,-300,200,-50,0,0);
            ctx.closePath();
            ctx.strokeStyle = colors[1];
            ctx.lineWidth = 10;
            //虚线
            ctx.setLineDash([30])
            ctx.lineDashOffset = 30;

            ctx.shadowColor = 'orange';
            //叠加光晕
            for(let i = 50; i > 0; i -= 5){
                ctx.shadowBlur = i;
                ctx.stroke();
            }
         
            ctx.restore();
        }
        draw();

        setInterval(()=>{
            ctx.clearRect(0,0,canvas.width,canvas.height);
            colors.reverse();
            draw();
        },300)

```


