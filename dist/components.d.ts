/** 给volar插件提供全局组件提示 */
import "@vue/runtime-core";

declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        RollText: typeof import("sdt3/src/components/RollText/index.vue").default;
        SliderBox: typeof import("sdt3/src/components/SliderBox/index.vue").default;
        SplitPage: typeof import("sdt3/src/components/SplitPage/index.vue").default;
        SwitchButton: typeof import("sdt3/src/components/SwitchButton/index.vue").default;
    }
}
