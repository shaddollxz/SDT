<template>
    <div class="switchButton" :class="{ open: $props.modelValue }">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="center" @click="statuChange">
            <div></div>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
    name: "switchButton",
});
</script>
<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});
const emit = defineEmits(["update:modelValue", "onStatuChange"]);

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
    .right {
        color: var(--color-error-bland);
    }
    .left {
        color: var(--color-primary-bland);
    }
    // 选择右边时
    &.open {
        .center {
            background-color: var(--color-primary);
            > div {
                transform: translateX(calc(var(--width) - 100%));
            }
        }
        .right {
            color: var(--color-primary-bland);
        }
        .left {
            color: var(--color-error-bland);
        }
    }
}
</style>
