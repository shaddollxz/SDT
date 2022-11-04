declare const browerList: readonly ["edge", "opera", "chrome", "safari", "firefox"];
declare type Result = {
    [key in typeof browerList[number]]?: string;
} & {
    main: typeof browerList[number];
};
/**
 * 用户使用时的浏览器及版本号
 */
export default function userBrowers(): Result;
export {};
