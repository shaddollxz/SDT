import type { App } from "vue";
declare const _default: {
    install(app: App): void;
};
export default _default;
interface ImgSetting {
    pic: string | Element;
    x?: number;
    y?: number;
}
export declare type DraggableOptions = {
    draggable?: boolean;
    data?: any;
    onDragstart?: (e: DragEvent) => void;
    onDrag?: (e: DragEvent) => void;
    onDragend?: (e: DragEvent) => void;
    img?: () => ImgSetting;
} & ThisType<HTMLElement>;
export declare type TargetOptions<T = any> = {
    style?: DataTransfer["dropEffect"];
    onDrop?: (data: T, e: DragEvent, dragging: Element) => void;
    onDragenter?: (data: T, e: DragEvent, dragging: Element) => void;
    onDragover?: (data: T, e: DragEvent, dragging: Element) => void;
    onDragleave?: (data: T, e: DragEvent, dragging: Element) => void;
} & ThisType<HTMLElement>;
