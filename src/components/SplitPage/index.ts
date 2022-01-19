import type { App } from "vue";
import SplitPage from "./SplitPage.vue";

export default {
    install(app: App) {
        app.component("SplitPage", SplitPage);
    },
};
