declare type GetStringType = "char" | "lower" | "upper" | "number" | "chinese";
/**
 * 随机数生成器
 * 通过静态方法返回一个指定范围的随机数
 */
export default class Random {
    /**
     * 从指定范围的数字中返回一个数字
     */
    static number(range: [min: number, max: number], precision?: number): number;
    /**
     * 从数组中随机获得一项
     */
    static array<T>(arr: T[], start?: number, end?: number): T;
    /**
     * 从字符串中获取指定数量的随机字并组成字符串
     */
    static pick(range: string, len?: number): string;
    static boolean(): boolean;
    /**
     * 获取随机字母或数字
     */
    static stringAndNumber(len?: number): string;
    /** 获得指定长度的字符串 默认为数字小写字母混合 */
    static string(type: GetStringType | GetStringType[], len?: number): string;
}
export {};
