"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/core/scaler/index");
// 使用示例
var linearScaler = new index_1.LinearScaler(0, 100);
console.log(linearScaler.scale(5, 10));
var logScaler = new index_1.LogScaler(1, 1000);
console.log(logScaler.scale(4, 40));
