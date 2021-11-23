/**
 * 基础类型
 */
declare type BaseType = number | string | boolean | bigint | symbol | null | undefined;

declare type AddProperty<T extends object, U extends object> = {
    [K in keyof T]: T[K];
} & {
    [L in keyof U]: U[L];
};

/**
 * 返回泛型的value组成的联合类型
 */
declare type Values<T> = T extends { [K in keyof T]: infer U } ? U : never;

/**
 * 将元组转为联合类型
 */
declare type TupleToUnion<T> = T extends Array<infer U> ? U : never;
