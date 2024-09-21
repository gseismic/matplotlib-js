
import { deepEqual, deepMerge } from "../src/utils/dict";
// npx tsc test_dict.ts && node test_dict.js

// 示例用法
const dict1 = { a: 1, b: { x: 10, y: 20 }, c: [1, 2], d: { nested: { n: 5 } } };
const dict2 = { b: { y: 30, z: 40 }, c: [3, 4], d: { nested: { n: 6 } }, e: 5 };
console.log(dict1);
console.log(dict2);
try {
    const result = deepMerge(dict1, dict2);
    console.log(result);
} catch (error) {
    console.error(error.message);
}