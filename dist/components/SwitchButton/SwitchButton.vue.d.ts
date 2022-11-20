declare const _sfc_main: import("vue").DefineComponent<{}, {
    props: {
        modelValue: boolean;
        defaultValue: boolean;
    };
    emit: {
        (e: "update:modelValue", v: boolean): void;
        (e: "onStatuChange", v: boolean): void;
    };
    isChosed: import("vue").Ref<boolean>;
    statuChange: (newValue?: boolean | undefined) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "onStatuChange")[], "update:modelValue" | "onStatuChange", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onOnStatuChange?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
