/**
 * 防抖：在设定时间内多次调用回调时不会执行 超出设定时间后才执行一次
 */
export default function debounce(callback: (...arg: unknown[]) => unknown, delay?: number, style?: boolean): (this: any, ...args: unknown[]) => void;
