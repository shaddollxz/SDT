/** SDMath的基础 借鉴了MDN里的示例方法 */
function mathBase(methods) {
    const method = Math[methods];
    return function (number, precision = 0) {
        if (precision) {
            number = number + "e" + precision;
            return +(method(+number) + "e" + -precision);
        } else {
            return method(number);
        }
    };
}
const _mathMethods = {
    ADD: {
        getPoint: (point1, point2) => [
            point1 > point2 ? point1 : point2,
            point1 > point2 ? point1 : point2,
        ],
        method: (num1, num2) => num1 + num2,
    },
    SUB: {
        getPoint: (point1, point2) => [
            point1 > point2 ? point1 : point2,
            point1 > point2 ? point1 : point2,
        ],
        method: (num1, num2) => num1 - num2,
    },
    MUL: {
        getPoint: (point1, point2) => [point1 > point2 ? point1 : point2, point1 + point2],
        method: (num1, num2) => num1 * num2,
    },
    DIV: {
        getPoint: (point1, point2) => [point1 > point2 ? point1 : point2, 0],
        method: (num1, num2) => num1 / num2,
    },
};
function operateBase(type) {
    const methods = _mathMethods[type];
    return (num1, num2) => {
        const str1 = "" + num1;
        const str2 = "" + num2;
        let num1_point = str1.lastIndexOf(".");
        let num2_point = str2.lastIndexOf(".");
        if (~num1_point && ~num2_point) {
            num1_point = str1.length - 1 - num1_point;
            num2_point = str2.length - 1 - num2_point;
            const [point, finallyPiont] = methods.getPoint(num1_point, num2_point);
            const add1 = +(num1 + "e" + point);
            const add2 = +(num2 + "e" + point);
            return +(methods.method(add1, add2) + "e" + -finallyPiont);
        } else {
            return methods.method(num1, num2);
        }
    };
}

/**
 * 提供了Math方法的小数部分取值
 * 对浮点数运算的支持
 */
export default class SDMath {
    /** 四舍五入 */
    static round = mathBase("round");
    /** 向上取整 */
    static ceil = mathBase("ceil");
    /** 向下取整 */
    static floor = mathBase("floor");
    /** 加法 */
    static add = operateBase("ADD");
    /** 减法 */
    static sub = operateBase("SUB");
    /** 乘法 */
    static mul = operateBase("MUL");
    /** 除法 */
    static div = operateBase("DIV");
}
