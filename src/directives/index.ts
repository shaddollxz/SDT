export { default as VFill } from "./v-fill";
export { default as VHidden } from "./v-hidden";
export { default as VDrag } from "./v-drag";

namespace VDragType {
    export type DraggableOptions<T = any> = import("./v-drag").DraggableOptions<T>;
    export type TargetOptions<T = any> = import("./v-drag").TargetOptions<T>;
}
export type { VDragType };
