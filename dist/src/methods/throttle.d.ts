/**
 * 节流：每次时间间隔内只触发一次回调
 * @param callback 执行的回调函数
 * @param delay 时间间隔 默认500ms
 * @param style 默认为true true为第一次触发时触发回调 false为最后次触发时触发回调
 */
export default function throttle(callback: (...arg: unknown[]) => unknown, delay?: number, style?: boolean): (this: any, ...args: unknown[]) => void;
