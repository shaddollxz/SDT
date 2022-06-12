declare const _sfc_main: import("vue").DefineComponent<{}, {
    props: {
        duration: number;
        direction: "top" | "bottom" | "left" | "right";
        isReHidden: boolean;
    };
    emit: (n: "onShow") => void;
    observer: import("vue").ShallowRef<HTMLElement | null>;
    animeClass: import("vue").Ref<string>;
    io: IntersectionObserver;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "onShow"[], "onShow", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onOnShow?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
