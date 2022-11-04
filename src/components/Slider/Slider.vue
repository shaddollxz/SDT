<template>
    <div class="slider" ref="slider" @mousedown="draggable ? mouseDownHandler : undefined">
        <div class="passed" :style="{ width: position + '%' }">
            <div class="btn" v-if="draggable"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, watch, ref, shallowRef } from "vue";
import type { Ref } from "vue";
export default defineComponent({
    name: "slider",
});
</script>
<script setup lang="ts">
import SliderHelper from "./SliderHelper";

interface Props {
    modelValue?: number;
    defaultValue?: number;
    draggable?: boolean;
}
interface Emits {
    (name: "update:modelValue", n: number): void;

    (name: "onDragStart", percent: number): void;
    (name: "onDragging", percent: number): void;
    (name: "onDrop", percent: number): void;
}
const props = withDefaults(defineProps<Props>(), { draggable: false });
const emit = defineEmits<Emits>();

const slider: Ref<HTMLDivElement | null> = shallowRef(null);
let position = ref(
    typeof props.modelValue == "number" ? props.modelValue : props.defaultValue ? props.defaultValue : 100
);
let isCanMove = false;
let sliderHelper: SliderHelper;

if (typeof props.modelValue == "number") {
    watch(
        () => props.modelValue,
        () => {
            if (!isCanMove) {
                position.value = props.modelValue!;
            }
        }
    );
}

function getSliderDetail() {
    const { x, width } = slider.value!.getBoundingClientRect();
    return { x, width };
}

function mouseDownHandler(e: MouseEvent) {
    isCanMove = true;
    const sliderDetail = getSliderDetail();
    sliderHelper.movePosition(sliderDetail.width, sliderDetail.x, position.value);
    if ((e.target as HTMLDivElement).className !== "btn") {
        position.value = sliderHelper.btnPosition(e.clientX);
    }
    emit("onDragStart", position.value / 100);
}
function mouseUpHandler(e: MouseEvent) {
    if (isCanMove) {
        isCanMove = false;
        const nowPosition = sliderHelper.btnPosition(e.clientX);
        if (nowPosition == 0 || nowPosition == 100 || (e.target as HTMLDivElement).className == "btn") {
            position.value = nowPosition;
            emit("update:modelValue", position.value / 100);
            emit("onDrop", position.value / 100);
        } else {
            position.value = sliderHelper.reset();
        }
    }
}
function mouseMoveHandler(e: MouseEvent) {
    if (isCanMove) {
        position.value = sliderHelper.btnPosition(e.clientX);
        emit("onDragging", position.value / 100);
    }
}

onMounted(() => {
    const sliderDetail = getSliderDetail();
    sliderHelper = new SliderHelper(sliderDetail.width, sliderDetail.x);
    if (props.draggable) {
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    }
});
onUnmounted(() => {
    if (props.draggable) {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    }
});
</script>

<style lang="scss" scoped>
.slider {
    --Height: 0.8rem;
    --DIA: 1.2rem;
    $H: var(--Height);
    $D: var(--DIA);
    $O: calc($D - $H);
    position: relative;
    height: $H;
    margin: calc($O/2) 0;
    border-radius: calc($H / 1.5);
    background-color: var(--color-text-default);
    .passed {
        height: $H;
        border-radius: calc($H / 1.5);
        background-color: var(--color-text-theme);
        .btn {
            float: right;
            width: $D;
            height: $D;
            background: var(--color-text-theme);
            box-sizing: border-box;
            margin: calc(($D - $H) / -2) calc($D / -2) 0 0;
            border: $O solid var(--color-text-default);
            border-radius: 50%;
            cursor: grab;
        }
    }
}
</style>
