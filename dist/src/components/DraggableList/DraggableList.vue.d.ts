import type { VDragType } from "../../directives";
interface Props {
    modelValue: {
        value: string;
        _key?: string;
        draggable?: boolean;
        img?: VDragType.DraggableOptions["img"];
        children?: Props["modelValue"];
        [key: string]: any;
    }[];
    onDragstart?: VDragType.DraggableOptions["onDragstart"];
    onDragend?: VDragType.DraggableOptions["onDragend"];
    onDrag?: VDragType.DraggableOptions["onDrag"];
    onDragover?: VDragType.TargetOptions<TransferData>["onDragover"];
    onDragleave?: VDragType.TargetOptions<TransferData>["onDragleave"];
    onDragenter?: VDragType.TargetOptions<TransferData>["onDragenter"];
    onDrop?: VDragType.TargetOptions<TransferData>["onDrop"];
    onTargetChanged?: VDragType.TargetOptions<TransferData>["onDragover"];
}
interface TransferData {
    list: Props["modelValue"] & {
        readonly _key: string;
    }[];
    item: TransferData["list"][number];
    index: number;
    chosedIndex: {
        value: number;
    };
}
declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: ArrayConstructor;
        required: true;
    };
    onDragstart: {
        type: null;
        required: false;
    };
    onDragend: {
        type: null;
        required: false;
    };
    onDrag: {
        type: null;
        required: false;
    };
    onDragover: {
        type: null;
        required: false;
    };
    onDragleave: {
        type: null;
        required: false;
    };
    onDragenter: {
        type: null;
        required: false;
    };
    onDrop: {
        type: null;
        required: false;
    };
    onTargetChanged: {
        type: null;
        required: false;
    };
}, {
    props: {
        modelValue: {
            [key: string]: any;
            value: string;
            _key?: string | undefined;
            draggable?: boolean | undefined;
            img?: VDragType.DraggableOptions["img"];
            children?: {
                [key: string]: any;
                value: string;
                _key?: string | undefined;
                draggable?: boolean | undefined;
                img?: VDragType.DraggableOptions["img"];
                children?: any[] | undefined;
            }[] | undefined;
        }[];
        onDragstart?: VDragType.DraggableOptions["onDragstart"];
        onDragend?: VDragType.DraggableOptions["onDragend"];
        onDrag?: VDragType.DraggableOptions["onDrag"];
        onDragover?: VDragType.TargetOptions<TransferData>["onDragover"];
        onDragleave?: VDragType.TargetOptions<TransferData>["onDragleave"];
        onDragenter?: VDragType.TargetOptions<TransferData>["onDragenter"];
        onDrop?: VDragType.TargetOptions<TransferData>["onDrop"];
        onTargetChanged?: VDragType.TargetOptions<TransferData>["onDragover"];
    };
    emit: (e: "update:modelValue", v: Props["modelValue"]) => void;
    list: {
        [x: string]: any;
        value: string;
        _key?: string | undefined;
        draggable?: boolean | undefined;
        img?: VDragType.DraggableOptions["img"];
        children?: any[] | undefined;
    }[];
    chosedEle: HTMLElement;
    chosedIndex: {
        value: number;
    };
    copyEle: HTMLElement;
    getOptions: (item: Props["modelValue"][number], index: number) => VDragType.DraggableOptions;
    targetOptions: import("../../directives/v-drag").TargetOptions<TransferData>;
    changeIndex: (arr: any[], from: number, to: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    onDragstart?: unknown;
    onDragend?: unknown;
    onDrag?: unknown;
    onDragover?: unknown;
    onDragleave?: unknown;
    onDragenter?: unknown;
    onDrop?: unknown;
    onTargetChanged?: unknown;
} & {
    modelValue: unknown[];
} & {
    onDragstart?: any;
    onDragend?: any;
    onDrag?: any;
    onDragover?: any;
    onDragleave?: any;
    onDragenter?: any;
    onDrop?: any;
    onTargetChanged?: any;
}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
