import isEmpty from "./isEmpty.js";

export default class Validator {
    constructor(data) {
        this.data = data;
        this.checkArr = [];
    }
    check() {
        this.checkArr.reduceRight((pre, cur) => {
            if (!cur[0]()) {
                throw { errorMsg: [cur[1]] };
            }
        }, null);
    }
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
    errorMsg(error) {
        this.checkArr[this.checkArr.length - 1][1] = error;
        return this;
    }

    addCheck(checkFunc, errorMsg) {
        this.checkArr.push([() => checkFunc(this.data), errorMsg]);
        return this;
    }

    regex(regex) {
        if (typeof regex == "string") {
            regex = new RegExp(regex);
        }
        this.checkArr.push([() => regex.test(this.data), "正则校验失败"]);
        return this;
    }

    notEmpty() {
        this.checkArr.push([() => !isEmpty(this.data), "不能为空"]);
        return this;
    }
    maxLength(len) {
        let data = typeof this.data == "number" ? this.data.toString() : this.data;
        if (data.length) {
            this.checkArr.push([() => !(this.data.length > len), "长度不足"]);
            return this;
        } else {
            throw "该数据不是字符串,数字或数组";
        }
    }
    minLength(len) {
        let data = typeof this.data == "number" ? this.data.toString() : this.data;
        if (data.length) {
            this.checkArr.push([() => !(this.data.length < len), "长度不足"]);
            return this;
        } else {
            throw "该数据不是字符串,数字或数组";
        }
    }
}
