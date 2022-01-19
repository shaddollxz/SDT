import type { App } from "vue";
import SliderBox from "./SliderBox.vue";

export default {
    install(app: App) {
        app.component("SliderBox", SliderBox);
    },
};
