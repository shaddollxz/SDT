declare type FilterOptional<T> = Pick<T, Exclude<{
    [K in keyof T]: T extends Record<K, T[K]> ? K : never;
}[keyof T], undefined>>;
declare type FilterNotOptional<T> = Pick<T, Exclude<{
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
}[keyof T], undefined>>;
declare type PartialEither<T, K extends keyof any> = {
    [P in Exclude<keyof FilterOptional<T>, K>]-?: T[P];
} & {
    [P in Exclude<keyof FilterNotOptional<T>, K>]?: T[P];
} & {
    [P in Extract<keyof T, K>]?: undefined;
};
/**
 * 设置对象中多个属性中的冲突属性
 */
export declare type EitherOr<O extends Object, L extends keyof O, R extends keyof O> = (PartialEither<Pick<O, L | R>, L> | PartialEither<Pick<O, L | R>, R>) & Omit<O, L | R>;
export {};
