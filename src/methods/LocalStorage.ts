import SDDate from "./SDDate";
import type { Precision } from "./SDDate";
import type { StringKeys } from "../utils/typings";
import { isNull, isRegExp } from "../utils/typeCheck";

type AllowType = boolean | string | number | bigint | object | null | undefined;
const enum Type {
    string,
    numberAndBoolen,
    bigint,
    object,
    null,
    undefind,
    regexp,
}
type CacheItem = [any, { __LIMIT__?: number; __TYPE__: Type }];

function isCacheItem(data: unknown): data is CacheItem {
    if (Array.isArray(data) && typeof data[1].__TYPT__ == "number") {
        return true;
    } else {
        return false;
    }
}
function pack(data: unknown): CacheItem {
    switch (typeof data) {
        case "string":
            return [data, { __TYPE__: Type.string }];
        case "number":
        case "boolean":
            return [data, { __TYPE__: Type.numberAndBoolen }];
        case "object":
            if (isNull(data)) {
                return ["null", { __TYPE__: Type.null }];
            } else if (isRegExp(data)) {
                const { source, flags } = data;
                return [{ source, flags }, { __TYPE__: Type.regexp }];
            } else {
                return [data, { __TYPE__: Type.object }];
            }
        case "undefined":
            return ["void 0", { __TYPE__: Type.undefind }];
        case "bigint":
            return [data, { __TYPE__: Type.bigint }];
    }
    throw "该类型不能被存储";
}
function unpack(data: CacheItem): AllowType {
    const flag = data[1].__TYPE__;
    switch (flag) {
        case Type.string:
            return data[0] + "";
        case Type.numberAndBoolen:
            return data[0];
        case Type.object:
            return data[0];
        case Type.null:
            return null;
        case Type.undefind:
            return undefined;
        case Type.bigint:
            return BigInt(data[0]);
        case Type.regexp:
            return new RegExp(data[0].source, data[0].flages);
    }
}
function setLimit(data: CacheItem, limit: number, precision: Precision): CacheItem {
    data[1].__LIMIT__ = new SDDate().add(limit, precision).getTime();
    return data;
}

// 单例模式
let cache: LocalStorage | null = null;
const _localStorage = Symbol("_localStorage");

/**
 * localStorage的封装
 * 支持直接放入读取对象元素 支持定义有时间限制的localStorage
 * 该类为单例模式
 */
export default class LocalStorage<T extends Record<string, AllowType> = any> {
    private [_localStorage]!: Storage;
    constructor() {
        if (cache) return cache;
        this[_localStorage] = window.localStorage;
        cache = this;
    }

    clear() {
        this[_localStorage].clear();
    }

    removeItem(key: StringKeys<T>) {
        this[_localStorage].removeItem(key);
    }

    setItem<K extends StringKeys<T>>(key: K, value: T[K]) {
        this[_localStorage].setItem(key, JSON.stringify(pack(value)));
    }
    setLimitItem<K extends StringKeys<T>>(key: K, value: T[K], limit: number, precision: Precision) {
        this[_localStorage].setItem(key, JSON.stringify(setLimit(pack(value), limit, precision)));
    }

    private readCache(key: string): unknown {
        try {
            return JSON.parse(this[_localStorage].getItem(key)!);
        } catch {
            return this[_localStorage].getItem(key); // 如果有错误说明解析到了字符串
        }
    }
    getItem<K extends StringKeys<T>>(key: K): T[K] | null {
        let data = this.readCache(key);

        if (isCacheItem(data)) {
            if (data[1].__LIMIT__ && data[1].__LIMIT__ < Date.now()) {
                this.removeItem(key);
                return null;
            } else {
                return unpack(data) as T[K] | null;
            }
        } else {
            return data as T[K] | null;
        }
    }

    refresh<K extends StringKeys<T>>(key: K, limit: number, precision: Precision): T[K] | null {
        let data = this.readCache(key);
        if (isCacheItem(data)) {
            data[1].__LIMIT__ = new SDDate().add(limit, precision).getTime();
            return unpack(data) as T[K] | null;
        } else {
            if (data == null) {
                return null;
            } else {
                // @ts-ignore
                this.setLimitItem(key, data, limit, precision);
                // @ts-ignore
                return data;
            }
        }
    }

    get keys() {
        return Object.keys(this[_localStorage]);
    }
}
