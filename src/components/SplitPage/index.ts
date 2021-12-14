import SplitPage from "./SplitPage.vue";
import type { App } from "vue";

export default {
    install(app: App) {
        app.component("SplitPage", SplitPage);
    },
};
