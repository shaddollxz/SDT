import AsyncConstructor from "./AsyncConstructor";
import isSame from "./isSame";
import removeItem from "./removeItem";

type OpenDBMap = "create" | "remove";
interface IndexSetting {
    keyPath: string; //? 索引对应的key
    name?: string; //? 索引的名称
    unique?: boolean; //? 索引能否有重复值
    multiEntry?: boolean; //? 索引是数组时能否用数组中元素进行搜索
}
interface IndexSetting2 {
    keyPath: string[];
    name: string;
    unique?: boolean;
    multiEntry?: boolean;
}
interface TableSetting {
    keyPath?: string; //? 数据库的主键 主键可以时是数组 不指定时生成一个自增的主键
    index?: (IndexSetting | IndexSetting2)[]; //? 索引
}

let __DB__: { [dbName: string]: IDBDatabase }; //? 数据库，增删改查都在它身上进行

/**
 * indexDB的封装 该类支持异步实例化
 * @example
 * const db = await new SDIDB("test")
 * const table = db.useTabel("table")
 * let a = await table.find("a")
 */
export default class SDIDB extends AsyncConstructor {
    protected _version!: number; //? 数据库版本 打开数据库时异步获取
    protected _tableList!: string[]; //? 表名列表
    constructor(readonly name: string) {
        super(async () => {
            await this.openDB();
        });
    }

    /**
     * 打开或升级数据库
     * 打开时不需要参数
     * 升级只有两种情况，新建表或删除表
     */
    private async openDB(): Promise<void>;
    private async openDB(type: OpenDBMap, tableName: string, settings?: TableSetting): Promise<void>;
    private async openDB(type?: OpenDBMap, tableName?: string, settings: TableSetting = {}): Promise<void> {
        let DBRequest =
            type && this._version
                ? window.indexedDB.open(this.name, ++this._version)
                : window.indexedDB.open(this.name);

        //? onerror
        DBRequest.onerror = () => {
            throw "数据库打开失败";
        };

        //? 如果type有值则是建表或删表 没值就忽略这个过程
        if (type && tableName) {
            //? onupgradeneeded 在这里面进行添加或删除表
            await onupgradeneeded.call(this, DBRequest, type, tableName, settings);
        }

        //? onsuccess 打开数据库时初始化SDIDB的版本 表列表 缓存这个数据库
        await onsuccess.call(this, DBRequest);
    }

    /**
     * 创建新的表
     * 只有不设置主键和索引时才能直接放入对象以外的数据
     * 如果储存的是数组 只有设置为索引才能通过数组内元素直接查找
     */
    async createTable(tableName: string, settings: TableSetting = {}) {
        //? 如果有缓存 先把它关闭再重新触发升级建表
        //* 这里已经被openDB中success的on_versionchange代替
        //// if (this.__DB__) {this.__DB__.close(); this.__DB__ = null;}
        if (this._tableList.includes(tableName)) throw "数据库名重复";
        await this.openDB("create", tableName, settings);
        return new IDBTable(this.name, tableName, settings);
    }
    /**
     * 返回一个现有的表，并获取表结构
     */
    async useTable(tableName: string) {
        if (this._tableList.includes(tableName)) {
            const settings: TableSetting = {};

            const IDBObjectStore = __DB__[this.name].transaction([tableName], "readonly").objectStore(tableName);
            settings.keyPath = IDBObjectStore.keyPath as string;

            const indexNames: DOMStringList = IDBObjectStore.indexNames;
            if (indexNames.length) {
                const indexs: TableSetting["index"] = [];
                Array.prototype.forEach.call(indexNames, (value) => {
                    const { keyPath, multiEntry, unique, name } = IDBObjectStore.index(value);
                    // @ts-ignore
                    indexs.push({ keyPath, multiEntry, unique, name });
                });
                settings.index = indexs;
            }

            return new IDBTable(this.name, tableName, settings);
        } else {
            throw "没有指定的表";
        }
    }
    /**
     * 删除指定的表
     */
    async removeTable(tableName: string) {
        //? 如果有缓存 先把它关闭再重新升级建表
        if (this._tableList.includes(tableName)) {
            await this.openDB("remove", tableName);
        } else {
            throw "没有指定的表";
        }
        return this;
    }

