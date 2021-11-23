import AsyncConstructor from "./AsyncConstructor";

interface ConstructorOptions {
    count?: number;
    type?: string[];
    maxSize?: number;
}
type ReadType = "readAsArrayBuffer" | "readAsDataURL" | "readAsText";
interface ReadOptions {
    readAs?: ReadType;
    order?: number;
}
type ReadResult = string | string[] | ArrayBuffer | ArrayBuffer[] | (string | ArrayBuffer | null)[] | null;

const _files = Symbol("_files");
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
    private [_files]!: File[];
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

            this[_files] = await new Promise((resolve, reject) => {
                input.addEventListener("change", function read(e) {
                    let target = e.target as HTMLInputElement;
                    if (count == 1 || target.files!.length == 1) {
                        if (target.files![0].size < limitSize) {
                            resolve([target.files![0]]);
                        } else {
                            resolve([]);
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
                        resolve(result);
                    }
                    this.removeEventListener("change", read);
                });
            });
        });
        this.text = ["txt", "md", "json", "js", "css", "less", "sass", "ts", "xml", "html"];
        this.dataurl = ["jpg", "png", "jpge", "gif", "mp4", "mp3", "flac"];
    }

    get file() {
        return this[_files].length == 1 ? this[_files][0] : this[_files];
    }

    get name() {
        if (this[_files].length == 1) {
            return this[_files][0].name;
        } else {
            return this[_files].map((item) => item.name);
        }
    }

    /**
     * 不传入参数会读取所有文件并返回文件内容的数组
     * 方法会自己推断部分文件的读取返回类型 也能通过options自己设置返回类型
     * @param options 设置读取文件的方式和读取第几个文件
     */
    async read(options: ReadOptions = {}): Promise<ReadResult> {
        if (this[_files].length == 0) throw "文件超过设置大小";
        const { readAs = undefined, order = 0 } = options;
        const reader = new FileReader();
        // 传入多个文件时默认读全部文件
        if (this[_files].length > 1 && !order) {
            const result: ReadResult = [];
            for (const file of this[_files]) {
                if (readAs) {
                    reader[readAs](file);
                } else {
                    reader[this.readType(file)](file);
                }
                const content = await new Promise((resolve, reject) => {
                    reader.onerror = () => {
                        reject("读取文件失败");
                    };
                    reader.onload = (e) => {
                        resolve(e.target!.result);
                    };
                });
                // @ts-ignore
                result.push(content);
            }
            return result;
        } else {
            // 只有一个文件或指定了读取文件位置时读取一个文件
            if (readAs) {
                reader[readAs](this[_files][order]);
            } else {
                reader[this.readType(this[_files][order])](this[_files][order]);
            }
            return new Promise((resolve, reject) => {
                reader.onerror = () => {
                    reject("读取文件失败");
                };
                reader.onload = (e) => {
                    resolve(e.target!.result);
                };
            });
        }
    }

    /** 获取文件后缀名 根据后缀决定读取方法 */
    protected readType(file: File): ReadType {
        const regexp = /(?<=\.)\w+$/;
        const fileType = file.name.match(regexp)![0];
        if (fileType == null) {
            throw "无法获取文件后缀";
        }
        if (this.text.includes(fileType)) {
            return "readAsText";
        } else if (this.dataurl.includes(fileType)) {
            return "readAsDataURL";
        } else {
            return "readAsArrayBuffer";
        }
    }
}
