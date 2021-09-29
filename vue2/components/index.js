import RollText from "./rollText.vue";
import SliderBox from "./sliderBox.vue";

export default {
    install(Vue) {
        Vue.component("RollText", RollText);
        Vue.component("SliderBox", SliderBox);
    },
};
