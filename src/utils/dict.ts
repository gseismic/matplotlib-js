
// 深度比较两个对象是否相等 | Deeply compare two objects for equality
function deepEqual(obj1: any, obj2: any): boolean {
    // 如果两个值是同一个引用，直接返回true
    if (obj1 === obj2) {
        return true;
    }

    // 如果两个值的类型不同，或者其中一个是null，直接返回false
    if (typeof obj1 !== typeof obj2 || obj1 === null || obj2 === null) {
        return false;
    }

    // 如果是数组，比较每个元素
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (let i = 0; i < obj1.length; i++) {
            if (!deepEqual(obj1[i], obj2[i])) {
                return false;
            }
        }
        return true;
    }

    // 如果是对象，比较每个键和值
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        // 如果键的数量不同，返回false
        if (keys1.length !== keys2.length) {
            return false;
        }

        // 递归比较每个键的值
        for (let key of keys1) {
            if (!obj2.hasOwnProperty(key) || !deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
    }

    // 对于其他类型（如字符串、数字等），直接比较值
    return false;
}

function isObject(obj: any): boolean {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

function deepMerge(target: { [key: string]: any }, source: { [key: string]: any }): any {
    // 检查 target 和 source 是否为字典（对象），如果不是则抛出错误
    if (!isObject(target) || !isObject(source)) {
        throw new Error('Both target and source must be objects');
    }

    // 遍历 source 的键值对
    for (let key of Object.keys(source)) {
        const sourceValue = source[key];
        const targetValue = target[key];

        // 如果 sourceValue 是对象且不是数组，则递归合并
        if (isObject(sourceValue)) {
            // 如果 targetValue 不是对象，初始化为空对象
            if (!isObject(targetValue)) {
                target[key] = {};
            }
            target[key] = deepMerge(target[key], sourceValue);
        } else {
            // 否则直接覆盖 target 的值，包括数组和基本类型
            target[key] = sourceValue;
        }
    }

    return target;
}

export { isObject, deepEqual, deepMerge };