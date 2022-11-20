declare const _sfc_main: import("vue").DefineComponent<{
    defaultValue: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    lazyRender: {
        type: BooleanConstructor;
        required: false;
    };
}, {
    props: {
        defaultValue: boolean;
        modelValue: boolean;
        lazyRender?: boolean | undefined;
    };
    emit: {
        (n: "onOpen"): void;
        (n: "onClose"): void;
        (n: "update:modelValue", v: boolean): void;
    };
    isRender: import("vue").Ref<boolean>;
    isShow: import("vue").Ref<boolean>;
    isOpen: import("vue").ComputedRef<boolean>;
    onClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "onOpen" | "onClose")[], "update:modelValue" | "onOpen" | "onClose", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    defaultValue: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        required: false;
        default: undefined;
    };
    lazyRender: {
        type: BooleanConstructor;
        required: false;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onOnOpen?: ((...args: any[]) => any) | undefined;
    onOnClose?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: boolean;
    defaultValue: boolean;
    lazyRender: boolean;
}>;
export default _sfc_main;
