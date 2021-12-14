/**
 * 基础类型
 */
declare type BaseType = number | string | boolean | bigint | symbol | null | undefined;

/**
 * 只有数字的字符串
 */
declare type NumberString = `${number}`;

/**
 * 通过value的类型选择对象的属性
 */
declare type PickByType<T, U> = Pick<
    T,
    {
        [K in keyof T]: T[K] extends U ? K : never;
    }[keyof T]
>;

/**
 * 返回泛型的value组成的联合类型
 */
declare type Values<T> = T extends { [K in keyof T]: infer U } ? U : never;

/**
 * 将元组转为联合类型
 */
declare type TupleToUnion<T> = T extends Array<infer U> ? U : never;