    /**
     * 删库跑路
     * @param dbname 数据库名字
     */
    static deleteDB(dbname: string) {
        window.indexedDB.deleteDatabase(dbname);
    }

    //? 向外部暴露的只读属性
    get version() {
        return this._version;
    }
    get tableList() {
        return this._tableList;
    }
}

//* 用来监听onupgradeneeded事件的函数 同时添加或删除表也是在里面进行
async function onupgradeneeded(
    this: SDIDB,
    DBRequest: IDBOpenDBRequest,
    type: OpenDBMap,
    tableName: string,
    settings: TableSetting
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        DBRequest.onupgradeneeded = (e) => {
            const DB: IDBDatabase = (e.target as any).result;

            if (type == "create") {
                const store = DB.createObjectStore(
                    tableName,
                    settings.keyPath ? { keyPath: settings.keyPath } : { autoIncrement: true }
                );
                //? 设置索引 在查询时可以用索引查询
                if (settings.index) {
                    for (const value of settings.index) {
                        store.createIndex(
                            // @ts-ignore 这里已经必定有name了
                            Array.isArray(value.keyPath) ? value.name : value.name ? value.name : value.keyPath, //? 索引名称
                            value.keyPath, //? 索引对应的key
                            {
                                unique: value.unique ?? false, //? 索引能否有重复值 默认为有
                                multiEntry: value.multiEntry ?? Array.isArray(value.keyPath) ? false : true, //? If true, the index will add an entry in the index for each array element when the keyPath resolves to an Array. If false, it will add one single entry containing the Array.
                            }
                        );
                    }
                }
            } else if (type == "remove") {
                DB.deleteObjectStore(tableName);
            }

            resolve(true);
        };
    });
}

async function onsuccess(this: SDIDB, DBRequest: IDBOpenDBRequest): Promise<boolean> {
    return new Promise((resolve, reject) => {
        DBRequest.onsuccess = (e) => {
            const DB: IDBDatabase = (e.target as any).result;
            //? 在升级数据库时触发 关闭数据库 然后会用新版本重新打开 重新触发onsuccess
            DB.onversionchange = () => DB.close();
            __DB__[this.name] = DB; //? 如果更新 DBcatch会关闭 要给它重新赋值
            this._version = DB.version;
            this._tableList = Array.from(DB.objectStoreNames);
            resolve(true);
        };
    });
}

interface FindOptions {
    query: IDBValidKey | IDBKeyRange;
    keyPath?: string;
    count?: number;
}
interface UpdateOptions {
    $set?: object;
    $inc?: { [key in string]: number };
    $push?: { [key in string]: object | object[] };
    $pull?: { [key in string]: object | object[] };
}

/** 数据库表 通过调用SDIDB的create use方法获得 */
class IDBTable {
    protected store: IDBObjectStore;
    constructor(readonly dbName: string, readonly tableName: string, readonly tableSetting: TableSetting) {
        this.store = __DB__[this.dbName].transaction(this.tableName, "readwrite").objectStore(this.tableName);
    }
    /**
     * 给指定的表添加数据
     * @async
     * @param data 添加进表的数据 如果设定了主键必须为含主键的对象
     */
    async insert(value: any): Promise<any>;
    async insert(value: any, key: IDBValidKey): Promise<any>;
    async insert(value: any, key?: IDBValidKey) {
        //? 创建请求
        let IDBrequest = this.store.add(value, key);
        //? 等待请求的结果 成功与失败的回调都在这里面
        return await CURDHandler.call(this, IDBrequest);
    }
    /**
     * 删除指定主键的一行
     */
    async remove(keyPath: IDBValidKey | IDBKeyRange) {
        let IDBrequest = this.store.delete(keyPath);
        return await CURDHandler.call(this, IDBrequest);
    }
    /**
     * 更新表数据
     * @param query 修改数据的查询，如果有多个结果只修改第一条
     * @param update 修改的数据 和mongoose的使用一样
     * @param key 如果该表没有主键，会有一个自增长的key，把这个key放入，否则数据会被新增而不是更新
     */
    async update(query: object, update: UpdateOptions, key?: IDBValidKey) {
        let value = (await this.find(query))[0];

        for (const item in update) {
            changeProperties(value, update[item], item as keyof UpdateOptions);
        }

        let IDBrequest = this.store.put(value, key);
        return await CURDHandler.call(this, IDBrequest);
    }

