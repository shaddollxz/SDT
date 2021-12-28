/** 给volar插件提供全局组件提示 */
import "@vue/runtime-core";

declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        DraggableList: typeof import("sdt3/src/components/DraggableList/DraggableList.vue").default;
        RollText: typeof import("sdt3/src/components/RollText/RollText.vue").default;
        SliderBox: typeof import("sdt3/src/components/SliderBox/SliderBox.vue").default;
        SplitPage: typeof import("sdt3/src/components/SplitPage/SplitPage.vue").default;
        SwitchButton: typeof import("sdt3/src/components/SwitchButton/SwitchButton.vue").default;
    }
}
