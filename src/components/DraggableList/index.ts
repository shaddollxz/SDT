import type { App } from "vue";
import DraggableList from "./DraggableList.vue";

export default {
    install(app: App) {
        app.component("DraggableList", DraggableList);
    },
};
export type { Props as DraggableListProps } from "./DraggableList.vue";
