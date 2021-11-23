import deleteEmpty from "./deleteEmpty";

const browerList = ["edge", "opera", "chrome", "safari", "firefox"] as const;

type Result = AddProperty<{ [key in typeof browerList[number]]?: string }, { main: string }>;

/**
 * 用户使用时的浏览器及版本号
 */
export default function userBrowers(): Result {
    const regexp =
        /((?<opera>OPR)|(?<safari>Safari)|(?<chrome>Chrome)|(?<edge>Edg)|(?<ie>NET)|(?<firefox>Firefox))\/(?<version>(\d|\.)*)/g;
    const result: Result = { main: "" };
    const matchAll = navigator.userAgent.matchAll(regexp);
    for (const { groups } of matchAll) {
        result[Object.keys(deleteEmpty(groups!))[0]] = groups!.version;
    }
    for (const brower of browerList) {
        if (result[brower]) {
            result.main = brower;
            return result;
        }
    }
    return result;
}
