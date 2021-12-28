import DraggableList from "./DraggableList.vue";
import type { App } from "vue";

export default {
    install(app: App) {
        app.component("DraggableList", DraggableList);
    },
};
export type { Props as DraggableListProps } from "./DraggableList.vue";
