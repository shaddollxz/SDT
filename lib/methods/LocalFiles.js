import AsyncConstructor from "./AsyncConstructor.js";

/**
 * 异步实例化时跳出文件选择框 并根据read方法读取选择的文件
 * @param {limit} number 选择的文件上限数
 * @param {type} Array 选择的文件后缀
 * */
export default class LocalFiles extends AsyncConstructor {
    constructor(options = {}) {
        super(async () => {
            const { limit = 1, type = [] } = options;
            const input = document.createElement("input");
            input.type = "file";
            input.style.display = "none";
            input.multiple = limit == 1 ? "" : "multiple";
            input.accept = ",." + (type.join(",.") || "*"); // 设置文件接收类型
            document.body.appendChild(input);
            input.click();
            document.body.removeChild(input);

            this._files = await new Promise((resolve, reject) => {
                input.addEventListener("change", function read(e) {
                    if (limit == 1 || e.target.files.length == 1) {
                        resolve([e.target.files[0]]);
                    } else {
                        resolve(Array.prototype.slice.call(e.target.files, 0, limit));
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
    async read(order = 0) {
        const reader = new FileReader();
        if (this._files.length > 1 && !order) {
            const result = [];
            for (const file of this._files) {
                reader["readAs" + this.readType(file)](file);
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
            reader["readAs" + this.readType(this._files[order])](this._files[order]);
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
        const txt = ["txt", "md", "json", "js", "css", "less", "sass", "ts", "xml", "html"];
        const dataurl = ["jpg", "png", "jpge", "gif", "mp4", "mp3"];
        const regexp = /(?<=\.)\w+$/;
        const fileType = file.name.match(regexp)[0];
        if (txt.includes(fileType)) {
            return "Text";
        } else if (dataurl.includes(fileType)) {
            return "DataURL";
        } else {
            return "ArrayBuffer";
        }
    }
}
