/**
 * 返回输入字符串的首字母大写版
 */
export function capitalize<T extends string>(str: T): Capitalize<T> {
    // @ts-ignore 它确实报错我没法
    return str[0].toUpperCase() + str.slice(1);
}

/**
 * 返回输入字符串的首字母小写版
 */
export function unCapitalize<T extends string>(str: T): Uncapitalize<T> {
    // @ts-ignore
    return str[0].toLowerCase() + str.slice(1);
}
