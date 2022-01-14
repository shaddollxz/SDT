/**
 * 基础类型
 */
export declare type BaseType = number | string | boolean | bigint | symbol | null | undefined;
/**
 * 只有数字的字符串
 */
export declare type NumberString = `${number}`;
/**
 * 比较两个类型是否相同，返回true false
 */
export declare type Equal<T, U> = (<R>(arg: R extends T ? 1 : 2) => void) extends <R>(arg: R extends U ? 1 : 2) => void ? true : false;
/**
 * if 推荐配合Equal使用
 */
export declare type If<C extends boolean, T, F> = C extends true ? T : F;
/**
 * 通过value的类型选择对象的属性
 */
export declare type PickByType<T extends object, U> = {
    [K in keyof T as T[K] extends U ? K : never]: T[K];
};
/**
 * 通过value的类型排除对象的属性
 */
export declare type OmitByType<T extends object, U> = {
    [K in keyof T as T[K] extends U ? never : K]: T[K];
};
/**
 * 返回泛型的value组成的联合类型
 */
export declare type Values<T extends object> = T extends {
    [K in keyof T]: infer U;
} ? U : never;
/**
 * 将元组转为联合类型
 */
export declare type TupleToUnion<T extends any[]> = T extends Array<infer U> ? U : never;
/**
 * 获取对象的字符串类型键
 */
export declare type StringKeys<T extends object> = T extends {
    [K in infer R]: any;
} ? R extends string ? R : never : never;
