/**
 * 防抖：在设定时间内多次调用回调时不会执行 超出设定时间后才执行一次
 */
export default function debounce(callback: (...arg: unknown[]) => unknown, delay = 300, style = true) {
    let timeoutId: number | undefined = void 0;
    if (style) {
        return function (this: any, ...args: unknown[]) {
            if (!timeoutId) {
                callback.apply(this, args);
            } else {
                clearTimeout(timeoutId);
            }
            timeoutId = window.setTimeout(() => {
                timeoutId = void 0;
            }, delay);
        };
    } else {
        return function (this: any, ...args: unknown[]) {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                callback.apply(this, args);
            }, delay);
        };
    }
}
