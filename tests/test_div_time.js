const iterations = 1000000;
let result;

// 测试乘法
console.time("Multiplication");
for (let i = 0; i < iterations; i++) {
    result = i * 2.0;
}
console.timeEnd("Multiplication");

// 测试除法
console.time("Division");
for (let i = 1; i <= iterations; i++) { // 注意除法不能以0为除数
    result = i / 2.0;
}
console.timeEnd("Division");
