/**
 * 判断传入数据是不是有效数据
 * 有效数据：被类型转换后为true的值 不包括`{},[]` 但包括0
 * 一个数组或对象只要含有一个有效数据都被判断为有效数据
 * @param {any} value 判断的值
 * @returns {boolean}
 */
export default function isEmpty(value) {
    if (value == null) return true;

    if (typeof value === "object") {
        if (Array.isArray(value)) {
            if (value.length === 0) {
                return true;
            } else {
                for (const item of value) {
                    if (isEmpty(item)) {
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
                    if (isEmpty(value[key])) {
                        return false;
                    }
                }
                return true;
            }
        }
    } else {
        if (value == 0) {
            return false;
        } else {
            return value ? true : false;
        }
    }
}
