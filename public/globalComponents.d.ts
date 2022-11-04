// @ts-nocheck
/** 给volar插件提供全局组件提示 */
import "vue";

declare module "vue" {
    export interface GlobalComponents {
        RollText: typeof import("sdt3/src/components/RollText/RollText.vue").default;
        LazyLoadBox: typeof import("sdt3/src/components/LazyLoadBox/LazyLoadBox.vue").default;
        Slider: typeof import("sdt3/src/components/Slider/Slider.vue").default;
        SplitPage: typeof import("sdt3/src/components/SplitPage/SplitPage.vue").default;
        SwitchButton: typeof import("sdt3/src/components/SwitchButton/SwitchButton.vue").default;
        CheckBox: typeof import("sdt3/src/components/CheckBox/CheckBox.vue").default;
    }
}
