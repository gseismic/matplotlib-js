import { Scaler, LinearScaler, LogScaler } from "../src/core/scaler/index";

// npx tsc test_scaler.ts && node test_scaler.js
// 使用示例
const linearScaler = new LinearScaler(0, 100);
console.log(linearScaler.scale(5, 10));

const logScaler = new LogScaler(1, 1000);
console.log(logScaler.scale(4, 40));