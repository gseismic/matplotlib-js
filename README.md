# mchart.js
mchart.js 是一个用于创建类似于matplotlib图的JavaScript库。
| mchart.js is a JavaScript library for creating `matplotlib-like` charts. 

这个库只是为了满足`个人`绘制可定制化图表的需求。
| it is only to meet my `personal` needs of drawing customizable charts.

## 设计初衷 Design Intentions
- 同时绘制多个Chart | draw multiple charts together
- 控制所有绘图细节 | control all drawing details
- 方便二次开发 | Easy to develop new features
- 高性能，数据局部更新 | High performance, data partial update
- 轻量级，代码简洁，扩展方便 | Lightweight, simple code, easy to extend
- matplotlib风格的API | matplotlib-style API
- 易于使用 | Easy to use

## 不是什么 Not Intended to be
- 全能的绘图库 | All-purpose plotting library
- 替代品 | Replacement for other libraries

## TODO | Features
- [ ] 可扩展的基本绘图框架 | Extensible basic plotting framework
- [ ] LineChart 折线图 | Line Chart
- [ ] BarChart 柱状图 | Bar Chart
- [ ] ScatterChart 散点图 | Scatter Plot
- [ ] CandlestickChart 蜡烛图 | Candlestick Chart

## 应用场景 | Application Scenarios
- [ ] 插件开发 | Plugin development
- [ ] 科学计算 | Scientific computing
- [ ] 数据分析 | Data analysis
- [ ] 金融图表 | Financial charts

## 类 | Classes
- [ ] Core 核心
    - [x] Canvas 画布 | Canvas
    - [x] Figure 图 | matplotlib-like Figure
    - [x] Scene 绘制元素管理 | Drawing element management
    - [ ] Axes: 绘图区域 | Plotting area
    - [x] DataTransform2D 数据变换 | matplotlib-like Data Transformation
    - [x] AxesTransform2D 轴变换 | matplotlib-like Axes Ratio Transformation
    - [x] Renderer 渲染器 | Renderer
    - [x] Signal 信号 | Signal
    - [x] MarginOptions 边距 | Margin Options
    - [x] Legend 图例 | Legend
    - [ ] Event 事件 | Event
 - [ ] Chart 
    - [ ] LineChart 折线图 | Line Chart
    - [ ] BarChart 柱状图 | Bar Chart
    - [ ] ScatterChart 散点图 | Scatter Plot
    - [ ] CandlestickChart 蜡烛图 | Candlestick Chart
- [ ] Artist/Element: 绘图元素 | Drawing elements
    - [ ] Drawable 绘图对象 | Drawable Object
    - [ ] Line 折线 | Line
    - [ ] Circle 圆 | Circle
    - [ ] Rectangle 矩形 | Rectangle
    - [ ] Ellipse 椭圆 | Ellipse
    - [ ] Text 文本 | Text
    - [ ] Image 图像 | Image
    - [ ] Legend 图例 | Legend
    - [ ] KLine 蜡烛图 | KLine


## 安装 | Installation
你可以使用npm安装mchart.js:

```bash
cd mchart.js

# 安装typescript | install typescript
npm install typescript

# 编译typescript为javascript | compile typescript to javascript
npx tsc

# 安装live-server | install live-server
npm install -g live-server

# 运行测试服务器, 打开http://localhost:8080/examples/demo_hello.html | run test server, open http://localhost:8080/examples/demo_hello.html 
live-server
```

## 使用 | Usage

```javascript
import { Figure } from 'mchart.js';

const figure = new Figure();
```

### html
TODO: not-done
```html
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Matplotlib.js Demo</title>
</head>
<body>
    <canvas id="myCanvas" width="800" height="600"></canvas>
    <script type="module">
        import { Figure } from '../dist/finchart/index.js';

        const fig = new Figure('myCanvas');
        const ax = fig.add_subplot(1, 1, 1);

        // 绘制折线图
        const x = [1, 2, 3, 4, 5, 3];
        const y = [2, 4, 1, 5, 3, 3];
        ax.plot(x, y, { color: 'blue' });

        // 绘制散点图
        // const x2 = [1.5, 2.5, 3.5, 4.5, 30];
        // const y2 = [3, 1, 4, 2, 30];
        ax.scatter(x, y, { c: 'red', s: 8 });

        // 设置坐标轴范围和标签
        ax.set_xlim(0, 60);
        ax.set_ylim(0, 60);
        ax.set_xlabel('X轴');
        ax.set_ylabel('Y轴');

        fig.show();
    </script>
</body>
</html>
```

## 参考资料 | References
- [matplotlib](https://github.com/matplotlib/matplotlib/blob/main/lib/matplotlib/axes/_base.py)
