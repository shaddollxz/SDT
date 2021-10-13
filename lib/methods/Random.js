import SDMath from "./SDMath.js";
/**
 * 随机数生成器
 * 通过静态方法返回一个指定范围的随机数
 * 实例化对象的getRandom根据实例化时的参数返回不同结果：
 * 数组：返回不会重复的随机数
 * 字符串：返回字符串中的随机字符
 * @param {Array|String} range 生成数据的范围 如果生成数字输入最小最大值 如果是固定的一些字符输入字符串
 * @param {number} precision 生成数保留小数点位数 默认不保留
 */
export default class Random {
    constructor(range, precision = 0) {
        let arr = [];
        this.range = range;
        this.precision = precision;
        /**
         * 因为实际上只有safari实现了尾递归优化 所以不要用该函数生成太多数
         * 具体多少。。。因为是随机的所以没个大概值不要过一万吧
         */
        this.getRandom = (() => {
            if (Array.isArray(this.range)) {
                return () => {
                    const [min, max] = this.range;
                    if (Object.keys(arr).length == max - min + 1) return null;
                    let random = Random.getNumber(min, max, this.precision);
                    return arr[random] ? this.getRandom() : ((arr[random] = true), +random);
                };
            } else {
                return (len = 1) => {
                    if (len == 1) {
                        return this.range[Random.getNumber(0, this.range.length - 1)];
                    } else {
                        this.clear();
                        for (let i = 0; i < len; i++) {
                            this.arr.push(this.range[Random.getNumber(0, this.range.length - 1)]);
                        }
                        return this.arr.join("");
                    }
                };
            }
        })();
        this.clear = () => {
            arr = [];
        };
    }
    static getNumber(range, precision = 0) {
        const [min, max] = range;
        let random = Math.random() * (max - min + 1) + min;
        random = SDMath.floor(random, precision);
        return random;
    }
    static getBoolean() {
        return Math.random() > 0.5;
    }
    static getString = (len = 1, type = "all") => {
        if (typeof type == "string") {
            if (len == 1) {
                return String.fromCharCode(Random.getNumber(charMap[type]));
            } else {
                const chars = Array.from({ length: len }, () => Random.getNumber(charMap[type]));
                return String.fromCharCode(...chars);
            }
        } else if (Array.isArray(type)) {
            if (len == 1) {
                return String.fromCharCode(
                    Random.getNumber(charMap[type[Random.getNumber([0, type.length - 1])]])
                );
            } else {
                const chars = Array.from({ length: len }, () =>
                    Random.getNumber(charMap[type[Random.getNumber([0, type.length - 1])]])
                );
                return String.fromCharCode(...chars);
            }
        }
    };
}
// ascii码
const charMap = {
    all: [33, 126], // 所有数字字母和特殊符号
    lower: [97, 122], // 小写字母
    upper: [65, 90], // 大写字母
    number: [48, 57], // 数字
    chinese: [0x4e00, 0x9fa5], // 中文
};
