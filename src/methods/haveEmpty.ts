import isEmpty from "./isEmpty";

/**
 * 检测对象或数组是否含有无效数据
 * @param value 检测的数据
 * @param isCheckZero 是否将零作为无效数据
 */
export default function havaEmpty(value: object, isCheckZero = false) {
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
