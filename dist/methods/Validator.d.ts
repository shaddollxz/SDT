declare namespace Validator {
    type CheckRule = [() => boolean, string];
    type CheckFunc = ((data: string) => boolean) | RegExp;
}
/**
 * 对包装数据进行检查
 * 该实例方法均支持链式调用
 * 内置了不为空，邮箱检查，不含空格，密码等级限制，长度限制六个检测函数
 */
declare class Validator {
    checkArr: Validator.CheckRule[];
    data: string;
    constructor(data: string | number);
    /**
     * 开始检测 并以数组形式抛出第一个错误
     * @example
     * try{
     *    validator.check()
     * } catch (e){
     *    console.log(e.errorMsg[0])
     * }
     */
    check(): void;
    /**
     * 开始检测 并抛出所有错误
     */
    checkAll(): void;
    /**
     * 设置前一个检测函数抛出的错误信息
     * @param error 前一个检测函数抛出的错误信息
     */
    errorMsg(error: string): this;
    /**
     * 当该检测不再使用后调用，将该实例放入实例池中，下次实例化时重新复用
     * 在进行大量不重复检查时使用
     */
    end(): void;
    /**
     * 添加一个自定义的错误检查函数
     * @param checkFunc 检测函数或正则 该函数必须返回一个布尔值表示检测是否通过
     * @param errorMsg 错误信息
     */
    addCheck(checkFunc: Validator.CheckFunc, errorMsg: string): this;
    /**
     * 限制密码的等级 最多五级 默认有五级才能通过检测
     * 要求长度大于10 有特殊符号 有数字 有小写字母 有大写字母
     * 不能长度小于5 纯数字或字母
     * @param level 密码的最低等级
     */
    passWordLevel(level?: number): this;
    /**
     * 不能含空格
     */
    noSpace(): this;
    /**
     * 验证邮箱格式
     */
    isEmail(): this;
    /**
     * 检测数据是否为无效数据 包括`[] {} ""`但是不包括0
     */
    notEmpty(isCheckZero?: boolean): this;
    /**
     * 检测数据是否超过最大长度 只能检测String Array Number Object四种类型
     */
    maxLength(len: number): this;
    /**
     * 检测数据是否小于最短长度 只能检测String Array Number Object四种类型
     */
    minLength(len: number): this;
}
export default Validator;
