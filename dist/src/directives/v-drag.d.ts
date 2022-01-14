declare const _default: {
    install(app: App): void;
};
export default _default;
interface ImgSetting {
    pic: string | Element;
    x?: number;
    y?: number;
}
export interface DraggableOptions<T = any> {
    draggable?: boolean;
    data?: T;
    onDragstart?: (this: HTMLElement, e: DragEvent) => void;
    onDrag?: (this: HTMLElement, e: DragEvent) => void;
    onDragend?: (this: HTMLElement, e: DragEvent) => void;
    img?: () => ImgSetting;
}
export interface TargetOptions<T = any> {
    style?: DataTransfer["dropEffect"];
    onDrop?: (this: HTMLElement, data: T, e: DragEvent, dragging: Element) => void;
    onDragenter?: (this: HTMLElement, data: T, e: DragEvent, dragging: Element) => void;
    onDragover?: (this: HTMLElement, data: T, e: DragEvent, dragging: Element) => void;
    onDragleave?: (this: HTMLElement, data: T, e: DragEvent, dragging: Element) => void;
}
