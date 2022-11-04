import type { EitherOr } from "../typings/utils";
interface ConstructorOptions {
    count?: number;
    type?: string[];
    maxSize?: number;
}
declare type ReadType = "readAsArrayBuffer" | "readAsDataURL" | "readAsText" | "readAsBinaryString";
declare type ReadOptions = EitherOr<{
    readAs?: ReadType;
    chunkSize?: number;
}, "readAs", "chunkSize">;
declare type ReadOneFileResult = string | ArrayBuffer | ArrayBuffer[] | null;
declare type ReadResult = ReadOneFileResult[];
/**
 * 异步实例化时跳出文件选择框 并根据read方法读取选择的文件
 * @param options 设置选择文件的大小（kb计算） 数量 后缀
 *
 * @async 该类支持异步实例化
 * @example
 * let files = new LocalFiles()
 * await files.getFile()
 * let result = files.read()
 */
export default class LocalFiles {
    files: File[];
    text: string[];
    dataurl: string[];
    count: number;
    type: string[];
    maxSize?: number;
    constructor({ count, type, maxSize }?: ConstructorOptions);
    /** 选取的文件名 */
    get names(): string[];
    /** 选取的文件大小，如果有多个是数组，如果只有一个为字符串 */
    get sizes(): number[];
    /** 选取文件 */
    getFile(): Promise<File[] | undefined>;
    append(files: FileList | File[]): void;
    /**
     * 不传入参数会读取所有文件并返回文件内容的数组
     * 方法会自己推断部分文件的读取返回类型 也能通过options自己设置返回类型
     * 如果文件大于该值 会切片读取 以ArrayBuffer数组的形式存储 默认没有设置
     */
    read(): Promise<ReadResult>;
    read(order?: number, options?: ReadOptions): Promise<ReadOneFileResult>;
    /** 获取文件后缀名 根据后缀决定读取方法 */
    protected readType(file: File): ReadType;
    /** 读取文件 */
    static readFile(file: Blob, readAs: ReadType, chunkSize?: number): Promise<ReadOneFileResult>;
}
export {};
