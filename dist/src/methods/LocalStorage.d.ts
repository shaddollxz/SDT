import type { Precision } from "./SDDate";
declare const _localStorage: unique symbol;
/**
 * localStorage的封装
 * 支持直接放入读取对象元素 支持定义有时间限制的localStorage
 * 该类为单例模式
 */
export default class LocalStorage {
    private [_localStorage];
    constructor();
    clear(): void;
    removeItem(key: string): void;
    setItem(key: string, value: unknown): void;
    setLimitItem(key: string, value: unknown, limit: number, precision: Precision): void;
    getItem(key: string): any;
    get keys(): string[];
}
export {};
