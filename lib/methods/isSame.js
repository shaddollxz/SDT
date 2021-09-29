/**
 * 判断两个值是否相等 (无法判断set是否相同)
 * @param {any} F 对比的值
 * @param {any} S 对比的值
 * @param {boolean} ToopDeep 是否比较不可遍历对象 包含symbol做键的obj
 * @returns boolen
 */
export default function isSame(F, S, TooDeep = false) {
    if (F === S) return true;
    if (Number.isNaN(F) && Number.isNaN(S)) return true;

    if (typeof F === "symbol") {
        if (F.toString() === S.toString()) {
            return true;
        } else {
            return false;
        }
    }

    if (typeof F === "object") {
        const Fkeys = TooDeep ? Reflect.ownKeys(F) : Object.keys(F);
        const Skeys = TooDeep ? Reflect.ownKeys(S) : Object.keys(S);
        if (Fkeys.length != Skeys.length) return false;

        for (const key of Fkeys) {
            if (Skeys.includes(key)) {
                //? 如果是正则表达式以外的对象 都能递归该方法判断
                if (F[key] instanceof RegExp) {
                    if (!(F[key].source === S[key].source)) {
                        return false;
                    }
                } else if (!isSame(F[key], S[key])) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}
