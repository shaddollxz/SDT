import type { App } from "vue";
declare const _default: {
    install(app: App): void;
};
export default _default;
export { RollText, LazyLoadBox, SplitPage, SwitchButton, CheckBox, DropDown } from "./components";
export { VFill, VHidden, VDrag } from "./directives";
export type { VDragType } from "./directives";
export { default as Message } from "./components/Message";
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
import "./globalComponents";