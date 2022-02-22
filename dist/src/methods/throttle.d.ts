/**
 * 节流：每次时间间隔内只触发一次回调
 * @param callback 执行的回调函数
 * @param delay 时间间隔 默认500ms
 * @param style 默认为true true为第一次触发时触发回调 false为最后次触发后等待时间后触发回调
 */
export default function throttle<T extends unknown[]>(callback: (...arg: T) => unknown, delay?: number, style?: boolean): (this: any, ...args: T) => void;
