import SingletonConstructor from "./SingletonConstructor.js";
import SDDate from "./SDDate.js";
/**
 * 包装一个localStorage
 * 该类只会有一个实例化对象
 * 实例化时检测浏览器是否支持locaStorage
 * 包装了getItem setItem removeItem
 * 新增了keys属性 setLimitTime方法
 */
export default class LocalStorage extends SingletonConstructor {
    constructor() {
        super(function () {
            //? 检测localStorage是否可用
            try {
                var x = "__storage_test__";
                window.localStorage.setItem(x, x);
                window.localStorage.removeItem(x);
                this.localStorage = window.localStorage;
            } catch (e) {
                return e;
            }
        });
    }
    setItem(key, value) {
        this.localStorage.setItem(key, JSON.stringify(value));
    }
    getItem(key) {
        const result = JSON.parse(this.localStorage.getItem(key));
        if (Array.isArray(result)) {
            const end = result[result.length - 1];
            if ("__LIMIT__" in end) {
                if (end.__LIMIT__ < Date.now()) {
                    this.remove(key);
                    return null;
                } else {
                    return result[0];
                }
            } else {
                return result;
            }
        } else {
            return result;
        }
    }
    removeItem(key) {
        try {
            this.localStorage.removeItem(key);
            return true;
        } catch (e) {
            return e;
        }
    }
    clear() {
        this.localStorage.clear();
    }
    /**
     * 设置一个会过期的本地存储
     * @param {string} key 键
     * @param {any} value 值
     * @param {Array} delay 经过多长时间过期 格式为["时间长度","时间单位"]
     */
    setLimitTime(key, value, delay) {
        this.localStorage.setItem(
            key,
            JSON.stringify([value, { __LIMIT__: new SDDate().add(delay[0], delay[1]).getTime() }])
        );
    }
    removeLimitTime(key) {
        const value = this.get(key);
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    /** 删除原来的window.localStorage 将该实例注入window */
    inject() {
        delete window.localStorage;
        window.localStorage = this;
    }

    get keys() {
        return Object.keys(this.localStorage);
    }
}
