/**
 * 判断传入对象或数组是否为空
 * 嵌套的空数组和空对象判断为空
 * @param value 判断的值
 * @param isCheckZero 是否把零判断为空
 */
export default function isEmpty(value: unknown, isCheckZero: boolean = false) {
    if (typeof value !== "object" || value == null) {
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
