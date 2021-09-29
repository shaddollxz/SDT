/**
 * 有着被限制长度的数组
 * 重写了`push unshift splice`方法
 */
export default class LimitArray extends Array {
    constructor(length) {
        super();
        this.limit = length;
    }
    push(item) {
        super.push(item);
        if (this.length > this.limit) {
            this.shift();
        }
    }
    unshift(item) {
        super.unshift(item);
        if (this.length > this.limit) {
            this.length = this.limit;
        }
    }
    splice(...arg) {
        const result = super.splice(...arg);
        if (this.length > this.limit) {
            this.length = this.limit;
        }
        return result;
    }
}
