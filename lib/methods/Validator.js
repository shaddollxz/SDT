import isEmpty from "./isEmpty.js";

/**
 * 对包装数据进行检查
 * 该实例方法均支持链式调用
 * 内置了不为空和限制长度三个检查函数
 */
export default class Validator {
    constructor(data) {
        this.data = data;
        this.checkArr = [];
    }
    /**
     * 开始检测 并抛出第一个错误
     */
    check() {
        this.checkArr.reduceRight((pre, cur) => {
            if (!cur[0]()) {
                throw { errorMsg: [cur[1]] };
            }
        }, null);
    }
    /**
     * 开始检测 并抛出所有错误
     */
    checkAll() {
        const errorMsgs = [];
        this.checkArr.reduceRight((pre, cur) => {
            if (!cur[0]()) {
                errorMsgs.push(cur[1]);
            }
        }, null);
        if (errorMsgs.length) {
            throw { errorMsg: errorMsgs };
        }
    }
    /**
     * 设置前一个检测函数抛出的错误信息
     * @param {String} error 前一个检测函数抛出的错误信息
     */
    errorMsg(error) {
        this.checkArr[this.checkArr.length - 1][1] = error;
        return this;
    }

    /**
     * 添加一个自定义的错误检查函数
     * @param {Function|Regexp} checkFunc 检测函数或正则 该函数必须返回一个布尔值表示检测是否通过
     * @param {String} errorMsg 错误信息
     */
    addCheck(checkFunc, errorMsg) {
        if (typeof checkFunc == "function") {
            this.checkArr.push([() => checkFunc(this.data), errorMsg]);
        } else if (checkFunc instanceof RegExp) {
            this.checkArr.push([() => checkFunc.test(this.data), errorMsg]);
        }
        return this;
    }

    /**
     * 检测数据是否为无效数据 包括`[] {} ""`但是不包括0
     */
    notEmpty() {
        this.checkArr.push([() => !isEmpty(this.data), "不能为空"]);
        return this;
    }
    /**
     * 检测数据是否超过最大长度 只能检测String Array Number Object四种类型
     * @param {Number} len 最大长度
     */
    maxLength(len) {
        this.checkArr.push([() => !(this.formatData().length > len), "长度不足"]);
        return this;
    }
    /**
     * 检测数据是否小于最短长度 只能检测String Array Number Object四种类型
     * @param {Number} len 最短长度
     */
    minLength(len) {
        this.checkArr.push([() => !(this.formatData().length < len), "长度不足"]);
        return this;
    }
    /**
     * 将包装数据返回为拥有长度的数据类型
     */
    formatData() {
        let data = this.data;
        if (this.data.length == undefined) {
            if (typeof this.data == "number") {
                data = this.data.toString();
            } else if (typeof this.data == "object") {
                data = Object.keys(this.data).length;
            } else {
                throw "该数据不是字符串,数字,数组或对象";
            }
        }
        return data;
    }
}
