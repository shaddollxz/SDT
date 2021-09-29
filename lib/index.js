import * as directives from "./directives";
import * as components from "./components";

const plugins = { ...directives, ...components };
export default {
    install(app) {
        for (const name in plugins) {
            app.use(plugins[name]);
        }
    },
};
export const Components = {
    install(app) {
        for (const name in components) {
            app.use(components[name]);
        }
    },
};
export const Directives = {
    install(app) {
        for (const name in directives) {
            app.use(directives[name]);
        }
    },
};

import AsyncConstructor from "./methods/AsyncConstructor.js";
import LimitArray from "./methods/LimitArray.js";
import LocalStorage from "./methods/LocalStorage.js";
import Random from "./methods/Random.js";
import SDDate from "./methods/SDDate.js";
import SDIDB from "./methods/SDIDB.js";
import SDMath from "./methods/SDMath.js";
import SingletonConstructor from "./methods/SingletonConstructor.js";
import choseFiles from "./methods/choseFiles.js";
import concat from "./methods/concat.js";
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
    LocalStorage,
    Random,
    SDDate,
    SDIDB,
    SDMath,
    SingletonConstructor,
    Validator,
    choseFiles,
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
