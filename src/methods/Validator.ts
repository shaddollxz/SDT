import isEmpty from "./isEmpty";

let instancePoor: Validator[] | null = null; // 因为可能用不上对象池，所以初始化为null 当需要放入实例时再初始化为数组

export namespace Validator {
    export type CheckRule = [() => boolean, string];
    export type CheckFunc = ((data: string) => boolean) | RegExp;
}
/**
 * 对包装数据进行检查
 * 该实例方法均支持链式调用
 * 内置了不为空，邮箱检查，不含空格，密码等级限制，长度限制六个检测函数
 */
export default class Validator {
    checkArr!: Validator.CheckRule[];
    data!: string;
    constructor(data: string | number) {
        if (instancePoor?.length) {
            let instance = instancePoor.pop()!;
            instance.data = "" + data;
            instance.checkArr = [];
            return instance;
        }
        this.data = "" + data;
        this.checkArr = [];
    }
    /**
     * 开始检测 并以数组形式抛出第一个错误
     * @example
     * try{
     *    validator.check()
     * } catch (e){
     *    console.log(e.errorMsg[0])
     * }
     */
    check() {
        this.checkArr.reduce((pre, cur) => {
            if (!cur[0]()) {
                throw { errorMsg: [cur[1]] };
            }
            return null;
        }, null);
    }
    /**
     * 开始检测 并抛出所有错误
     */
    checkAll() {
        const errorMsgs: string[] = [];
        this.checkArr.reduce((pre, cur) => {
            if (!cur[0]()) {
                errorMsgs.push(cur[1]);
            }
            return null;
        }, null);
        if (errorMsgs.length) {
            throw { errorMsg: errorMsgs };
        }
    }
    /**
     * 设置前一个检测函数抛出的错误信息
     * @param error 前一个检测函数抛出的错误信息
     */
    errorMsg(error: string) {
        this.checkArr[this.checkArr.length - 1][1] = error;
        return this;
    }
    /**
     * 当该检测不再使用后调用，将该实例放入实例池中，下次实例化时重新复用
     * 在进行大量不重复检查时使用
     */
    end() {
        if (!instancePoor) instancePoor = [];
        instancePoor.push(this);
    }
    /**
     * 添加一个自定义的错误检查函数
     * @param checkFunc 检测函数或正则 该函数必须返回一个布尔值表示检测是否通过
     * @param errorMsg 错误信息
     */
    addCheck(checkFunc: Validator.CheckFunc, errorMsg: string) {
        if (typeof checkFunc == "function") {
            this.checkArr.push([() => checkFunc(this.data), errorMsg]);
        } else {
            this.checkArr.push([() => checkFunc.test(this.data), errorMsg]);
        }
        return this;
    }

    /**
     * 限制密码的等级 最多五级 默认有五级才能通过检测
     * 要求长度大于10 有特殊符号 有数字 有小写字母 有大写字母
     * 不能长度小于5 纯数字或字母
     * @param level 密码的最低等级
     */
    passWordLevel(level = 3) {
        this.checkArr.push([
            () => {
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
            },
            "密码强度不足",
        ]);
        return this;
    }
    /**
     * 不能含空格
     */
    noSpace() {
        this.checkArr.push([() => !/\s/.test(this.data), "不能含有空格"]);
        return this;
    }
    /**
     * 验证邮箱格式
     */
    isEmail() {
        this.checkArr.push([
            () => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.data),
            "邮箱格式不正确",
        ]);
        return this;
    }
    /**
     * 检测数据是否为无效数据 包括`[] {} ""`但是不包括0
     */
    notEmpty(isCheckZero = false) {
        this.checkArr.push([() => !isEmpty(this.data, isCheckZero), "不能为空"]);
        return this;
    }
    /**
     * 检测数据是否超过最大长度 只能检测String Array Number Object四种类型
     */
    maxLength(len: number) {
        this.checkArr.push([() => !(this.data.length > len), "长度不足"]);
        return this;
    }
    /**
     * 检测数据是否小于最短长度 只能检测String Array Number Object四种类型
     */
    minLength(len: number) {
        this.checkArr.push([() => !(this.data.length < len), "长度不足"]);
        return this;
    }
}
