import AsyncConstructor from "./AsyncConstructor";
interface ConstructorOptions {
    count?: number;
    type?: string[];
    maxSize?: number;
}
declare type ReadType = "readAsArrayBuffer" | "readAsDataURL" | "readAsText";
interface ReadOptions {
    readAs?: ReadType;
    order?: number;
}
declare type ReadResult = string | string[] | ArrayBuffer | ArrayBuffer[] | (string | ArrayBuffer | null)[] | null;
/**
 * 异步实例化时跳出文件选择框 并根据read方法读取选择的文件
 * @param options 设置选择文件的大小 熟练 后缀
 *
 * @async 该类支持异步实例化
 * @example
 * let files = await new LocalFiles()
 * let result = files.read()
 */
export default class LocalFiles extends AsyncConstructor {
    private _files;
    text: string[];
    dataurl: string[];
    constructor({ count, type, maxSize }?: ConstructorOptions);
    get file(): File | File[];
    get name(): string | string[];
    get size(): number | number[];
    /**
     * 不传入参数会读取所有文件并返回文件内容的数组
     * 方法会自己推断部分文件的读取返回类型 也能通过options自己设置返回类型
     * @param options 设置读取文件的方式和读取第几个文件
     */
    read(options?: ReadOptions): Promise<ReadResult>;
    /** 获取文件后缀名 根据后缀决定读取方法 */
    protected readType(file: File): ReadType;
}
export {};
