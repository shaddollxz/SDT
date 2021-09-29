import AsyncConstructor from "./AsyncConstructor.js";
/**
 * indexedDB的封装
 * 实例化时使用`await new SDIDB(xxx)`
 * 实例化时自动打开或创建当前版本的数据库
 */
export default class SDIDB extends AsyncConstructor {
    constructor(dbname) {
        if (!window.hasOwnProperty("indexedDB")) throw "该浏览器不支持indexedDB";
        super(async () => {
            await openDB.call(this);
        });
        this.name = dbname;
        this.__DBcatch__;
        this.tableName;
        this.keyPath;
        this.indexs;
        this.tableList = [];
        this.version = null;
        this.callBacks = {
            insertSuccess() {
                console.log("数据写入成功");
            },
            insertError() {
                console.log("数据写入失败");
            },
            updataSuccess() {
                console.log("数据修改成功");
            },
            updataError() {
                console.log("数据修改失败");
            },
            deleteSuccess() {
                console.log("数据删除成功");
            },
            deleteError() {
                console.log("数据删除失败");
            },
        };
    }

    /**
     * 修改增删改时成功或失败时触发的回调
     * @param {function} callback 新的回调
     * @param {string} type 修改的回调的名字: `xxxSuccess` `xxxError`
     */
    setCallBack(callback, type) {
        this.callBacks[type] = callback;
    }

    /**
     * 创建新的表 只有不设置主键和索引时才能直接放入对象以外的数据
     * @async
     * @property {string} tableName 表的名字 *必须
     * @param {object} settings 表的设定 该对象拥有以下三个属性
     * @--------------
     * @property {string} keyPath 主键 如果没有设定会自动生成一个递增的主键 但是该表就不能更新数据
     * @property {Array} index 索引 多个索引都放入该数组 索引见下
     * @--------------
     * @property {string} key 将该列设为索引
     * @property {boolean} unique 索引是否是唯一值 默认为false
     * @property {string} name 索引名字 搜索时用的索引以该值为准 没有时以key代替
     */
    async createTable(tableName, settings) {
        //? 如果有缓存 先把它关闭再重新升级建表
        //! 这里已经被openDB中success的onversionchange代替
        //// if (this.__DBcatch__) {this.__DBcatch__.close(); this.__DBcatch__ = null;}
        await openDB.call(this, "create", tableName, settings);
        return this;
    }

