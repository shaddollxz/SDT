import SwitchButton from "./SwitchButton.vue";
import type { App } from "vue";

export default {
    install(app: App) {
        app.component("SwitchButton", SwitchButton);
    },
};
