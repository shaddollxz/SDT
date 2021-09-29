/**
 * 扩展了原生Date类
 * 新增了静态获得当前时间的字符串 获得两个时间点的差值
 * 实例上新增了时间加减运算 与一个时间点的差值计算
 * 格式化字符串写法：
 * @YYYY  年
 * @MM    月
 * @MMM   月 文字版
 * @W     周
 * @DD    日
 * @HH    时 24小时制
 * @hh    时 12小时制
 * @mm    分
 * @ss    秒
 * @ms    毫秒
 * @TT    上下午表示 只有文字版
 */
export default class SDDate extends Date {
    constructor(...arg) {
        if ([...arg].length > 0) {
            super(...arg);
        } else {
            super();
        }
    }
    //* ====================获得时刻==================== *//
    /**
     * 获得当前时间点的格式化后字符串
     * @param {string} formatStr 格式化字符串
     * @param {boolean} useChinese 是否将月份和周数转换为中文 默认为true
     */
    static now(formatStr, useChinese) {
        return new SDDate().format(formatStr, useChinese);
    }

    /**
     * 将该时间转换为指定格式的字符串
     * @param {string} formatStr 格式化字符串
     * @param {boolean} useChinese 是否将月份和周数转换为中文 默认为true
     */
    format(formatStr = "YYYY-MM-DD HH:mm:ss.ms TT 周W", useChinese = true) {
        //! 上下午分开判断 不然如果在小时之前或没有小时会无法判断出
        const isHaveTT = /TT/g.test(formatStr);
        if (isHaveTT) {
            formatStr = formatStr.replace(
                /TT/g,
                this.getHours() > 12
                    ? useChinese
                        ? "下午"
                        : "p.m."
                    : useChinese
                    ? "上午"
                    : "a.m."
            );
        }
        const regexp =
            /(?<FullYear>Y{4})|(?<month>M{2,3})|(?<Date>D{2})|(?<Hours>(h|H){2})|(?<Minutes>m{2})|(?<Seconds>s{2})|(?<Day>W{1})|(?<Milliseconds>ms)/g;
        if (regexp.test(formatStr) || isHaveTT) {
            const isHour12 = /hh/g.test(formatStr);
            return formatStr.replace(regexp, (...arg) => {
                const groups = arg.pop();
                const key = Object.keys(JSON.parse(JSON.stringify(groups)))[0]; //? 取得groups里的有效值，即当前遍历到的项
                let data = "" + this["get" + key]();

                if (key == "month" && groups.month.length === 3) {
                    data = useChinese ? transformChinese[data] : transformEnglish_Month[data];
                } else if (key == "Day") {
                    data = useChinese ? transformChinese[data] : transformEnglish_Week[data];
                } else if (key == "Hours") {
                    data = isHour12 ? (data > 12 ? data - 12 : data) : data;
                } else {
                    if (data.length < 2) {
                        data = "0" + data;
                    }
                }

                return data;
            });
        } else {
            throw new TypeError("格式化字符串不正确");
        }
    }

    /**
     * 在当前时间上加上指定的时间
     * @param {number} timeNumber 加上的时间
     * @param {string} precision 时间的精度 默认为秒
     */
    add(timeNumber, precision = "ss") {
        if (!SDDate.timeTable.hasOwnProperty(precision)) throw "时间精度错误";
        const newTime = this.getTime() + timeNumber * SDDate.timeTable[precision][1];
        return new SDDate(newTime);
    }
    /**
     * 在当前时间上减去指定的时间
     * @param {number} timeNumber 减去的时间
     * @param {string} precision 时间的精度 默认为秒
     */
    sub(timeNumber, precision = "ss") {
        if (!SDDate.timeTable.hasOwnProperty(precision)) throw "时间精度错误";
        const newTime = this.getTime() - timeNumber * SDDate.timeTable[precision][1];
        return new SDDate(newTime);
    }

