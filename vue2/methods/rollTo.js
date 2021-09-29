import userBrowers from "./userBrowers.js";
/**
 * 因为safari对scrollTo的smooth动画支持不好，所以这个方法用手动动画实现滚动
 * 该函数经过柯里化 第一次调用后返回函数 调用第二次的函数
 */
export default function rollTo(y = 0, x = 0) {
    if (userBrowers().mainBrower !== "safari") {
        return () =>
            window.scrollTo({
                top: y,
                left: x,
                behavior: "smooth",
            });
    }

    const point = {
        top: document.documentElement.scrollTop || document.body.scrollTop,
        left: document.documentElement.scrollLeft || document.body.scrollLeft,
    };
    const methouds = {
        t: (where) => {
            const end = where == "top" ? y : x;
            return Math.round(point[where]) == end ? end : (point[where] -= point[where] / 8);
        },
        f: (where) => {
            const end = where == "top" ? y : x;
            return Math.round(point[where]) == end
                ? end
                : (point[where] += (end - point[where]) / 8);
        },
    };

    // *=============== 初始位置相对于要到位置的表示 可以看作一个二维数组 [[tt,tf],[ft,ff]] ===============* //
    const state = [point.top > y ? "t" : "f", point.left > x ? "t" : "f"];
    function getPoint(state) {
        return state.map((value, index) => {
            const where = index ? "top" : "left";
            return methouds[value](where);
        });
    }

    return function inner() {
        if (Math.floor(point.top) != ~~y - 1 || Math.floor(point.left) != ~~x - 1) {
            window.requestAnimationFrame(inner);
            window.scrollTo.apply(null, getPoint(state));
        } else {
            window.scrollTo(x, y); //! 动画结束后再移动一次修正小数点
        }
    };
}
