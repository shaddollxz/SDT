/**
 * 判断传入对象或数组是否为空
 * 嵌套的空数组和空对象判断为空
 * @param value 判断的值
 * @param isCheckZero 是否把零判断为空
 */
export function isEmpty(value: unknown, isCheckZero: boolean = false) {
    if (typeof value !== "object" || value == null) {
        if (value === "") return true;
        return value == 0 ? (isCheckZero ? true : false) : !value;
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return true;
        } else {
            for (const item of value) {
                if (!isEmpty(item, isCheckZero)) {
                    return false;
                }
            }
            return true;
        }
    } else {
        if (Object.keys(value).length === 0) {
            return true;
        } else {
            for (const key in value) {
                if (!isEmpty(value[key], isCheckZero)) {
                    return false;
                }
            }
            return true;
        }
    }
}

/**
 * 检测对象或数组是否含有无效数据
 * @param value 检测的数据
 * @param isCheckZero 是否将零作为无效数据
 */
export function havaEmpty(value: object, isCheckZero = false) {
    if (Array.isArray(value)) {
        for (const item of value) {
            if (isEmpty(item, isCheckZero)) {
                return true;
            }
        }
        return false;
    } else {
        for (const key in value) {
            if (isEmpty(value[key], isCheckZero)) {
                return true;
            }
        }
        return false;
    }
}

/**
 * 把数组或对象中的无效数据删去
 * 无效数据：被类型转换后为false的值 包括`{},[]`
 * 如果数组或对象中只有无效数据，该数组或对象也被判断为无效数据
 * @param value 要去除无效数据的数组或对象
 * @param isCheckZero 是否将0作为无效数据
 * @returns 去除后的数据
 */
export function deleteEmpty(value: object, isCheckZero = false): object {
    if (Array.isArray(value)) {
        const result: any = [];
        value.forEach((item) => {
            if (!isEmpty(item, isCheckZero)) {
                if (typeof item != "object") {
                    result.push(item);
                } else {
                    result.push(deleteEmpty(item));
                }
            }
        });
        return result;
    } else {
        const result = Object.create(Object.getPrototypeOf(value));
        for (const key in value) {
            if (!isEmpty(value[key], isCheckZero)) {
                if (typeof value[key] != "object") {
                    result[key] = value[key];
                } else {
                    result[key] = deleteEmpty(value[key]);
                }
            }
        }
        return result;
    }
}
