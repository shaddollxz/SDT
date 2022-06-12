import SliderHelper from "./SliderHelper";
import type { Ref } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{}, {
    props: {
        modelValue?: number | undefined;
    };
    emit: {
        (name: "update:modelValue", n: number): void;
        (name: "onDragStart", percent: number): void;
        (name: "onDragging", percent: number): void;
        (name: "onDrop", percent: number): void;
    };
    slider: Ref<HTMLDivElement | null>;
    position: Ref<number>;
    isCanMove: boolean;
    sliderHelper: SliderHelper;
    getSliderDetail: () => {
        x: number;
        width: number;
    };
    mouseDownHandler: (e: MouseEvent) => void;
    mouseUpHandler: (e: MouseEvent) => void;
    mouseMoveHandler: (e: MouseEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "onDragStart" | "onDragging" | "onDrop")[], "update:modelValue" | "onDragStart" | "onDragging" | "onDrop", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onOnDragStart?: ((...args: any[]) => any) | undefined;
    onOnDragging?: ((...args: any[]) => any) | undefined;
    onOnDrop?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
