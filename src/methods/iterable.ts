import type { Values } from "../utils/typings";
/**
 * 给对象设置迭代器，第二个参数是用来设置迭代顺序的sort函数
 * 该函数还实现了断言，如果设置了迭代器的对象要在其它作用域迭代，再次使用一次该函数
 */
function iterable<T extends object>(obj: T): asserts obj is T & Iterable<Values<T>>;
function iterable<T extends object>(
    obj: T,
    sortFunc: (a: string, b: string) => number
): asserts obj is T & Iterable<Values<T>>;
function iterable<T extends object>(
    obj: T,
    sortFunc?: (a: string, b: string) => number
): asserts obj is T & Iterable<Values<T>> {
    if (obj[Symbol.iterator]) return;

    Object.defineProperty(obj, Symbol.iterator, {
        value: function (this: T): Iterator<Values<T>, undefined> {
            const keys = sortFunc ? Object.keys(this).sort(sortFunc) : Object.keys(this);
            let count = 0;

            return {
                next: () => {
                    if (count < keys.length) {
                        return { done: false, value: this[keys[count]] };
                    } else {
                        return { done: true, value: undefined };
                    }
                },
                return() {
                    return { done: true, value: undefined };
                },
                throw() {
                    throw { done: true, value: undefined };
                },
            };
        }.bind(obj),
        writable: false,
        enumerable: false,
        configurable: false,
    });
}

export default iterable;
