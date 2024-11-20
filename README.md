# matplotlib.js/mchart.js
A chart lib with matplotlib-like api to draw customizable charts.

`NOT-DONE`

## 设计初衷 Design Intentions
- 支持多Chart | multiple charts
- 控制所有绘图细节 | control all drawing details
- 高性能的数据局部更新 | data partial update
- matplotlib风格API | matplotlib-style API

## Examples
- [Hello](./examples/demo_hello.html)
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Matplotlib.js Demo</title>
</head>
<body>
    <canvas id="myCanvas" width="800" height="600" style="border: 1px solid black; background-color:red;"></canvas>
    <script type="module">
        import { Figure } from '../dist/mchart/index.js';

        const fig = new Figure('myCanvas');
        const ax = fig.add_subplot(2, 2, 0, 0);

        // 绘制折线图 | draw line plot
        const x = [1, 2, 3, 4, 5, 3];
        const y = [2, 4, 1, 5, 3, 3];
        ax.plot(x, y, { color: 'green' });

        // 绘制散点图 | draw scatter plot
        const x2 = [1.5, 2.5, 3.5, 4.5, 30];
        const y2 = [3, 1, 4, 2, 30];
        ax.scatter(x2, y2, { color: 'red', size: 8 });

        // 设置坐标轴范围和标签 | set axes limits and labels    
        ax.set_xlim(0, 6);
        ax.set_ylim(0, 6);
        ax.set_xlabel('X');
        ax.set_ylabel('Y');

        const ax2 = fig.add_subplot(2, 2, 0, 1);
        ax2.plot(x, y, { color: 'blue' });
        ax2.set_xlim(0, 6);
        ax2.set_ylim(0, 6);
        ax2.set_xlabel('X');
        ax2.set_ylabel('Y');

        fig.show();
    </script>
</body>
</html>
```

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
    - [x] BoundingBox 包围盒 | Bounding Box
 - [ ] Chart 
    - [ ] LineChart 折线图 | Line Chart
    - [ ] BarChart 柱状图 | Bar Chart
    - [ ] ScatterChart 散点图 | Scatter Plot
    - [ ] CandlestickChart 蜡烛图 | Candlestick Chart
- [ ] Artist/Element: 绘图元素 | Drawing elements
    - [ ] Drawable 绘图对象 | Drawable Object
    - [x] Line@v0.0.1 折线 | Line
    - [ ] Circle 圆 | Circle
    - [ ] Rectangle 矩形 | Rectangle
    - [ ] Ellipse 椭圆 | Ellipse
    - [ ] Text 文本 | Text
    - [ ] Image 图像 | Image
    - [ ] Legend 图例 | Legend
    - [ ] KLine 蜡烛图 | KLine
- [ ] Animation 动画 | Animation
    - [ ] AnimationFrame 动画帧 | Animation Frame
    - [ ] AnimationPlayer 动画播放器 | Animation Player

## 安装 | Installation
基于npm安装mchart.js:

```bash
# 安装typescript | install typescript
npm install typescript
cd mchart.js
# 编译typescript为javascript | compile typescript to javascript
npx tsc
# 安装live-server | install live-server
npm install -g live-server

# 运行测试服务器, 打开http://localhost:8080/examples/demo_hello.html | run test server, open http://localhost:8080/examples/demo_hello.html 
live-server
```

## Known Issues & TODOs [temp]
- [ ] 使用字符串而非enum `type CanvasTextBaseline = "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";`
- [ ] 检查Legend的实现, 暂放, 应直接传位置参数
- [ ] 检查Canvas的实现
- [ ] 目前不支持Nested-Scene, 是否应该支持
- [ ] 暂时不考虑Figure-强制options模式, 后续参照 Axis 的实现
- [ ] 暂时不考虑event-handler
- [ ] 暂时不考虑data_view, data_view_changed
- [ ] resize-event
- [ ] 检查Scene的可见性等
- [ ] dpi问题
- [ ] more examples

## 参考资料 | References
- [matplotlib](https://github.com/matplotlib/matplotlib/blob/main/lib/matplotlib/axes/_base.py)
