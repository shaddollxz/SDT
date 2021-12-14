declare type SDDateConstructorArgs = string | number | Date;
declare type TimeTupl = [string, number];
declare const TimeTableList: readonly ["YYYY", "MM", "W", "DD", "hh", "mm", "ss", "ms"];
export declare type Precision = typeof TimeTableList[number];
declare type TimeTable = {
    [key in Precision]: TimeTupl;
} & {
    setYear: (value: number) => TimeTupl;
    setMonth: (value: number) => TimeTupl;
};
/**
 * 对date类的封装 和Date一样实例化
 */
export default class SDDate extends Date {
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
    static difference(timeOne: SDDateConstructorArgs, timeTwo: SDDateConstructorArgs, precision?: Precision, formatStr?: string): string;
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
export {};
