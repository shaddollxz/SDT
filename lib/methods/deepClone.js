/**
 * 深复制
 * @param {object} o 要被复制的对象或数组
 * @returns 新的对象
 */
export default function deepClone(o, catche = new WeakMap()) {
    if (typeof o != "object") throw new TypeError("必须是对象或数组");
    let result = Array.isArray(o) ? [] : Object.create(null);

    if (catche.get(o)) {
        return catche.get(o);
    } else {
        catche.set(o, result); //! 将当前对象及克隆到的结果缓存，如果以后在缓存中找到当前对象，说明发生了循环引用

        for (const key of Object.keys(o)) {
            if (typeof o[key] == "object") {
                result[key] = deepClone(o[key], catche);
            } else {
                result[key] = o[key];
            }
        }
        Object.setPrototypeOf(result, Object.getPrototypeOf(o)); //! 将克隆对象的原型放上去
        return result;
    }
}
