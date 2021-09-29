/**
 * 通过继承该类并在super中写入构造函数
 * 该类就会成为单例模式，只生成一个实例
 */
export default class SingletonConstructor {
    constructor(Constructor) {
        const className = new.target.name;
        if (className == "SingletonConstructor") return null;

        if (instances[className]) {
            return instances[className];
        } else {
            const instance = new Constructor();
            Object.setPrototypeOf(instance, new.target.prototype);
            return (instances[className] = instance);
        }
    }
}
const instances = Object.create(null);
