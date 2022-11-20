/**
 * 深复制
 * @param o 要被复制的对象或数组
 * @returns 新的对象
 */
export default function deepClone<T extends object>(o: T, cache?: WeakMap<object, any>): T;
