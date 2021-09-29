/**
 * 通过继承该类在super上传入异步箭头函数实现异步实例化
 * 该类不能被实例化
 */
export default class AsyncConstructor {
    constructor(asyncConstructor) {
        if (new.target.name == "AsyncConstructor") return null;

        const init = (async () => {
            await Promise.resolve(); //! 在回调执行前开启一次微任务，回调里就能随意使用this
            await asyncConstructor();
            delete this.then;
            return this;
        })();
        this.then = init.then.bind(init);
    }
}
