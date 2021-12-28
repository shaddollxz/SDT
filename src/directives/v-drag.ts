import type { App, DirectiveBinding } from "vue";
import { nextTick } from "vue";

export default {
    install(app: App) {
        app.directive("draggable", {
            mounted: draggableMounted,
            updated: draggableUpdated,
        });
        app.directive("dragtraget", {
            mounted: targetMounted,
        });
    },
};

interface ImgSetting {
    pic: string | Element;
    x?: number;
    y?: number;
}
export type DraggableOptions = {
    draggable?: boolean;
    data?: any;
    onDragstart?: (e: DragEvent) => void;
    onDrag?: (e: DragEvent) => void;
    onDragend?: (e: DragEvent) => void;
    img?: () => ImgSetting;
} & ThisType<HTMLElement>;

const map = new WeakMap();
let dragging: Element | null; // 被拖放元素 e.relatedTarget不准确 要手动记录

function draggableMounted(el: HTMLElement, options: DirectiveBinding<DraggableOptions>) {
    el.draggable = options.value.draggable ?? true;
    //todo 设置拖拽的数据
    map.set(el, options.value.data);

    function dragstartHandler(this: HTMLElement, e: DragEvent) {
        if (e.target !== el) return; // 在嵌套的时候确保只有这个元素在动
        dragging = el;
        e.dataTransfer!.effectAllowed = "all";
        //todo 拖拽开始时用户的自定义回调
        options.value.onDragstart?.call(this, e);

        //todo 设置拖拽时的图片
        nextTick(() => {
            if (options.value.img) {
                let { pic, x = 0, y = 0 } = options.value.img.call(this);
                let img: Element;

                if (typeof pic == "string") {
                    img = new Image(); // 虽然能设置元素大小 但是拖拽时仍然是原图大小
                    (img as HTMLImageElement).src = pic;
                } else {
                    img = pic;
                }

                e.dataTransfer?.setDragImage(img, x, y);
            }
        });
    }
    function dragHandler(this: HTMLElement, e: DragEvent) {
        e.preventDefault();
        options.value.onDrag!.call(this, e);
    }
    function dragendHandler(this: HTMLElement, e: DragEvent) {
        e.preventDefault();
        options.value.onDragend!.call(this, e);
    }

    el.addEventListener("dragstart", dragstartHandler);
    options.value.onDrag ? el.addEventListener("drag", dragHandler) : null;
    options.value.onDragend ? el.addEventListener("dragend", dragendHandler) : null;
}
// 更新绑定的数据
function draggableUpdated(el: HTMLElement, options: DirectiveBinding<DraggableOptions>) {
    el.draggable = options.value.draggable ?? true;
    map.set(el, options.value.data);
}

export type TargetOptions<T = any> = {
    style?: DataTransfer["dropEffect"];
    onDrop?: (data: T, e: DragEvent, dragging: Element) => void;
    onDragenter?: (data: T, e: DragEvent, dragging: Element) => void;
    onDragover?: (data: T, e: DragEvent, dragging: Element) => void;
    onDragleave?: (data: T, e: DragEvent, dragging: Element) => void;
} & ThisType<HTMLElement>;

function targetMounted(el: HTMLElement, options: DirectiveBinding<TargetOptions>) {
    let data: any;

    function dragenterHandler(this: HTMLElement, e: DragEvent) {
        e.preventDefault();
        data = map.get(dragging!);
        options.value?.onDragenter?.call(this, data, e, dragging!);
    }
    function dragoverHandler(this: HTMLElement, e: DragEvent) {
        e.preventDefault();
        if (options.value.style) {
            e.dataTransfer!.dropEffect = options.value.style;
        }
        options.value.onDragover?.call(this, data, e, dragging!);
    }
    function dragleaveHandler(this: HTMLElement, e: DragEvent) {
        options.value.onDragleave!.call(this, data, e, dragging!);
    }
    function dropHandler(this: HTMLElement, e: DragEvent) {
        e.preventDefault();
        options.value.onDrop!.call(this, data, e, dragging!);
        dragging = null;
    }

    el.addEventListener("dragenter", dragenterHandler);
    options.value.onDragover || options.value.style
        ? el.addEventListener("dragover", dragoverHandler)
        : (el.ondragover = () => false); // 必须阻止enter和over的默认事件才会变成可放置
    options.value.onDragleave ? el.addEventListener("dragleave", dragleaveHandler) : null;
    options.value.onDrop ? el.addEventListener("drop", dropHandler) : null;
}
