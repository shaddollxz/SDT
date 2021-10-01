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
        this.checkArr.reduce((pre, cur) => {
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
        this.checkArr.reduce((pre, cur) => {
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
        if (error) {
            this.checkArr[this.checkArr.length - 1][1] = error;
        }
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
     * 限制密码的等级 最多五级 默认有五级才能通过检测
     * 要求长度大于10 有特殊符号 有数字 有小写字母 有大写字母
     * 不能长度小于5 纯数字或字母
     * @param {Number} level 密码的最低等级
     */
    passWordLevel(level = 3) {
        if (this.data.length < 5) return false;
        const exclude = [/^\d+$/, /^[a-z]+$/, /^[A-Z]$/];
        for (const check of exclude) {
            if (check.test(this.data)) {
                return false;
            }
        }

        let baseLevel = 0;
        this.data.length > 10 ? baseLevel++ : baseLevel--;
        const include = [/\W/, /\d/, /[a-z]/, /[A-Z]/];
        for (const check of include) {
            if (check.test(this.data)) {
                baseLevel++;
            }
        }
        return baseLevel >= level ? true : false;
    }
    /**
     * 不能含空格
     */
    noSpace() {
        this.checkArr.push([() => !/\s/.test(this.data), "不能含有空格"]);
    }
    /**
     * 验证邮箱格式
     */
    isEmail() {
        this.checkArr.push([
            () => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.data),
            "邮箱格式不正确",
        ]);
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
