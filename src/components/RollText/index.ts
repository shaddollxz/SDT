import type { App } from "vue";
import RollText from "./RollText.vue";

export default {
    install(app: App) {
        app.component("RollText", RollText);
    },
};
