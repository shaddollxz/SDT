import AsyncConstructor from "./AsyncConstructor.js";

/**
 * 异步实例化时跳出文件选择框 并根据read方法读取选择的文件
 * @param { object 设置 limit:选择的文件上限数 type:选择文件的后缀 maxSize:选择文件的最大大小 以kb计算
 * */
export default class LocalFiles extends AsyncConstructor {
    constructor(options = {}) {
        super(async () => {
            const { count = 1, type = [], maxSize = null } = options;
            const limitSize = maxSize ? maxSize * 1024 : Number.MAX_VALUE;
            const input = document.createElement("input");
            input.type = "file";
            input.style.display = "none";
            input.multiple = count == 1 ? "" : "multiple";
            input.accept = ",." + (type.join(",.") || "*"); // 设置文件接收类型
            document.body.appendChild(input);
            input.click();
            document.body.removeChild(input);

            this._files = await new Promise((resolve, reject) => {
                input.addEventListener("change", function read(e) {
                    if (count == 1 || e.target.files.length == 1) {
                        if (e.target.files[0].size < limitSize) {
                            resolve([e.target.files[0]]);
                        } else {
                            resolve([]);
                        }
                    } else {
                        let counter = 0;
                        const result = [];
                        Array.prototype.forEach.call(e.target.files, (item) => {
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
    }

    get file() {
        return this._files.length == 1 ? this._files[0] : this._files;
    }

    get name() {
        if (this._files.length == 1) {
            return this._files[0].name;
        } else {
            return this.files.map((item) => item.name);
        }
    }

    /**
     * 不传入参数会读取所有文件并返回文件内容的数组
     * @param {Number} order 读取第几个文件
     */
    async read(options = {}) {
        if (this._files.length == 0) throw "文件超过设置大小";

        const { readAs = "", order = 0 } = options;
        const reader = new FileReader();
        // 传入多个文件时默认读全部文件
        if (this._files.length > 1 && !order) {
            const result = [];
            for (const file of this._files) {
                if (readAs) {
                    reader["readAs" + readAs](file);
                } else {
                    reader["readAs" + this.readType(file)](file);
                }
                const content = await new Promise((resolve, reject) => {
                    reader.onerror = () => {
                        reject("读取文件失败");
                    };
                    reader.onload = (e) => {
                        resolve(e.target.result);
                    };
                });
                result.push(content);
            }
            return result;
        } else {
            // 只有一个文件或指定了读取文件位置时读取一个文件
            if (readAs) {
                reader["readAs" + readAs](this._files[order]);
            } else {
                reader["readAs" + this.readType(this._files[order])](this._files[order]);
            }
            return new Promise((resolve, reject) => {
                reader.onerror = () => {
                    reject("读取文件失败");
                };
                reader.onload = (e) => {
                    resolve(e.target.result);
                };
            });
        }
    }

    /** 获取文件后缀名 根据后缀决定读取方法 */
    readType(file) {
        const regexp = /(?<=\.)\w+$/;
        const fileType = file.name.match(regexp)[0];
        if (this.text.includes(fileType)) {
            return "Text";
        } else if (this.dataurl.includes(fileType)) {
            return "DataURL";
        } else {
            return "ArrayBuffer";
        }
    }
}
LocalFiles.prototype.text = [
    "txt",
    "md",
    "json",
    "js",
    "css",
    "less",
    "sass",
    "ts",
    "xml",
    "html",
];
LocalFiles.prototype.dataurl = ["jpg", "png", "jpge", "gif", "mp4", "mp3", "flac"];
