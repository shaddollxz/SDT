import SDMath from "./SDMath";

type GetStringType = "char" | "lower" | "upper" | "number" | "chinese";
type CharMap = {
    [key in GetStringType]: [number, number];
};
// ascii码
const charMap: CharMap = {
    char: [33, 126], // 所有数字字母和特殊符号
    lower: [97, 122], // 小写字母
    upper: [65, 90], // 大写字母
    number: [48, 57], // 数字
    chinese: [0x4e00, 0x9fa5], // 中文
};

/**
 * 随机数生成器
 * 通过静态方法返回一个指定范围的随机数
 */
export default class Random {
    /**
     * 从指定范围的数字中返回一个数字
     */
    static number(range: [min: number, max: number], precision = 0) {
        const [min, max] = range;
        let random = Math.random() * (max - min + 1) + min;
        random = SDMath.floor(random, precision);
        return random;
    }

    /**
     * 从数组中随机获得一项
     */
    static array<T>(arr: T[], start: number = 0, end: number = arr.length - 1): T {
        return arr[Random.number([start, end])];
    }

    /**
     * 从字符串中获取指定数量的随机字并组成字符串
     */
    static pick(range: string, len: number = 1): string {
        const arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(range[Random.number([0, range.length])]);
        }
        return arr.join("");
    }

    static boolean() {
        return Math.random() > 0.5;
    }

    /**
     * 获取随机字母或数字
     */
    static stringAndNumber(len: number = 1) {
        return Math.random()
            .toString(36)
            .slice(2, 2 + len);
    }

    /** 获得指定长度的字符串 默认为数字小写字母混合 */
    static string(type: GetStringType | GetStringType[], len: number = 1) {
        if (typeof type == "string") {
            if (len == 1) {
                return String.fromCharCode(Random.number(charMap[type]));
            } else {
                const chars = Array.from({ length: len }, () => Random.number(charMap[type]));
                return String.fromCharCode(...chars);
            }
        } else {
            if (len == 1) {
                return String.fromCharCode(Random.number(charMap[type[Random.number([0, type.length - 1])]]));
            } else {
                const chars = Array.from({ length: len }, () =>
                    Random.number(charMap[type[Random.number([0, type.length - 1])]])
                );
                return String.fromCharCode(...chars);
            }
        }
    }
}
