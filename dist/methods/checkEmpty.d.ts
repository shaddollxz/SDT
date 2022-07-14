/**
 * 判断传入对象或数组是否为空
 * 嵌套的空数组和空对象判断为空
 * @param value 判断的值
 * @param isCheckZero 是否把零判断为空
 */
export declare function isEmpty(value: unknown, isCheckZero?: boolean): boolean;
/**
 * 检测对象或数组是否含有无效数据
 * @param value 检测的数据
 * @param isCheckZero 是否将零作为无效数据
 */
export declare function havaEmpty(value: object, isCheckZero?: boolean): boolean;
/**
 * 把数组或对象中的无效数据删去
 * 无效数据：被类型转换后为false的值 包括`{},[]`
 * 如果数组或对象中只有无效数据，该数组或对象也被判断为无效数据
 * @param value 要去除无效数据的数组或对象
 * @param isCheckZero 是否将0作为无效数据
 * @returns 去除后的数据
 */
export declare function deleteEmpty(value: object, isCheckZero?: boolean): object;
