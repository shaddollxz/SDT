/**
 * 节流：每次时间间隔内只触发一次回调
 * @param {function} callback 执行的回调函数
 * @param {number} delay 时间间隔 默认500ms
 * @param {boolean} style 默认为true true为第一次触发时触发回调 false为最后次触发时触发回调
 * @param {any} arg 其它传入回调的参数
 */
export default function throttle(callback, delay = 500, style = true) {
    let timeoutId = null;
    if (style) {
        return function (...events) {
            if (!timeoutId) {
                callback.apply(this, events);
                timeoutId = setTimeout(() => {
                    timeoutId = null;
                }, delay);
            }
        };
    } else {
        return function (...events) {
            if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    timeoutId = null;
                    callback.apply(this, events);
                }, delay);
            }
        };
    }
}
