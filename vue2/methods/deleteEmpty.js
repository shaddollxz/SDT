import isEmpty from "./isEmpty.js";
/**
 * 把数组或对象中的无效数据删去
 * 无效数据：被类型转换后为false的值 包括`{},[]` 但不包括0
 * 如果数组或对象中只有无效数据，该数组或对象也被判断为无效数据
 * @param {object} value 要去除无效数据的数组或对象
 * @returns 去除后的数据
 */
export default function deleteEmpty(value) {
    if (typeof value != "object") throw new TypeError("应该为对象或数组");

    if (Array.isArray(value)) {
        const result = [];
        value.forEach((item) => {
            if (!isEmpty(item)) {
                if (typeof item != "object") {
                    result.push(item);
                } else {
                    result.push(deleteEmpty(item));
                }
            }
        });
        return result;
    } else {
        const result = {};
        for (const key in value) {
            if (!isEmpty(value[key])) {
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
