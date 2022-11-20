declare const _sfc_main: import("vue").DefineComponent<{}, {
    props: {
        duration: number;
        direction: "top" | "bottom" | "left" | "right";
        reHidden?: boolean | undefined;
        lazyRender?: boolean | undefined;
    };
    emit: {
        (n: "onShow"): void;
        (n: "onReHidden"): void;
    };
    observer: import("vue").ShallowRef<HTMLElement | null>;
    animeClass: import("vue").Ref<string>;
    isRender: import("vue").Ref<boolean>;
    io: IntersectionObserver;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("onShow" | "onReHidden")[], "onShow" | "onReHidden", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onOnShow?: ((...args: any[]) => any) | undefined;
    onOnReHidden?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
