<template>
    <div class="switchButton" :class="{ open: modelValue }">
        <div :class="{ chosed: !modelValue, notChosed: modelValue }" @click="() => statuChange(false)">
            <slot name="left"></slot>
        </div>
        <div class="center" @click="() => statuChange()">
            <div></div>
        </div>
        <div :class="{ chosed: modelValue, notChosed: !modelValue }" @click="() => statuChange(true)">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
    name: "switchButton",
});
</script>
<script setup lang="ts">
interface Props {
    modelValue?: boolean;
    defaultValue?: boolean;
}
interface Emit {
    (e: "update:modelValue", v: boolean): void;
    (e: "onStatuChange", v: boolean): void;
}
const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: false,
});
const emit = defineEmits<Emit>();

const isChosed = ref(!!props.defaultValue);

function statuChange(newValue?: boolean) {
    const currentState = props.modelValue == undefined ? isChosed.value : props.modelValue;
    if (newValue == currentState) return;
    if (props.modelValue == undefined) {
        emit("onStatuChange", !currentState);
        isChosed.value = !currentState;
    } else {
        emit("onStatuChange", !currentState);
        emit("update:modelValue", !currentState);
    }
}
</script>

<style lang="scss" scoped>
.switchButton {
    --height: 2rem;
    --width: 5rem;
    display: flex;
    .center {
        box-sizing: border-box;
        padding: 0 calc(var(--height) / 2) 0 0;
        border-radius: var(--height);
        border: var(--color-text-default) solid 1px;
        margin: 0 0.5rem;
        width: var(--width);
        height: var(--height);
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
        color: var(--color-green-1);
    }
    .notChosed {
        color: var(--color-red-1);
    }
    // 选择右边时
    &.open {
        .center {
            background-color: var(--color-green-1);
            > div {
                transform: translateX(calc(var(--width) - 100%));
            }
        }
    }
}
</style>
