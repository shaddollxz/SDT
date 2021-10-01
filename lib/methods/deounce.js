/**
 * 防抖：在设定时间内多次调用回调时不会执行 超出设定时间后才执行一次
 * @param {function} callback 要被执行的回调函数
 * @param {number} delay 限流间隔 默认300ms
 * @param {boolean} style 默认为true true为第一次触发时触发回调 false为最后次触发时触发回调
 */
export default function debounce(callback, delay = 300, style = true) {
    let timeoutId = null;
    if (style) {
        return function (...events) {
            if (!timeoutId) {
                callback.apply(this, events);
            } else {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                timeoutId = null;
            }, delay);
        };
    } else {
        return function (...events) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                callback.apply(this, events);
            }, delay);
        };
    }
}
