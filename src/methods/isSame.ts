import { isRegExp } from "../utils/typeCheck";

/**
 * 判断两个值是否相等 (无法判断set,map是否相同)
 * @param F 对比的值
 * @param S 对比的值
 * @param deep 是否比较不可遍历对象 如symbol做键的属性
 * @returns boolen
 */
export default function isSame(F: unknown, S: unknown, deep = false): boolean {
    if (F === S) return true;
    if (Number.isNaN(F) && Number.isNaN(S)) return true;

    //? 到这里就说明都是对象了
    if (isRegExp(F) && isRegExp(S)) {
        if (!(F.source === S.source)) return false;
    }

    let FF = F as object,
        SS = S as object;

    const Fkeys = deep ? Reflect.ownKeys(FF) : Object.keys(FF);
    const Skeys = deep ? Reflect.ownKeys(SS) : Object.keys(SS);
    if (Fkeys.length != Skeys.length) return false;

    for (const key of Fkeys) {
        if (!Skeys.includes(key)) return false;
        if (!isSame(FF[key], SS[key])) {
            return false;
        }
    }
    return true;
}
