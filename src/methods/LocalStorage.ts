import SDDate from "./SDDate";
import type { Precision } from "./SDDate";
import { isBaseType, isObject } from "../utils/typeCheck";

type LimitItem = [any, { __LIMIT__: number }];
function isLimitItem(arg: unknown): arg is LimitItem {
    if (Array.isArray(arg) && isObject(arg[1]) && "__LIMIT__" in arg[1]) {
        return true;
    } else {
        return false;
    }
}

let cache: LocalStorage | null = null;
const _localStorage = Symbol("_localStorage");

/**
 * localStorage的封装
 * 支持直接放入读取对象元素 支持定义有时间限制的localStorage
 * 该类为单例模式
 */
export default class LocalStorage<T extends Record<string, any> = any> {
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
        if (isBaseType(value)) {
            this[_localStorage].setItem(key, value as string);
        } else {
            this[_localStorage].setItem(key, JSON.stringify(value));
        }
    }
    setLimitItem<K extends StringKeys<T>>(key: K, value: T[K], limit: number, precision: Precision) {
        this[_localStorage].setItem(
            key,
            JSON.stringify([value, { __LIMIT__: new SDDate().add(limit, precision).getTime() }] as LimitItem)
        );
    }

    getItem<K extends StringKeys<T>>(key: K): T[K] | null {
        let item = JSON.parse(this[_localStorage].getItem(key)!);

        if (!isLimitItem(item)) return item;

        if (item[1].__LIMIT__ < Date.now()) {
            this.removeItem(key);
            return null;
        } else {
            return item[0];
        }
    }

    get keys() {
        return Object.keys(this[_localStorage]);
    }
}
