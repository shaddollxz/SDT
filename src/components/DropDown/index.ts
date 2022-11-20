import type { App } from "vue";
import DropDown from "./DropDown.vue";

export default {
    install(app: App) {
        app.component("DropDown", DropDown);
    },
};
