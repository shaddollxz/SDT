import AsyncConstructor from "./AsyncConstructor";
declare type StringKeys<T extends object> = T extends {
    [K in infer R]: any;
} ? R extends string ? R : never : never;
declare type Index<KeyNames extends string> = Record<string, {
    path?: KeyNames | KeyNames[];
    unique?: boolean;
    multiEntry?: boolean;
}>;
interface DefineTableSetting<KeyNames extends string> {
    keypath?: string;
    index?: Index<KeyNames>;
}
/**
 * indexDB的封装 该类支持异步实例化
 * @example
 * const db = await new SDIDB("test")
 * const useTable = db.defindeTabel("table",[key1,key2],{keyPath:"id",index:{a:{}}})
 * const table = useTable()
 * let a = await table.findByKeypath("a")
 */
export default class SDIDB extends AsyncConstructor {
    readonly name: string;
    protected _version: number;
    protected _tableList: string[];
    constructor(name: string);
    /**
     * 打开或升级数据库
     * 打开时不需要参数
     * 升级只有两种情况，新建表或删除表
     */
    private openDB;
    /**
     * 删除指定的表
     */
    removeTable(tableName: string): Promise<void>;
    /**
     * 创建新的表
     * 只有不设置主键和索引时才能直接放入对象以外的数据
     * 如果储存的是数组 只有设置为索引才能通过数组内元素直接查找
     */
    defineTable(tableName: string): Promise<() => IDBTable<any, any, any>>;
    defineTable<KeyPath extends string, KeyNames extends string, IndexSetting extends Index<KeyNames>>(tableName: string, _keys?: KeyNames[], indexs?: {
        keyPath?: KeyPath;
        index?: IndexSetting;
    }): Promise<() => IDBTable<KeyPath, KeyNames, StringKeys<IndexSetting>>>;
    /**
     * 删库跑路
     * @param dbname 数据库名字
     */
    static deleteDB(dbname: string): void;
    get version(): number;
    get tables(): string[];
}
declare type TableRow<KeyPath extends string, KeyNames extends string> = Record<KeyPath, any> & Partial<Record<KeyNames, any>> & Partial<Record<string, any>>;
interface FindOptions<KeyPath, IndexNames> {
    query: IDBValidKey | IDBKeyRange;
    index: KeyPath | IndexNames;
    count?: number;
}
interface UpdateOptions {
    $set?: object;
    $inc?: {
        [key in string]: number;
    };
    $push?: {
        [key in string]: object | object[];
    };
    $pull?: {
        [key in string]: object | object[];
    };
}
/** 数据库表 通过调用SDIDB的defineTable返回函数获得 */
declare class IDBTable<KeyPath extends string, KeyNames extends string, IndexNames extends string> {
    readonly dbName: string;
    readonly tableName: string;
    readonly tableSetting?: DefineTableSetting<KeyNames> | undefined;
    protected store: IDBObjectStore;
    constructor(dbName: string, tableName: string, tableSetting?: DefineTableSetting<KeyNames> | undefined);
    /**
     * 给指定的表添加数据
     * @async
     * @param data 添加进表的数据 如果设定了主键必须为含主键的对象
     */
    insert(value: TableRow<KeyPath, KeyNames>): Promise<any>;
    insert(value: TableRow<KeyPath, KeyNames>, key: IDBValidKey): Promise<any>;
    /**
     * 删除指定主键的一行
     */
    remove(keyPath: KeyPath | IndexNames | IDBValidKey | IDBKeyRange): Promise<unknown>;
    /**
     * 更新表数据
     * @param query 修改数据的查询，如果有多个结果只修改第一条
     * @param update 修改的数据 和mongoose的使用一样
     * @param key 如果该表没有主键，会有一个自增长的key，把这个key放入，否则数据会被新增而不是更新
     */
    update(query: Record<KeyNames, any>, update: UpdateOptions, key?: IDBValidKey): Promise<any>;
    /**
     * 通过主键或索引查找并修改
     */
    updateByKeypath(query: string, update: UpdateOptions): Promise<TableRow<KeyPath, KeyNames>>;
    updateByKeypath(query: FindOptions<KeyPath, IndexNames>, update: UpdateOptions): Promise<TableRow<KeyPath, KeyNames>>;
    /**
     * 通过主键或索引对应的数据
     * 如果通过主键查找，不需要放入keyPath
     * 如果查找数组中的元素，只能使用该方法
     */
    findByKeypath(keyPathValue: string): Promise<TableRow<KeyPath, KeyNames>[]>;
    findByKeypath(query: FindOptions<KeyPath, IndexNames>): Promise<TableRow<KeyPath, KeyNames>[]>;
    /**
     * 查找符合条件的数据 性能消耗比其它的大
     */
    find(query: Partial<Record<KeyNames, any>>): Promise<any[]>;
    /**
     * 查找表中含有该键的所有数据 不放入参数会查找所有数据
     */
    findAll(): Promise<any>;
    findAll(index: KeyPath | KeyNames): Promise<any>;
    /**
     * 获得该表有多少条数据
     */
    count(): Promise<number>;
    /**
     * 获得指定范围内的数据条数
     */
    count(key: KeyPath | IndexNames | IDBKeyRange): Promise<number>;
    /**
     * 清除该表数据
     */
    clear(): Promise<boolean>;
}
export {};
