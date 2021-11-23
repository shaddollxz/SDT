import type { App } from "vue";
import "./style/gusto.less";

import * as directives from "./directives";
import * as components from "./components";

// 默认导出全局的组件和指令
const plugins = { ...directives, ...components };
export default {
    install(app: App) {
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
export { default as AsyncConstructor } from "./methods/AsyncConstructor";
export { default as LocalFiles } from "./methods/LocalFiles";
export { default as LocalStorage } from "./methods/LocalStorage";
export { default as Random } from "./methods/Random";
export { default as SDDate } from "./methods/SDDate";
export { default as SDIDB } from "./methods/SDIDB";
export { default as SDMath } from "./methods/SDMath";
export { default as removeItem } from "./methods/removeItem";
export { default as replaceObj } from "./methods/replaceObj";
export { default as deepClone } from "./methods/deepClone";
export { default as debounce } from "./methods/debounce";
export { default as deleteEmpty } from "./methods/deleteEmpty";
export { default as isSame } from "./methods/isSame";
export { default as isEmpty } from "./methods/isEmpty";
export { default as throttle } from "./methods/throttle";
export { default as userBrowers } from "./methods/userBrowers";
export { default as Validator } from "./methods/Validator";
