import type { Precision } from "./SDDate";
import type { UpdatePropertiesOptions } from "./updateProperties";
import type { StringKeys, PickByType } from "../typings/utils";
declare type AllowType = boolean | string | number | bigint | object | null | undefined | RegExp;
declare type AllowKeys<T extends object> = StringKeys<PickByType<T, AllowType>>;
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
    removeItem(key: AllowKeys<T>): void;
    setItem<K extends AllowKeys<T>>(key: K, value: T[K]): void;
    setLimitItem<K extends AllowKeys<T>>(key: K, value: T[K], limit: number, precision: Precision): void;
    updateObjectItem<K extends StringKeys<PickByType<T, object>>>(key: K, updateOption: UpdatePropertiesOptions<T[K]>): T[Extract<keyof PickByType<T, AllowType>, string>] | null;
    private readCache;
    getItem<K extends AllowKeys<T>>(key: K): T[K] | null;
    refresh<K extends AllowKeys<T>>(key: K, limit: number, precision: Precision): T[K] | null;
    get keys(): string[];
}
export {};
