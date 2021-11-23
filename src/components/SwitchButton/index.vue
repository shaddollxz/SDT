<template>
    <div class="switchButton" :class="{ open: modelValue }">
        <div :class="{ chosed: !modelValue, notChosed: modelValue }">
            <slot name="left"></slot>
        </div>
        <div class="center" @click="statuChange">
            <div></div>
        </div>
        <div :class="{ chosed: modelValue, notChosed: !modelValue }">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
    name: "switchButton",
});
</script>
<script setup lang="ts">
interface Props {
    modelValue: boolean;
}
interface Emit {
    (e: "update:modelValue", v: boolean): void;
    (e: "onStatuChange", v: boolean): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emit>();

function statuChange() {
    emit("update:modelValue", !props.modelValue);
    emit("onStatuChange", !props.modelValue);
}
</script>

<style lang="less" scoped>
.switchButton {
    --height: 2rem;
    --width: 5rem;
    display: flex;
    .center {
        box-sizing: border-box;
        padding: 0 calc(var(--height) / 2) 0 0;
        border-radius: var(--height);
        border: var(---color-border);
        margin: 0 0.5rem;
        width: var(--width);
        height: var(--height);
        background-color: var(--color-bg-deep);
        cursor: pointer;
        > div {
            width: var(--height);
            height: var(--height);
            clip-path: circle(50%);
            background-color: var(--color-text-default);
            transition: all 0.3s;
        }
    }
    .chosed {
        color: var(--color-primary-bland);
    }
    .notChosed {
        color: var(--color-error-bland);
    }
    // 选择右边时
    &.open {
        .center {
            background-color: var(--color-primary-bland);
            > div {
                transform: translateX(calc(var(--width) - 100%));
            }
        }
    }
}
</style>
