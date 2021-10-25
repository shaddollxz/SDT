import * as directives from "./directives";
import * as components from "./components";

// 默认导出全部的组件和指令
const plugins = { ...directives, ...components };
export default {
    install(app) {
        for (const name in plugins) {
            app.use(plugins[name]);
        }
    },
};
// 导出全部组件
export const Components = {
    install(app) {
        for (const name in components) {
            app.use(components[name]);
        }
    },
};
// 导出全部指令
export const Directives = {
    install(app) {
        for (const name in directives) {
            app.use(directives[name]);
        }
    },
};

// 导出需要函数渲染的组件
import Message from "./components/Message";
export { Message };

// 导出方法
import AsyncConstructor from "./methods/AsyncConstructor.js";
import LimitArray from "./methods/LimitArray.js";
import LocalFiles from "./methods/LocalFiles.js";
import LocalStorage from "./methods/LocalStorage.js";
import Random from "./methods/Random.js";
import SDDate from "./methods/SDDate.js";
import SDIDB from "./methods/SDIDB.js";
import SDMath from "./methods/SDMath.js";
import SingletonConstructor from "./methods/SingletonConstructor.js";
import concat from "./methods/replaceObj.js";
import deepClone from "./methods/deepClone.js";
import debounce from "./methods/deounce.js";
import deleteEmpty from "./methods/deleteEmpty.js";
import isSame from "./methods/isSame.js";
import isEmpty from "./methods/isEmpty.js";
import rollTo from "./methods/rollTo.js";
import throttle from "./methods/throttle.js";
import userBrowers from "./methods/userBrowers.js";
import Validator from "./methods/Validator.js";

export {
    AsyncConstructor,
    LimitArray,
    LocalFiles,
    LocalStorage,
    Random,
    SDDate,
    SDIDB,
    SDMath,
    SingletonConstructor,
    Validator,
    concat,
    deepClone,
    debounce,
    deleteEmpty,
    isEmpty,
    isSame,
    rollTo,
    throttle,
    userBrowers,
};
