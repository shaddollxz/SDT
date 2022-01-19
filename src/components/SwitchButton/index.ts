import type { App } from "vue";
import SwitchButton from "./SwitchButton.vue";

export default {
    install(app: App) {
        app.component("SwitchButton", SwitchButton);
    },
};
