/**
 * 防抖：在设定时间内多次调用回调时只会执行一次 超出设定时间后才再能执行
 * @param callback 执行的回调函数
 * @param delay 时间间隔 默认500ms
 * @param style 默认为true true为触发时触发回调等待时间后才能再次触发 false为最后次触发时后等待设定时间后触发回调
 */
export default function debounce<T extends unknown[]>(callback: (...arg: T) => unknown, delay?: number, style?: boolean): (this: any, ...args: T) => void;
