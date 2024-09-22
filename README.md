# mchart.js[draft-not-done]
mchart.js 是一个用于创建类似于matplotlib图的JavaScript库。
| mchart.js is a JavaScript library for creating `matplotlib-like` charts. 

这个库只是为了满足`个人`绘制可定制化图表的需求。
| it is only to meet my `personal` needs of drawing customizable charts.

`NOT-DONE`

## Status
draft & not-usable

## 设计初衷 Design Intentions
- 同时绘制多个Chart | draw multiple charts together
- 控制所有绘图细节 | control all drawing details
- 方便二次开发 | Easy to develop new features
- 高性能，数据局部更新 | High performance, data partial update
- 轻量级，代码简洁，扩展方便 | Lightweight, simple code, easy to extend
- matplotlib风格的API | matplotlib-style API
- 易于使用 | Easy to use

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

## 不是什么 Not Intended to be
- 全能的绘图库 | All-purpose plotting library
- 替代品 | Replacement for other libraries

## 应用场景 | Application Scenarios
- [ ] 插件开发 | Plugin development
- [ ] 科学计算 | Scientific computing
- [ ] 数据分析 | Data analysis
- [ ] 金融图表 | Financial charts

## 命名&接口规则 Naming & Interface Rules
- Drawable类型使用options对象进行配置 | Drawable types use options objects for configuration
- 非Drawable类型使用非options对象进行配置 | Non-drawable types use non-options objects for configuration
- 函数/类等命名使用matplotlib-python风格 | Function/class names use matplotlib-python style
    - 类名使用大驼峰命名法 | Class names use Camel case
    - 函数名使用下划线命名法 | Function names use underscore case
    - 常量名、枚举值使用全大写 | Constant names, enum values use upper case
    - 目录/文件名使用全小写 | Directory/file names use lower case

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

## 安装 | Installation
你可以使用npm安装mchart.js:

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
