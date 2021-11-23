type SDDateConstructorArgs = string | number | Date;
type GetTimeFuncs =
    | "getFullYear"
    | "getmonth"
    | "getDate"
    | "getHours"
    | "getMinutes"
    | "getSeconds"
    | "getDay"
    | "getMilliseconds";
type TimeTupl = [string, number];
const TimeTableList = ["YYYY", "MM", "W", "DD", "hh", "mm", "ss", "ms"] as const;
export type Precision = typeof TimeTableList[number];
type TimeTable = {
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
    constructor(args?: SDDateConstructorArgs) {
        args ? super(args) : super();
    }

    /**
     * 将该时间转换为指定格式的字符串
     * @param formatStr 格式化字符串
     * @param useChinese 是否将月份和周数转换为中文 默认为true
     *
     * @description 可以支持YYYY MM MMM DD HH hh mm ss ms TT W 几种时间类型，MMM指用文字返回月份 hh指用12小时制返回小时
     * @example const time = date.format("/YYYY/-/MM/-/DD/ /HH/:/mm/:/ss/./ms/ /TT/ 周/W/")
     */
    format(formatStr: string = "/YYYY/-/MM/-/DD/ /HH/:/mm/:/ss/./ms/ /TT/ 周/W/", useChinese: boolean = true) {
        //* 上下午单独判断 不然如果在小时之前或没有小时会无法判断出
        formatStr = formatStr.replace(
            /TT/g,
            this.getHours() > 12 ? (useChinese ? "下午" : "p.m.") : useChinese ? "上午" : "a.m."
        );

        const regexp =
            /(?<FullYear>\/YYYY\/)|(?<month>\/M{2,3}\/)|(?<Date>\/DD\/)|(?<Hours>\/(h|H){2}\/)|(?<Minutes>\/mm\/)|(?<Seconds>\/ss\/)|(?<Day>\/W\/)|(?<Milliseconds>\/ms\/)/g;
        return formatStr.replace(regexp, (...args) => {
            const groups = args.pop();
            const key = Object.keys(JSON.parse(JSON.stringify(groups)))[0]; //? 取得groups里的有效值，即当前遍历到的项
            let data: string = "" + this[("get" + key) as GetTimeFuncs]();
            switch (key) {
                case "month":
                    if (groups.month.length === 3) {
                        return useChinese ? transformChinese[data] : transformEnglish_Month[+data - 1];
                    }
                case "Day":
                    return useChinese ? transformChinese[data] : transformEnglish_Week[data];
                case "Hours":
                    return /hh/g.test(formatStr) ? (+data > 12 ? +data - 12 : data) : data;
                case "Milliseconds":
                    return data.length < 3 ? "0" + data : data;
                default:
                    return data.length < 2 ? "0" + data : data;
            }
        });
    }

    /**
     * 原生getMonth()得到的月份从0开始
     * 这里修改为从1开始
     */
    getmonth(useChinese: boolean): string;
    getmonth(): number;
    getmonth(useChinese?: boolean) {
        if (useChinese == undefined) {
            return this.getMonth() + 1;
        } else {
            if (useChinese) {
                return transformChinese[this.getMonth() + 1] + "月";
            } else {
                return transformEnglish_Month[this.getMonth()];
            }
        }
    }

    /**
     * 在当前时间上加上指定的时间
     * @param timeNumber 加上的时间
     * @param precision 时间的精度 默认为秒
     */
    add(add: number, precision: Precision = "ss") {
        const newTime = this.getTime() + add * (SDDate.timeTable[precision][1] as number);
        return new SDDate(newTime);
    }
    /**
     * 在当前时间上减去指定的时间
     * @param timeNumber 减去的时间
     * @param precision 时间的精度 默认为秒
     */
    sub(sub: number, precision: Precision = "ss") {
        const newTime = this.getTime() - sub * (SDDate.timeTable[precision][1] as number);
        return new SDDate(newTime);
    }

    /**
     * 获得输入时间到实例时间的时间差
     * 输入时间必须能被Date实例化
     */
    difference(time: SDDateConstructorArgs, precision: Precision = "mm", formatStr = "/mm/:/ss/") {
        const now = this.getTime();
        const timeNumber = new Date(time).getTime();
        const difference = now - timeNumber;
        return transformTimeNumber(Math.abs(difference), precision, formatStr);
    }

    /**
     * 获得两个时间的时间差
     * 输入时间必须能被Date实例化
     */
    static difference(
        timeOne: SDDateConstructorArgs,
        timeTwo: SDDateConstructorArgs,
        precision: Precision = "mm",
        formatStr = "/mm/:/ss/"
    ) {
        const TimeOne = new Date(timeOne).getTime();
        const TimeTwo = new Date(timeTwo).getTime();
        const difference = TimeOne - TimeTwo;
        return transformTimeNumber(Math.abs(difference), precision, formatStr);
    }

    /**
     * 获得当前时间点的格式化后字符串
     * @param formatStr 格式化字符串
     * @param useChinese 是否将月份和周数转换为中文 默认为true
     */
    static formatNow(
        formatStr: string = "/YYYY/-/MM/-/DD/ /HH/:/mm/:/ss/./ms/ /TT/ 周/W/",
        useChinese: boolean = true
    ) {
        return new SDDate().format(formatStr, useChinese);
    }

    /**
     * 时间精度对应的表
     * 通过setYear setMonth方法修改时间精度的一年和一月的长度
     */
    static timeTable: TimeTable = {
        ms: ["Millisecond", 1],
        ss: ["Second", 1000],
        mm: ["Minute", 1000 * 60],
        hh: ["Hour", 1000 * 60 * 60],
        DD: ["Day", 1000 * 60 * 60 * 24],
        W: ["Week", 1000 * 60 * 60 * 24 * 7],
        MM: ["Month", 1000 * 60 * 60 * 24 * 30],
        YYYY: ["Year", 1000 * 60 * 60 * 24 * 365],
        setYear(value: number) {
            return (this.YYYY = ["Year", 1000 * 60 * 60 * 24 * value]);
        },
        setMonth(value: number) {
            return (this.MM = ["Month", 1000 * 60 * 60 * 24 * value]);
        },
    };
}

/**
 * 将毫秒换成指定上限单位的时间字符串
 * @param timeNumber 以毫秒为单位的时间数字
 * @param precision 转换后的时间精度 即到了指定位时不会进位
 * @param formatStr 格式化字符串
 */
function transformTimeNumber(timeNumber: number, precision: Precision = "mm", formatStr = "/mm/:/ss/") {
    const TimeTable = SDDate.timeTable;
    const result: any = {};
    const detailPrecision: string = TimeTable[precision][0];
    switch (detailPrecision) {
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
    const regexp =
        /(?<FullYear>\/YYYY\/)|(?<month>\/M{2,3}\/)|(?<Date>\/DD\/)|(?<Hours>\/(h|H){2}\/)|(?<Minutes>\/mm\/)|(?<Seconds>\/ss\/)|(?<Day>\/W\/)|(?<Milliseconds>\/ms\/)/g;

    return formatStr.replace(regexp, (...args) => {
        const groups = args.pop();
        const key = Object.keys(JSON.parse(JSON.stringify(groups)))[0];
        //? 毫秒以外的时间不足两位补零
        if (key != "Millisecond" && ("" + result[key]).length < 2) {
            return "0" + result[key];
        }
        return result[key];
    });
}

const transformChinese = ["天", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
const transformEnglish_Week = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const transformEnglish_Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
