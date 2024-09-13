# finchart.js
finchart.js是一个用于创建金融图表的JavaScript库。它旨在简单易用，专注于性能和灵活性。
finchart.js is a JavaScript library for creating financial charts. It is designed to be simple and easy to use, with a focus on performance and flexibility.

## 特性 | Features

- 折线图 Line Chart
- 柱状图 Bar Chart
- 散点图 Scatter Plot
- 蜡烛图 Candlestick Chart

## 安装 | Installation
你可以使用npm安装finchart.js:

```bash
cd finchart.js

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
import { Figure } from 'finchart.js';

const figure = new Figure();
```
