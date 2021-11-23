import type { App } from "vue";
import "../style/colors.css";

import $RollText from "./RollText/index.vue";
export const RollText = {
    install(app: App) {
        app.component("RollText", $RollText);
    },
};

import $SliderBox from "./SliderBox/index.vue";
export const SliderBox = {
    install(app: App) {
        app.component("SliderBox", $SliderBox);
    },
};

import $SplitPage from "./SplitPage/index.vue";
export const SplitPage = {
    install(app: App) {
        app.component("SplitPage", $SplitPage);
    },
};

import $SwitchButton from "./SwitchButton/index.vue";
export const SwitchButton = {
    install(app: App) {
        app.component("SwitchButton", $SwitchButton);
    },
};