    /**
     * 原生getMonth()得到的月份从0开始
     * 这里修改为从一开始
     * 不输入参数时返回数字
     * 输入true时返回中文
     * 输入false时返回英文
     */
    getmonth(...arg) {
        if (arg.length == 0) {
            return this.getMonth() + 1;
        } else {
            const [isuseChinese] = arg;
            if (isuseChinese) {
                return transformChinese[this.getMonth() + 1] + "月";
            } else {
                return transformEnglish_Month[this.getMonth() + 1];
            }
        }
    }
    //* ====================获得时间段==================== *//
    /**
     * 获得两个时间的时间差
     * 输入时间必须能被Date实例化
     */
    static difference(timeOne, timeTwo, precision = "mm", formatStr = "mm:ss") {
        const TimeOne = new Date(timeOne).getTime();
        const TimeTwo = new Date(timeTwo).getTime();
        const difference = TimeOne - TimeTwo;
        return SDDate.transformTimeNumber(Math.abs(difference), precision, formatStr);
    }
    /**
     * 获得输入时间到该时间的时间差
     * 输入时间必须能被Date实例化
     */
    difference(time, precision = "mm", formatStr = "mm:ss") {
        const now = this.getTime();
        const timeNumber = new Date(time).getTime();
        const difference = now - timeNumber;
        return SDDate.transformTimeNumber(Math.abs(difference), precision, formatStr);
    }

    /**
     * 将毫秒换成指定上限单位的时间字符串
     * @param {number} timeNumber 以毫秒为单位的时间数字
     * @param {string} precision 转换后的时间精度 即到了指定位时不会进位
     * @param {string} formatStr 格式化字符串
     */
    static transformTimeNumber(timeNumber, precision = "mm", formatStr = "mm:ss") {
        const TimeTable = SDDate.timeTable;
        if (!TimeTable.hasOwnProperty(precision)) throw "时间精度错误";
        const result = {};
        precision = TimeTable[precision][0];
        switch (precision) {
            case "Year":
                result.Year = ~~(timeNumber / TimeTable.YYYY[1]);
                timeNumber = timeNumber % TimeTable.YYYY[1];
            case "Month":
                result.Month = ~~(timeNumber / TimeTable.MM[1]);
                timeNumber = timeNumber % TimeTable.MM[1];
            case "Day":
                result.Day = ~~(timeNumber / TimeTable.DD[1]);
                timeNumber = timeNumber % TimeTable.DD[1];
            case "Hour":
                result.Hour = ~~(timeNumber / TimeTable.hh[1]);
                timeNumber = timeNumber % TimeTable.hh[1];
            case "Minute":
                result.Minute = ~~(timeNumber / TimeTable.mm[1]);
                timeNumber = timeNumber % TimeTable.mm[1];
            case "Second":
                result.Second = ~~(timeNumber / TimeTable.ss[1]);
                if (/ms/g.test(formatStr)) {
                    timeNumber = timeNumber % TimeTable.ss[1];
                } else {
                    break;
                }
            case "Millisecond":
                result.Millisecond = timeNumber;
        }
        return SDDate.formatTimeObj(result, formatStr);
    }

    /**
     * 将记录时间的一个对象格式化为指定的字符串
     * ! 不建议直接使用 该方法主要是在 transformTimeNumber 和 difference 中用来格式化 !
     * @param {Object} timeObj 将时间数字转换为的记录对象
     * @param {string} formatStr 格式化字符串 只能包含timeObj指定的属性
     */
    static formatTimeObj(timeObj, formatStr) {
        const regexp =
            /(?<Year>Y{4})|(?<Month>M{2})|(?<Day>D{2})|(?<Hour>h{2})|(?<Minute>m{2})|(?<Second>s{2})|(?<Millisecond>ms)/g;
        if (regexp.test(formatStr)) {
            return formatStr.replace(regexp, (...arg) => {
                const groups = arg.pop();
                const key = Object.keys(JSON.parse(JSON.stringify(groups)))[0];
                //? 毫秒以外的时间不足两位补零
                if (key != "Millisecond" && ("" + timeObj[key]).length < 2) {
                    return "0" + timeObj[key];
                }
                return timeObj[key];
            });
        } else {
            throw "格式化字符串不正确";
        }
    }

    static timeTable = {
        ms: ["Millisecond", 1],
        ss: ["Second", 1000],
        mm: ["Minute", 1000 * 60],
        hh: ["Hour", 1000 * 60 * 60],
        DD: ["Day", 1000 * 60 * 60 * 24],
        W: ["Week", 1000 * 60 * 60 * 24 * 7],
        MM: ["Month", 1000 * 60 * 60 * 24 * 30],
        YYYY: ["Year", 1000 * 60 * 60 * 24 * 365],
        set yearDay(newvalue) {
            this.YYYY = ["Year", 1000 * 60 * 60 * 24 * newvalue];
        },
        set monthDay(newvalue) {
            this.MM = ["Month", 1000 * 60 * 60 * 24 * newvalue];
        },
    };
}

const transformChinese = [
    "天",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二",
];
const transformEnglish_Week = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const transformEnglish_Month = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sept",
    10: "Oct",
    11: "Nov",
    12: "Dec",
};
