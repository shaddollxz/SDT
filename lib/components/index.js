import $RollText from "./rollText.vue";
import $SliderBox from "./sliderBox.vue";

export const RollText = {
    install(app) {
        app.component("RollText", $RollText);
    },
};
export const SliderBox = {
    install(app) {
        app.component("SliderBox", $SliderBox);
    },
};
