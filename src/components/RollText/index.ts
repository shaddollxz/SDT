import RollText from "./RollText.vue";
import type { App } from "vue";

export default {
    install(app: App) {
        app.component("RollText", RollText);
    },
};
