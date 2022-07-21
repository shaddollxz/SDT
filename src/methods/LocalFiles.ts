import AsyncConstructor from "./AsyncConstructor";

interface ConstructorOptions {
    count?: number;
    type?: string[];
    maxSize?: number;
}
type ReadType = "readAsArrayBuffer" | "readAsDataURL" | "readAsText";
interface ReadOptions {
    readAs?: ReadType;
    chunkSize?: number;
}
type ReadOneFileResult = string | ArrayBuffer | ArrayBuffer[] | null;
type ReadResult = ReadOneFileResult[];

/**
 * 异步实例化时跳出文件选择框 并根据read方法读取选择的文件
 * @param options 设置选择文件的大小（kb计算） 数量 后缀
 *
 * @async 该类支持异步实例化
 * @example
 * let files = await new LocalFiles()
 * let result = files.read()
 */
export default class LocalFiles extends AsyncConstructor {
    declare files: File[];
    text: string[];
    dataurl: string[];
    constructor({ count = 1, type = [], maxSize = Number.MAX_VALUE }: ConstructorOptions = {}) {
        super(async () => {
            const limitSize = maxSize ? maxSize * 1024 : maxSize;
            const input = document.createElement("input");
            input.type = "file";
            input.style.display = "none";
            input.multiple = count == 1 ? false : true;
            input.accept = ",." + (type.join(",.") || "*"); // 设置文件接收类型
            document.body.appendChild(input);
            input.click();
            document.body.removeChild(input);

            this.files = await new Promise((resolve, reject) => {
                input.addEventListener("change", function read(e) {
                    let target = e.target as HTMLInputElement;
                    if (count == 1 || target.files!.length == 1) {
                        if (target.files![0].size < limitSize) {
                            resolve([target.files![0]]);
                        } else {
                            reject("选择的文件超出允许大小");
                        }
                    } else {
                        let counter = 0;
                        const result: File[] = [];
                        Array.prototype.forEach.call(target.files, (item) => {
                            if (counter < count && item.size < limitSize) {
                                counter++;
                                result.push(item);
                            }
                        });
                        if (result.length == 0) {
                            reject("选择的文件全部超出允许大小");
                        } else {
                            resolve(result);
                        }
                    }
                    this.removeEventListener("change", read);
                });
            });
        });
        this.text = ["txt", "md", "json", "js", "css", "less", "sass", "ts", "xml", "html"];
        this.dataurl = ["jpg", "png", "jpge", "gif", "mp4", "mp3", "flac"];
    }

    /** 选取的文件名 */
    get names() {
        return this.files.map((item) => item.name);
    }

    /** 选取的文件大小，如果有多个是数组，如果只有一个为字符串 */
    get sizes() {
        return this.files.map((item) => item.size);
    }

    /**
     * 不传入参数会读取所有文件并返回文件内容的数组
     * 方法会自己推断部分文件的读取返回类型 也能通过options自己设置返回类型
     * 如果文件大于该值 会切片读取 以ArrayBuffer数组的形式存储 默认没有设置
     */
    async read(): Promise<ReadResult>;
    async read(order?: number, options?: ReadOptions): Promise<ReadOneFileResult>;
    // prettier-ignore
    async read(order?: number, { chunkSize = Infinity, readAs }: ReadOptions = {}): Promise<ReadResult | ReadOneFileResult> {
        // 默认读全部文件
        if (order === undefined) {
            const result: ReadResult = [];
            for (const file of this.files) {
                const content = await this.readFile(file, readAs ?? this.readType(file), chunkSize);
                result.push(content);
            }
            return result;
        } else {
            // 指定了读取文件位置时读取一个文件
            const file = this.files[order];
            return await this.readFile(file, readAs ?? this.readType(file), chunkSize);
        }
    }

    /** 获取文件后缀名 根据后缀决定读取方法 */
    protected readType(file: File): ReadType {
        const regexp = /(?<=\.)\w+$/;
        const fileType = file.name.match(regexp)![0];
        if (fileType == null) {
            return "readAsText";
        }
        if (this.text.includes(fileType)) {
            return "readAsText";
        } else if (this.dataurl.includes(fileType)) {
            return "readAsDataURL";
        } else {
            return "readAsArrayBuffer";
        }
    }

    async readFile(file: Blob, readAs: ReadType, chunkSize: number): Promise<ReadOneFileResult> {
        const reader = new FileReader();
        if (file.size <= chunkSize) {
            reader[readAs](file);
            return new Promise((resolve, reject) => {
                reader.onerror = () => {
                    reject("读取文件失败");
                };
                reader.onload = (e) => {
                    resolve(e.target!.result);
                };
            });
        } else {
            const chunkCount = Math.ceil(file.size / chunkSize);
            const chunks: ArrayBuffer[] = [];

            for (let i = 0; i < chunkCount; i++) {
                const start = i * chunkSize,
                    end = start + chunkSize >= file.size ? file.size : start + chunkSize;
                chunks.push(
                    (await this.readFile(
                        file.slice(start, end),
                        "readAsArrayBuffer",
                        chunkSize
                    )) as ArrayBuffer
                );
            }

            return chunks;
        }
    }
}

let files = new LocalFiles();
files.read();
