import { isRegExp } from "../utils/typeCheck";

/**
 * 不通过修改内存地址将一个对象或数组替换为另一个对象或数组
 * 在需要重写`const`定义的对象或在vue里需要改写对象或数组时有用
 */
export default function replaceObj<T extends Object>(old: T, ...news: T[]) {
    if (isRegExp(old)) throw "不能替换正则对象";

    if (Array.isArray(old)) {
        old.length = 0;
        news.flat(2).forEach((value) => {
            old.push(value);
        });
    } else {
        for (const key in old) {
            delete old[key];
        }
        Object.assign(old, ...news);
    }
}
