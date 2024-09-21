function hasKey<T extends object>(obj: T, key: PropertyKey): key is keyof T {
    return key in obj;
}

function isObject(item: any): item is object {
    return item && typeof item === 'object' && !Array.isArray(item);
}

// TODO: TEST
function nested_merge<T extends object>(target: T, source: Partial<T>): T {
    const result: T = { ...target };
    
    for (const key in source) {
        if (hasKey(source, key)) {
            const sourceValue = source[key];
            
            if (hasKey(target, key) && isObject(sourceValue) && isObject(target[key])) {
                result[key] = nested_merge(target[key] as object, sourceValue as object) as T[Extract<keyof T, string>];
            } else if (sourceValue !== undefined) {
                result[key] = sourceValue as T[Extract<keyof T, string>];
            }
        }
    }
    
    return result;
}

export { nested_merge };