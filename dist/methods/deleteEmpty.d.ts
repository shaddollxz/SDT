/**
 * 把数组或对象中的无效数据删去
 * 无效数据：被类型转换后为false的值 包括`{},[]`
 * 如果数组或对象中只有无效数据，该数组或对象也被判断为无效数据
 * @param value 要去除无效数据的数组或对象
 * @param isCheckZero 是否将0作为无效数据
 * @returns 去除后的数据
 */
export default function deleteEmpty(value: object, isCheckZero?: boolean): object;
