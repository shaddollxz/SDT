export { default as VFill } from "./v-fill";
export { default as VHidden } from "./v-hidden";
export { default as VDrag } from "./v-drag";
declare namespace VDragType {
    type DraggableOptions<T = any> = import("./v-drag").DraggableOptions<T>;
    type TargetOptions<T = any> = import("./v-drag").TargetOptions<T>;
}
export type { VDragType };
