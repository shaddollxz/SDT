import type { Values } from "../typings/utils";
/**
 * 给对象设置迭代器，第二个参数是用来设置迭代顺序的sort函数
 * 该函数还实现了断言，如果设置了迭代器的对象要在其它作用域迭代，再次使用一次该函数
 */
declare function iterable<T extends object>(obj: T): asserts obj is T & Iterable<Values<T>>;
declare function iterable<T extends object>(obj: T, sortFunc: (a: string, b: string) => number): asserts obj is T & Iterable<Values<T>>;
export default iterable;
