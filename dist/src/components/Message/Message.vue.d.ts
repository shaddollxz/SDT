export interface Props {
    text: string;
    type: "default" | "success" | "error";
    duration: number;
    isCanClose: boolean;
    align: "left" | "right" | "center";
    style?: StyleValue;
    leaveTo: "top" | "left" | "bottom" | "right";
    onClose?: (el: Element) => void;
}
import type { StyleValue } from "vue";
declare const _sfc_main: import("vue").DefineComponent<unknown, object, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<unknown>, {}>;
export default _sfc_main;
