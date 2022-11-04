declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    checked: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    props: {
        modelValue: boolean;
        checked: boolean;
    };
    emit: {
        (n: "update:modelValue", v: boolean): void;
        (n: "onCheck", v: boolean): void;
    };
    isCheck: import("vue").Ref<boolean>;
    state: import("vue").ComputedRef<boolean>;
    setState: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "onCheck")[], "update:modelValue" | "onCheck", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    checked: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onOnCheck?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: boolean;
    checked: boolean;
}>;
export default _sfc_main;
