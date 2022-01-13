import type { Precision } from "./SDDate";
import type { StringKeys } from "../utils/typings";
declare const _localStorage: unique symbol;
/**
 * localStorage的封装
 * 支持直接放入读取对象元素 支持定义有时间限制的localStorage
 * 该类为单例模式
 */
export default class LocalStorage<T extends Record<string, any> = any> {
    private [_localStorage];
    constructor();
    clear(): void;
    removeItem(key: StringKeys<T>): void;
    setItem<K extends StringKeys<T>>(key: K, value: T[K]): void;
    setLimitItem<K extends StringKeys<T>>(key: K, value: T[K], limit: number, precision: Precision): void;
    getItem<K extends StringKeys<T>>(key: K): T[K] | null;
    get keys(): string[];
}
export {};
