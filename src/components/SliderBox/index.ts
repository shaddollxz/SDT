import SliderBox from "./SliderBox.vue";
import type { App } from "vue";

export default {
    install(app: App) {
        app.component("SliderBox", SliderBox);
    },
};
