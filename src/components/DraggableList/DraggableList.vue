<template>
    <div class="draggableList" v-dragtraget="targetOptions">
        <div
            class="item"
            v-for="(item, index) of list"
            :key="item._key"
            v-draggable="getOptions(item, index)"
        >
            {{ item.value }}
            <DraggableList v-if="item.children" v-model="item.children"></DraggableList>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { VDragType } from "../../directives";

export interface Props {
    modelValue: {
        value: string;
        _key?: string;
        draggable?: boolean;
        img?: VDragType.DraggableOptions["img"];
        children?: Props["modelValue"];
        [key: string]: any;
    }[];

    onDragstart?: VDragType.DraggableOptions["onDragstart"];
    onDragend?: VDragType.DraggableOptions["onDragend"];
    onDrag?: VDragType.DraggableOptions["onDrag"];
    onDragover?: VDragType.TargetOptions<TransferData>["onDragover"];
    onDragleave?: VDragType.TargetOptions<TransferData>["onDragleave"];
    onDragenter?: VDragType.TargetOptions<TransferData>["onDragenter"];
    onDrop?: VDragType.TargetOptions<TransferData>["onDrop"];
    onTargetChanged?: VDragType.TargetOptions<TransferData>["onDragover"];
}
type Emits = {
    (e: "update:modelValue", v: Props["modelValue"]): void;
};
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

interface TransferData {
    list: Props["modelValue"] & { readonly _key: string }[];
    item: TransferData["list"][number];
    index: number;
    chosedIndex: { value: number };
}

let list = reactive<Props["modelValue"]>(
    props.modelValue.map((item, index) => {
        return {
            ...item,
            _key: item._key ?? `${Date.now()}${index}`,
        };
    })
);
let chosedEle: HTMLElement, // 拖放时鼠标指着的元素
    chosedIndex: TransferData["chosedIndex"] = { value: 0 }, // 会传递到子组件中，通过对象保证获得的数据相同
    copyEle: HTMLElement; // 预览元素

function getOptions(item: Props["modelValue"][number], index: number): VDragType.DraggableOptions {
    return {
        draggable: item.draggable,
        data: { index, item, list, chosedIndex }, // 因为会出现嵌套多层且事件阻止冒泡的情况，全局变量也需要传值给drop事件
        onDragstart(e) {
            e.stopPropagation();
            chosedEle = this;
            copyEle = this.cloneNode(true) as HTMLElement;
            copyEle.className = this.className += " dragging";
            props.onDragstart?.call(this, e);
        },
        onDragend(e) {
            e.stopPropagation();
            this.className = "item";
            chosedEle.className = "item";
            this.parentElement?.removeChild(copyEle);
            props.onDragend?.call(this, e);
        },
        onDrag: props.onDrag,
        img: item.img,
    };
}

const targetOptions: VDragType.TargetOptions<TransferData> = {
    onDragover(data, e, dragging) {
        //todo 鼠标指向元素变化且变化后元素不是预览元素时执行
        if (chosedEle && chosedEle !== e.target && e.target !== copyEle) {
            //todo 判断能否插入指定节点前，如果能：重新设置样式和预览
            const curChosedIndex = Array.from(dragging.parentElement!.children).indexOf(
                e.target as HTMLElement
            );
            if (~curChosedIndex) {
                chosedEle.className = chosedEle.className.replaceAll(/\schosed/g, "");
                chosedEle = e.target as HTMLElement;
                chosedEle.parentElement?.insertBefore(copyEle, chosedEle);
                chosedEle.className += " chosed";
                chosedIndex.value = curChosedIndex; // chosedIndex始终不为-1
                props.onTargetChanged?.call(this, data, e, dragging);
            }
        }
        props.onDragover?.call(this, data, e, dragging);
    },

    onDrop(data, e, dragging) {
        e.stopPropagation();
        let targetIndex: number =
            data.chosedIndex.value == 0 || data.chosedIndex.value == 1
                ? data.chosedIndex.value
                : data.chosedIndex.value - 1; // 因为前面插入了预览元素，这里index应该修改
        changeIndex(data.list, data.index, targetIndex);
        emit("update:modelValue", list);
        props.onDrop?.call(this, data, e, dragging);
    },

    onDragenter: props.onDragover,
    onDragleave: props.onDragleave,
};

function changeIndex(arr: any[], from: number, to: number) {
    if (from > to) {
        const item = arr[from];
        arr.splice(from, 1);
        arr.splice(to, 0, item);
    } else if (from < to) {
        arr.splice(to, 0, arr[from]);
        arr.splice(from, 1);
    }
}
</script>

<style lang="less" scoped>
.draggableList {
    .item {
        transition: opacity 0.5s linear;
        > .draggableList {
            margin-left: 2rem;
        }
    }
    .chosed {
    }
    .dragging {
        opacity: 0.5;
    }
}
</style>
