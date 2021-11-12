import "./style/gusto.less";

import * as directives from "./directives";
import * as components from "./components";

// 默认导出全局的组件和指令
const plugins = { ...directives, ...components };
export default {
    install(app) {
        for (const name in plugins) {
            app.use(plugins[name]);
        }
    },
};

// 按需导出全局组件或指令
export { RollText, SliderBox, SplitPage, SwitchButton } from "./components";
export { VFill, VHidden } from "./directives";

// 导出需要函数渲染的组件
export { default as Message } from "./components/Message";

// 导出方法
export { default as AsyncConstructor } from "./methods/AsyncConstructor.js";
export { default as LimitArray } from "./methods/LimitArray.js";
export { default as LocalFiles } from "./methods/LocalFiles.js";
export { default as LocalStorage } from "./methods/LocalStorage.js";
export { default as Random } from "./methods/Random.js";
export { default as SDDate } from "./methods/SDDate.js";
export { default as SDIDB } from "./methods/SDIDB.js";
export { default as SDMath } from "./methods/SDMath.js";
export { default as SingletonConstructor } from "./methods/SingletonConstructor.js";
export { default as replaceObj } from "./methods/replaceObj.js";
export { default as deepClone } from "./methods/deepClone.js";
export { default as debounce } from "./methods/deounce.js";
export { default as deleteEmpty } from "./methods/deleteEmpty.js";
export { default as isSame } from "./methods/isSame.js";
export { default as isEmpty } from "./methods/isEmpty.js";
export { default as rollTo } from "./methods/rollTo.js";
export { default as throttle } from "./methods/throttle.js";
export { default as userBrowers } from "./methods/userBrowers.js";
export { default as Validator } from "./methods/Validator.js";
