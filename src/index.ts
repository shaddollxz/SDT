import type { App } from "vue";

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
export { RollText, LazyLoadBox, SplitPage, SwitchButton, CheckBox, DropDown } from "./components";
export { VFill, VHidden, VDrag } from "./directives";

// 导出组件或指令的类型
export type { VDragType } from "./directives";

// 导出需要函数渲染的组件
export { default as Message } from "./components/Message";

// 导出方法
export { default as AsyncConstructor } from "./methods/AsyncConstructor";
export { capitalize, unCapitalize } from "./methods/capitalize";
export { default as debounce } from "./methods/debounce";
export { default as deepClone } from "./methods/deepClone";
export { isEmpty, deleteEmpty } from "./methods/checkEmpty";
export { default as isMobile } from "./methods/isMobile";
export { default as isSame } from "./methods/isSame";
export { default as iterable } from "./methods/iterable";
export { default as LocalFiles } from "./methods/LocalFiles";
export { default as LocalStorage } from "./methods/LocalStorage";
export { default as Random } from "./methods/Random";
export { default as removeItem } from "./methods/removeItem";
export { default as SDDate } from "./methods/SDDate";
export { default as SDIDB } from "./methods/SDIDB";
export type { SDIDBTable } from "./methods/SDIDB";
export { default as SDMath } from "./methods/SDMath";
export { default as throttle } from "./methods/throttle";
export { default as updateProperties } from "./methods/updateProperties";
export type { UpdatePropertiesOptions } from "./methods/updateProperties";
export { default as userBrowers } from "./methods/userBrowers";
export { default as Validator } from "./methods/Validator";

export * from "./typings/utils";
