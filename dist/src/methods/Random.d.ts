declare type GetStringType = "char" | "lower" | "upper" | "number" | "chinese";
/**
 * 随机数生成器
 * 通过静态方法返回一个指定范围的随机数
 */
export default class Random {
    static number(range: [min: number, max: number], precision?: number): number;
    static pick(range: string, len?: number): string;
    static boolean(): boolean;
    static stringAndNumber(len?: number): string;
    /** 获得指定长度的字符串 默认为数字小写字母混合 */
    static string(type: GetStringType | GetStringType[], len?: number): string;
}
export {};
