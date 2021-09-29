import deleteEmpty from "./deleteEmpty.js";
/**
 * 用户使用时的浏览器及版本号
 * @returns {Array}
 */
export default function userBrowers() {
    const agent = navigator.userAgent;
    const regexp =
        /((?<opera>OPR)|(?<safari>Safari)|(?<chrome>Chrome)|(?<edge>Edg)|(?<ie>NET)|(?<firefox>Firefox))\/(?<version>(\d|\.)*)/g;
    const result = {};
    const matchAll = agent.matchAll(regexp);
    for (const { groups } of matchAll) {
        result[Object.keys(deleteEmpty(groups))[0]] = groups.version;
    }
    return result;
}
