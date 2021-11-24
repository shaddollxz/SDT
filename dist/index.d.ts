import "./components.d";
import type { StyleValue } from "vue";

//#region globalTypes
/**
 * 基础类型
 */
declare type BaseType = number | string | boolean | bigint | symbol | null | undefined;

declare type AddProperty<T extends object, U extends object> = {
    [K in keyof T]: T[K];
} & {
    [L in keyof U]: U[L];
};

/**
 * 返回泛型的value组成的联合类型
 */
declare type ValuesToUnion<T> = T extends { [K in keyof T]: infer U } ? U : never;

/**
 * 将元组转为联合类型
 */
declare type TupleToUnion<T> = T extends Array<infer U> ? U : never;
//#endregion

//#region Message
interface MessageProps {
    text: string;
    duration: number;
    align: "left" | "right" | "center";
    isCanClose: boolean;
    style?: StyleValue;
    type: "default" | "success" | "error";
    onClose?: (el: Element) => void;
}
interface MessageFunc {
    (text: string, options?: Omit<MessageProps, "text">): void;
    success: (text: string, options?: Omit<MessageProps, "type" | "text">) => void;
    error: (text: string, options?: Omit<MessageProps, "type" | "text">) => void;
}
export declare const Message: MessageFunc;
//#endregion

//#region AsyncConstructor
/**
 * 通过继承该类让子类能够异步实例化
 *
 * @example
 * class Test extends AsyncConstructor {
 *      constructor(){
 *          super(async () => { ... })
 *      }
 * }
 * let test = await new Test()
 */
export abstract class AsyncConstructor {
    private then?;
    constructor(asyncArrowFunction: () => Promise<void>);
}
//#endregion

//#region debounce
/**
 * 防抖：在设定时间内多次调用回调时不会执行 超出设定时间后才执行一次
 */
export function debounce(
    callback: (...arg: unknown[]) => unknown,
    delay?: number,
    style?: boolean
): (this: any, ...args: unknown[]) => void;
//#endregion

//#region deepClone
/**
 * 深复制
 * @param o 要被复制的对象或数组
 * @returns 新的对象
 */
export function deepClone(o: object, cache?: WeakMap<object, any>): any;
//#endregion

//#region deleteEmpty
/**
 * 把数组或对象中的无效数据删去
 * 无效数据：被类型转换后为false的值 包括`{},[]`
 * 如果数组或对象中只有无效数据，该数组或对象也被判断为无效数据
 * @param value 要去除无效数据的数组或对象
 * @param isCheckZero 是否将0作为无效数据
 * @returns 去除后的数据
 */
export function deleteEmpty(value: object, isCheckZero?: boolean): object;
//#endregion

//#region isEmpty
/**
 * 判断传入对象或数组是否为空
 * 嵌套的空数组和空对象判断为空
 * @param value 判断的值
 * @param isCheckZero 是否把零判断为空
 */
export function isEmpty(value: unknown, isCheckZero?: boolean): boolean;
//#endregion

//#region isSame
/**
 * 判断两个值是否相等 (无法判断set,map是否相同)
 * @param F 对比的值
 * @param S 对比的值
 * @param deep 是否比较不可遍历对象 如symbol做键的属性
 * @returns boolen
 */
export function isSame(F: unknown, S: unknown, deep?: boolean): boolean;
//#endregion

//#region LocalFiles
interface ConstructorOptions {
    count?: number;
    type?: string[];
    maxSize?: number;
}
declare type ReadType = "readAsArrayBuffer" | "readAsDataURL" | "readAsText";
interface ReadOptions {
    readAs?: ReadType;
    order?: number;
}
declare type ReadResult = string | string[] | ArrayBuffer | ArrayBuffer[] | (string | ArrayBuffer | null)[] | null;
declare const _files: unique symbol;
/**
 * 异步实例化时跳出文件选择框 并根据read方法读取选择的文件
 * @param options 设置选择文件的大小 熟练 后缀
 *
 * @async 该类支持异步实例化
 * @example
 * let files = await new LocalFiles()
 * let result = files.read()
 */
export class LocalFiles extends AsyncConstructor {
    private [_files];
    text: string[];
    dataurl: string[];
    constructor({ count, type, maxSize }?: ConstructorOptions);
    get file(): File | File[];
    get name(): string | string[];
    /**
     * 不传入参数会读取所有文件并返回文件内容的数组
     * 方法会自己推断部分文件的读取返回类型 也能通过options自己设置返回类型
     * @param options 设置读取文件的方式和读取第几个文件
     */
    read(options?: ReadOptions): Promise<ReadResult>;
    /** 获取文件后缀名 根据后缀决定读取方法 */
    protected readType(file: File): ReadType;
}
//#endregion

//#region LocalStorage
declare const _localStorage: unique symbol;
/**
 * localStorage的封装
 * 支持直接放入读取对象元素 支持定义有时间限制的localStorage
 * 该类为单例模式
 */
