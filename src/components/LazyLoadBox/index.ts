import type { App } from "vue";
import LazyLoadBox from "./LazyLoadBox.vue";

export default {
    install(app: App) {
        app.component("LazyLoadBox", LazyLoadBox);
    },
};
