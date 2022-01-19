import type { App } from "vue";
import Slider from "./Slider.vue";

export default {
    install(app: App) {
        app.component("Slider", Slider);
    },
};