export class LocalStorage {
    private [_localStorage];
    constructor();
    clear(): void;
    removeItem(key: string): void;
    setItem(key: string, value: unknown): void;
    setLimitItem(key: string, value: unknown, limit: number, precision: Precision): void;
    getItem(key: string): any;
    get keys(): string[];
}
//#endregion

//#region Random
declare type GetStringType = "char" | "lower" | "upper" | "number" | "chinese";
/**
 * 随机数生成器
 * 通过静态方法返回一个指定范围的随机数
 */
export class Random {
    static number(range: [min: number, max: number], precision?: number): number;
    static pick(range: string, len?: number): string;
    static boolean(): boolean;
    static stringAndNumber(len?: number): string;
    /** 获得指定长度的字符串 默认为数字小写字母混合 */
    static string(type: GetStringType | GetStringType[], len?: number): string;
}
//#endregion

//#region removeItem
/**
 * 从数组中删除指定的值
 */
export function removeItem(array: any[], target: any[], pullOrigin?: boolean): any[];
export function removeItem(array: any[], target: any, pullOrigin?: boolean): any[];
//#endregion

//#region replaceObj
/**
 * 不通过修改内存地址将一个对象或数组替换为另一个对象或数组
 * 在需要重写`const`定义的对象或在vue里需要改写对象或数组时有用
 */
export function replaceObj<T extends Object>(old: T, ...news: T[]): void;
//#endregion

//#region SDDate
declare type SDDateConstructorArgs = string | number | Date;
declare type TimeTupl = [string, number];
declare const TimeTableList: readonly ["YYYY", "MM", "W", "DD", "hh", "mm", "ss", "ms"];
declare type Precision = typeof TimeTableList[number];
declare type TimeTable = {
    [key in Precision]: TimeTupl;
} & {
    setYear: (value: number) => TimeTupl;
    setMonth: (value: number) => TimeTupl;
};
/**
 * 对date类的封装 和Date一样实例化
 */
export class SDDate extends Date {
    constructor(args: SDDateConstructorArgs);
    constructor();
    /**
     * 将该时间转换为指定格式的字符串
     * @param formatStr 格式化字符串
     * @param useChinese 是否将月份和周数转换为中文 默认为true
     *
     * @description 可以支持YYYY MM MMM DD HH hh mm ss ms TT W 几种时间类型，MMM指用文字返回月份 hh指用12小时制返回小时
     * @example const time = date.format("/YYYY/-/MM/-/DD/ /HH/:/mm/:/ss/./ms/ /TT/ 周/W/")
     */
    format(formatStr?: string, useChinese?: boolean): string;
    /**
     * 原生getMonth()得到的月份从0开始
     * 这里修改为从1开始
     */
    getmonth(useChinese: boolean): string;
    getmonth(): number;
    /**
     * 在当前时间上加上指定的时间
     * @param timeNumber 加上的时间
     * @param precision 时间的精度 默认为秒
     */
    add(add: number, precision?: Precision): SDDate;
    /**
     * 在当前时间上减去指定的时间
     * @param timeNumber 减去的时间
     * @param precision 时间的精度 默认为秒
     */
    sub(sub: number, precision?: Precision): SDDate;
    /**
     * 获得输入时间到实例时间的时间差
     * 输入时间必须能被Date实例化
     */
    difference(time: SDDateConstructorArgs, precision?: Precision, formatStr?: string): string;
    /**
     * 获得两个时间的时间差
     * 输入时间必须能被Date实例化
     */
    static difference(
        timeOne: SDDateConstructorArgs,
        timeTwo: SDDateConstructorArgs,
        precision?: Precision,
        formatStr?: string
    ): string;
    /**
     * 获得当前时间点的格式化后字符串
     * @param formatStr 格式化字符串
     * @param useChinese 是否将月份和周数转换为中文 默认为true
     */
    static formatNow(formatStr?: string, useChinese?: boolean): string;
    /**
     * 时间精度对应的表
     * 通过setYear setMonth方法修改时间精度的一年和一月的长度
     */
    static timeTable: TimeTable;
}
//#endregion

//#region SDIDB
interface IndexSetting {
    keyPath: string;
    name?: string;
    unique?: boolean;
    multiEntry?: boolean;
}
interface IndexSetting2 {
    keyPath: string[];
    name: string;
    unique?: boolean;
    multiEntry?: boolean;
}
interface TableSetting {
    keyPath?: string;
    index?: (IndexSetting | IndexSetting2)[];
}
/**
 * indexDB的封装 该类支持异步实例化
 * @example
 * const db = await new SDIDB("test")
 * const table = db.useTabel("table")
 * let a = await table.find("a")
 */
