import RollText from "./rollText.vue";
import SliderBox from "./sliderBox.vue";

export default {
    install(app) {
        app.component("RollText", RollText).component("SliderBox", SliderBox);
    },
};
