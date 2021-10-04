const instances = Object.create(null);
/**
 * 通过继承该类并在super中写入构造函数
 * 该类就会成为单例模式，只生成一个实例
 * 该类可以用来包装一个对象使之成为单例，只需要在构造函数中返回该对象
 * 这时第二个参数应该为false 且不应该继续写原型方法
 */
export default class SingletonConstructor {
    constructor(Constructor, isSetPrototype = true) {
        const className = new.target.name;
        if (className == "SingletonConstructor") throw "该类不能被实例化";

        if (instances[className]) {
            return instances[className];
        } else {
            const instance = new Constructor();
            if (isSetPrototype) {
                Object.setPrototypeOf(instance, new.target.prototype);
            }
            return (instances[className] = instance);
        }
    }
}