export class SDIDB extends AsyncConstructor {
    name: string;
    protected _version: number;
    protected _tableList: string[];
    constructor(name: string);
    /**
     * 打开或升级数据库
     * 打开时不需要参数
     * 升级只有两种情况，新建表或删除表
     */
    private openDB;
    /**
     * 创建新的表
     * 只有不设置主键和索引时才能直接放入对象以外的数据
     * 如果储存的是数组 只有设置为索引才能通过数组内元素直接查找
     */
    createTable(tableName: string, settings?: TableSetting): Promise<IDBTable>;
    /**
     * 返回一个现有的表，并获取表结构
     */
    useTable(tableName: string): Promise<IDBTable>;
    /**
     * 删除指定的表
     */
    removeTable(tableName: string): Promise<this>;
    /**
     * 删库跑路
     * @param dbname 数据库名字
     */
    static deleteDB(dbname: string): void;
    get version(): number;
    get tableList(): string[];
}
interface FindOptions {
    query: IDBValidKey | IDBKeyRange;
    keyPath?: string;
    count?: number;
}
interface UpdateOptions {
    $set?: object;
    $inc?: {
        [key in string]: number;
    };
    $push?: {
        [key in string]: object | object[];
    };
    $pull?: {
        [key in string]: object | object[];
    };
}
/** 数据库表 通过调用SDIDB的create use方法获得 */
declare class IDBTable {
    readonly tableName: string;
    readonly tableSetting: TableSetting;
    protected store: IDBObjectStore;
    constructor(tableName: string, tableSetting: TableSetting);
    /**
     * 给指定的表添加数据
     * @async
     * @param data 添加进表的数据 如果设定了主键必须为含主键的对象
     */
    insert(value: any): Promise<any>;
    insert(value: any, key: IDBValidKey): Promise<any>;
    /**
     * 删除指定主键的一行
     */
    remove(keyPath: IDBValidKey | IDBKeyRange): Promise<unknown>;
    /**
     * 更新表数据
     * @param query 修改数据的查询，如果有多个结果只修改第一条
     * @param update 修改的数据 和mongoose的使用一样
     * @param key 如果该表没有主键，会有一个自增长的key，把这个key放入，否则数据会被新增而不是更新
     */
    update(query: object, update: UpdateOptions, key?: IDBValidKey): Promise<unknown>;
    /**
     * 通过主键或索引对应的数据
     * 如果通过主键查找，不需要放入keyPath
     * 如果查找数组中的元素，只能使用该方法
     */
    findByKeypath(query: FindOptions): Promise<unknown>;
    /**
     * 查找符合条件的数据 性能消耗比其它的大
     */
    find(query: object): Promise<any[]>;
    /**
     * 查找表中含有该键的所有数据 不放入参数会查找所有数据
     */
    findAll(): Promise<any>;
    findAll(index: string): Promise<any>;
    /**
     * 获得该表有多少条数据
     */
    count(): Promise<number>;
    /**
     * 获得指定范围内的数据条数
     */
    count(key: IDBValidKey | IDBKeyRange): Promise<number>;
    /**
     * 清除该表数据
     */
    clear(): Promise<boolean>;
}
//#endregion

//#region SDMath
/**
 * 提供了Math方法的小数部分取值
 * 对浮点数运算和四舍五入等的支持
 */
export class SDMath {
    /** 四舍五入 */
    static round: (number: string | number, precision?: number) => number;
    /** 向上取整 */
    static ceil: (number: string | number, precision?: number) => number;
    /** 向下取整 */
    static floor: (number: string | number, precision?: number) => number;
    /** 加法 */
    static add: (num1: number, num2: number) => number;
    /** 减法 */
    static sub: (num1: number, num2: number) => number;
    /** 乘法 */
    static mul: (num1: number, num2: number) => number;
    /** 除法 */
    static div: (num1: number, num2: number) => number;
}
//#endregion

//#region throttle
/**
 * 节流：每次时间间隔内只触发一次回调
 * @param callback 执行的回调函数
 * @param delay 时间间隔 默认500ms
 * @param style 默认为true true为第一次触发时触发回调 false为最后次触发时触发回调
 */
export function throttle(
    callback: (...arg: unknown[]) => unknown,
    delay?: number,
    style?: boolean
): (this: any, ...args: unknown[]) => void;
//#endregion

//#region userBrowers
declare const browerList: readonly ["edge", "opera", "chrome", "safari", "firefox"];
declare type Result = AddProperty<
    {
        [key in typeof browerList[number]]?: string;
    },
    {
        main: string;
    }
>;
/**
 * 用户使用时的浏览器及版本号
 */
export function userBrowers(): Result;
//#endregion

//#region Validator
declare type CheckRule = [() => boolean, string];
declare type CheckFunc = ((data: string) => boolean) | RegExp;
/**
 * 对包装数据进行检查
 * 该实例方法均支持链式调用
 * 内置了不为空，邮箱检查，不含空格，密码等级限制，长度限制六个检测函数
 */
export class Validator {
    checkArr: CheckRule[];
    data: string;
    constructor(data: string | number);
    /**
     * 开始检测 并抛出第一个错误
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
    addCheck(checkFunc: CheckFunc, errorMsg: string): this;
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
//#endregion

//#region defaultExport
import type { App } from "vue";

interface SDT3 {
    install(app: App): void;
}
declare const SDT: SDT3;
export default SDT;
//#endregion
