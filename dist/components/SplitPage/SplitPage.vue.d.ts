import type { NumberString } from "../../typings/utils";
declare const _sfc_main: import("vue").DefineComponent<{}, {
    props: {
        modelValue?: any[] | undefined;
        limit: number | NumberString;
        totalPage: number | NumberString;
        currentPage?: number | `${number}` | undefined;
    };
    emit: {
        (e: "update:modelValue", v: Array<any>): void;
        (e: "onPageChange", v: number): void;
        (e: "getNewData", v: number): void;
    };
    pageCache: any;
    btns: import("vue").Ref<{
        max: number;
        limit: number;
        limitHalf: number;
        showArr: (string | number)[];
        refreshList: () => void;
        curr: number;
        next: () => void;
        prev: () => void;
    }>;
    jumpPage: import("vue").Ref<number>;
    changePage: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "onPageChange" | "getNewData")[], "update:modelValue" | "onPageChange" | "getNewData", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onOnPageChange?: ((...args: any[]) => any) | undefined;
    onGetNewData?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
