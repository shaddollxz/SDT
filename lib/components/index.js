import "../style/colors.css";

import $RollText from "./RollText/index.vue";
export const RollText = {
    install(app) {
        app.component("RollText", $RollText);
    },
};

import $SliderBox from "./SliderBox/index.vue";
export const SliderBox = {
    install(app) {
        app.component("SliderBox", $SliderBox);
    },
};

import $SplitPage from "./SplitPage/index.vue";
export const SplitPage = {
    install(app) {
        app.component("SplitPage", $SplitPage);
    },
};

import $SwitchButton from "./SwitchButton/index.vue";
export const SwitchButton = {
    install(app) {
        app.component("SwitchButton", $SwitchButton);
    },
};
