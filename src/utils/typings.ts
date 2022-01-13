/**
 * 基础类型
 */
export type BaseType = number | string | boolean | bigint | symbol | null | undefined;

/**
 * 只有数字的字符串
 */
export type NumberString = `${number}`;

/**
 * 通过value的类型选择对象的属性
 */
export type PickByType<T, U> = {
    [K in keyof T as T[K] extends U ? K : never]: T[K];
};

/**
 * 通过value的类型排除对象的属性
 */
export type OmitByType<T, U> = {
    [K in keyof T as T[K] extends U ? never : K]: T[K];
};
/**
 * 返回泛型的value组成的联合类型
 */
export type Values<T> = T extends { [K in keyof T]: infer U } ? U : never;

/**
 * 将元组转为联合类型
 */
export type TupleToUnion<T> = T extends Array<infer U> ? U : never;

/**
 * 获取对象的字符串类型键
 */
export type StringKeys<T extends object> = T extends { [K in infer R]: any }
    ? R extends string
        ? R
        : never
    : never;