    /**
     * 通过主键或索引对应的数据
     * 如果通过主键查找，不需要放入keyPath
     * 如果查找数组中的元素，只能使用该方法
     */
    async findByKeypath(query: FindOptions) {
        const IDBrequest = query.keyPath
            ? //? 使用索引查找
              this.store.index(query.keyPath).getAll(query.query, query.count)
            : //? 没有用索引会使用主键查找
              this.store.get(query.query!);

        return await CURDHandler.call(this, IDBrequest);
    }

    /**
     * 查找符合条件的数据 性能消耗比其它的大
     */
    async find(query: object): Promise<any[]> {
        const cursorFinder = this.store.openCursor();
        const keys = Object.keys(query);
        return new Promise((resolve, reject) => {
            const result: any[] = [];

            cursorFinder.onerror = () => {
                reject("查询失败");
            };

            cursorFinder.onsuccess = (e) => {
                const cursor: IDBCursorWithValue = (e.target as any).result;
                if (cursor) {
                    const value = cursor.value;
                    let isFind = true;
                    for (const key of keys) {
                        if (!isSame(value[key], query[key])) {
                            isFind = false;
                        }
                    }
                    if (isFind) result.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(result);
                }
            };
        });
    }

    /**
     * 查找表中含有该键的所有数据 不放入参数会查找所有数据
     */
    async findAll(): Promise<any>;
    async findAll(index: string): Promise<any>;
    async findAll(index?: string) {
        const cursorFinder = this.store.openCursor();

        return new Promise((resolve, reject) => {
            const result: any = [];

            cursorFinder.onerror = () => {
                reject("查询失败");
            };

            if (index) {
                //? 查找指定索引
                cursorFinder.onsuccess = (e) => {
                    let cursor: IDBCursorWithValue = (e.target as any).result;
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
                cursorFinder.onsuccess = (e) => {
                    let cursor: IDBCursorWithValue = (e.target as any).result;
                    if (cursor) {
                        result.push(cursor.value);
                        cursor.continue();
                    } else {
                        resolve(result);
                    }
                };
            }
        });
    }

    /**
     * 获得该表有多少条数据
     */
    async count(): Promise<number>;
    /**
     * 获得指定范围内的数据条数
     */
    async count(key: IDBValidKey | IDBKeyRange): Promise<number>;
    async count(key?: IDBValidKey | IDBKeyRange) {
        let IDBrequest = this.store.count(key);

        return await CURDHandler.call(this, IDBrequest);
    }

    /**
     * 清除该表数据
     */
    async clear() {
        let IDBrequest = this.store.clear();
        let result = await CURDHandler.call(this, IDBrequest);
        return result ? false : true;
    }
}

async function CURDHandler(this: IDBTable, IDBRequest: IDBRequest) {
    return new Promise((resolve, reject) => {
        IDBRequest.onsuccess = (e) => {
            resolve((e.target as any).result);
        };
        IDBRequest.onerror = (e) => {
            reject((e.target as any).result);
        };
    });
}

function changeProperties(changed: object, changedTo: object, methods: keyof UpdateOptions): void {
    switch (methods) {
        case "$set":
            for (const key in changedTo) {
                changed[key] = changedTo[key];
            }
            break;
        case "$push":
            for (const key in changedTo) {
                changed[key].push(changedTo[key]);
            }
            break;
        case "$pull":
            for (const key in changedTo) {
                removeItem(changed[key], key, true);
            }
            break;
        case "$inc":
            for (const key in changedTo) {
                changed[key] += changedTo[key];
            }
            break;
    }
}