    /**
     * 选择一个表并返回一个布尔值表示是否成功打开
     * 需要使用该函数指定进行操作的表才能增删改查
     * @async
     * @param {string} tableName 表名
     */
    async useTable(tableName) {
        if (this.tableList.includes(tableName)) {
            this.tableName = tableName;

            const IDBObjectStore = this.__DBcatch__
                .transaction([this.tableName], "readonly")
                .objectStore(this.tableName);
            this.keyPath = IDBObjectStore.keyPath;
            const indexNames = IDBObjectStore.indexNames;

            if (indexNames.length) {
                const indexObj = {};
                for (const indexName of indexNames) {
                    const { keyPath, multiEntry, unique, name } = IDBObjectStore.index(indexName);
                    indexObj[name] = { keyPath, multiEntry, unique };
                }
                this.indexs = indexObj;
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * 如果没有指定的表将创建一个新表并指向它
     * @async
     * @property {string} tableName 表的名字 -- 必须
     * @param {object} settings 表的设定 该对象拥有以下三个属性
     * @--------------
     * @property {string} keyPath 主键 如果没有设定会自动生成一个递增的主键 但是该表就不能更新数据
     * @property {Array} index 索引 多个索引都放入该数组 索引见下
     * @--------------
     * @property {string} key 将该列设为索引
     * @property {boolean} unique 索引是否是唯一值 默认为false
     * @property {string} name 索引名字 搜索时用的索引以该值为准 没有时以key代替
     */
    async loadTable(tableName, settings) {
        if (!(await this.useTable(tableName))) {
            await this.createTable(tableName, settings);
            await this.useTable(tableName);
        }
    }

    /**
     * 删除指定的表，没有指定表名将删除当前表
     * @async
     */
    async removeTable(tableName = null) {
        //? 如果有缓存 先把它关闭再重新升级建表
        await openDB.call(this, "remove", (tableName ??= this.tableName));
        this.keyPath = undefined;
        this.indexs = null;
        this.tableName = tableName == this.tableName ? null : this.tableName;
        return this;
    }

    /**
     * 给指定的表添加数据
     * @async
     * @param {any} data 添加进表的数据 如果设定了主键必须为含主键的对象
     * @returns {Promise} 该实例本身 可以用then链式调用
     */
    async insert(data) {
        //? 创建请求
        let IDBrequest = this.__DBcatch__
            .transaction([this.tableName], "readwrite")
            .objectStore(this.tableName)
            .add(data);
        //? 等待请求的结果 成功与失败的回调都在这里面
        await requestCallBack.call(this, IDBrequest, "insert");
        return this;
    }

    /**
     * 将数据全部插入数据库 数据必须是数组
     * @async
     */
    async insertAll(data) {
        if (!Array.isArray(data)) throw new TypeError("必须是数组类型");

        for (const item of data) {
            await this.insert(item);
        }
        return this;
    }

    /**
     * 更新表数据 只能把要更新的整行数据放入，不能只更新某一列对应数据
     * @async
     * @param {any} data 要更新的数据
     */
    async updata(data) {
        //? 创建请求
        let IDBrequest = this.__DBcatch__
            .transaction([this.tableName], "readwrite")
            .objectStore(this.tableName)
            .put(data);
        await requestCallBack.call(this, IDBrequest, "updata");
        return this;
    }

    /**
     * 将数据全部更新 数据必须是数组
     * @async
     */
    async updataAll(data) {
        if (!Array.isArray(data)) throw new TypeError("必须是数组类型");

        for (const item of data) {
            await this.updata(item);
        }
        return this;
    }

    /**
     * 删除指定主键的一行
     * @async
     * @param {any} keyPath 主键
     */
    async delete(keyPath) {
        let IDBrequest = this.__DBcatch__
            .transaction([this.tableName], "readwrite")
            .objectStore(this.tableName)
            .delete(keyPath);
        await requestCallBack.call(this, IDBrequest, "delete");
        return this;
    }

    /**
     * 获得该表有多少条数据
     * @async
     */
    async count() {
        let IDBrequest = await this.__DBcatch__
            .transaction([this.tableName], "readonly")
            .objectStore(this.tableName)
            .count();

        return await requestCallback(IDBrequest);
    }

    /**
     * 查找数据库表中匹配的第一条数据
     * @async
     * @param {any} value 查找的数据 可以是数组但不能是对象
     * @param {string} index 查找的索引 如果不写就找主键
     */
    async select(value, index) {
        if (value === undefined) throw "不能查找undefined";

        const IDBrequest = index
            ? //? 使用索引查找
              this.__DBcatch__
                  .transaction([this.tableName], "readonly")
                  .objectStore(this.tableName)
                  .index(index)
                  .getAll(value)
            : //? 没有用索引会使用主键查找
              this.__DBcatch__
                  .transaction([this.tableName], "readonly")
                  .objectStore(this.tableName)
                  .get(value);

        return await requestCallback(IDBrequest);
    }

    /**
     * 查找数据库表中匹配的所有数据 不放入参数会查找所有数据
     * @async
     * @param {any} value 查找的数据 可以是数组但不能是对象
     * @param {string} index 查找的索引
     * @returns {Promise} 查找结果对象组成的数组
     */
    async selectAll(index) {
        const getcursor = this.__DBcatch__
            .transaction([this.tableName], "readonly")
            .objectStore(this.tableName)
            .openCursor();

        return await (() => {
            return new Promise((resolve, reject) => {
                const result = [];

                getcursor.onerror = () => {
                    reject("查询失败");
                    // resolve();
                    // throw "查询失败";
                };

                if (index) {
                    //? 查找指定索引
                    getcursor.onsuccess = (e) => {
                        let cursor = e.target.result;
                        if (cursor) {
                            if (cursor.value[index]) {
                                result.push(cursor.value);
                            }
                            cursor.continue();
                        } else {
                            resolve(result);
                        }
                    };
                } else {
                    //? 查找所有
                    getcursor.onsuccess = (e) => {
                        let cursor = e.target.result;
                        if (cursor) {
                            result.push(cursor.value);
                            cursor.continue();
                        } else {
                            resolve(result);
                        }
                    };
                }
            });
        })();
    }

    /**
     * 删库跑路
     * @param {string} dbname 数据库名字
     */
    static deleteDB(dbname) {
        window.indexedDB.deleteDatabase(dbname);
    }
}

//* ====================不暴露到实例上==================== *//

//? 增删改的请求的回调
function requestCallBack(IDBrequest, type) {
    return new Promise((resolve, reject) => {
        IDBrequest.onsuccess = () => {
            //todo 增删改成功的回调
            this.callBacks[type + "Success"]();
            resolve(this);
        };
        IDBrequest.onerror = () => {
            //todo 增删改失败的回调
            this.callBacks[type + "Error"]();
            reject(this);
        };
    });
}
//? 进行查询的回调
function requestCallback(IDBrequest) {
    return new Promise((resolve, reject) => {
        IDBrequest.onsuccess = (e) => {
            resolve(e.target.result);
        };
        IDBrequest.onerror = () => {
            reject(null);
        };
    });
}

/**
 * 用来打开数据库使用
 * @param {string} type 升级数据库时是移除表还是添加表
 * @param {boolean} tableName 是否升级数据库 默认为false 在需要修改表结构或添加表时用true
 * @param {object} settings 创建新表时需要放入的设置
 * @returns
 */
async function openDB(type, tableName, settings) {
    let DBRequest =
        type && this.version
            ? window.indexedDB.open(this.name, ++this.version)
            : window.indexedDB.open(this.name);

    //? onerror
    DBRequest.onerror = () => {
        throw "数据库打开失败";
    };

    //? onupgradeneeded
    await upgradeneeded(DBRequest, type, tableName, settings);

    //? onsuccess
    return await (() => {
        return new Promise((resolve, reject) => {
            DBRequest.onsuccess = (e) => {
                const DB = e.target.result;
                //? 在需要升级该数据库时关闭它
                DB.onversionchange = () => DB.close();
                this.__DBcatch__ = DB; //? 如果更新 DBcatch 会关闭 要给它重新赋值
                this.version = DB.version;
                this.tableList = Array.from(DB.objectStoreNames);
                resolve();
            };
        });
    })();
}
//! 用来监听onupgradeneeded事件的函数 同时添加或删除表也是在里面进行 !
function upgradeneeded(DBRequest, type, tableName, settings) {
    if (!type) return;

    return new Promise((resolve, reject) => {
        DBRequest.onupgradeneeded = (e) => {
            const DB = e.target.result;

            if (type == "create") {
                //? 建表
                (function (tableName, settings = {}) {
                    const table = DB.createObjectStore(
                        tableName,
                        "keyPath" in settings
                            ? { keyPath: settings.keyPath }
                            : { autoIncrement: true }
                    );
                    //? 设置索引 在查询时可以用索引查询
                    if ("index" in settings) {
                        for (const value of settings.index) {
                            table.createIndex(
                                value.key, //? 索引对应的key
                                value.name ?? value.key, //? 索引名称
                                {
                                    unique: value.unique ?? false, //? 索引能否有重复值 默认为有
                                    multiEntry: value.multiEntry ?? true, //? 索引是数组时能否用数组中元素进行搜索 默认为能
                                }
                            );
                        }
                    }
                })(tableName, settings);
            } else if (type == "remove") {
                DB.deleteObjectStore(tableName);
            }
            resolve(DB);
        };
    });
}
