import type { App } from "vue";
import CheckBox from "./CheckBox.vue";

export default {
    install(app: App) {
        app.component("CheckBox", CheckBox);
    },
};
