<template>
    <div class="checkBox" @click="setState" :class="{ checked: state }"></div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
interface Props {
    modelValue?: boolean;
    checked?: boolean;
}
interface Emits {
    (n: "update:modelValue", v: boolean): void;
    (n: "onCheck", v: boolean): void;
}
// vue会把没有传入的布尔值做false处理 这里手动定义
const props = withDefaults(defineProps<Props>(), {
    checked: false,
    modelValue: undefined,
});
const emit = defineEmits<Emits>();

const isCheck = ref(!!props.checked);
const state = computed(() => (props.modelValue === undefined ? isCheck.value : props.modelValue));

function setState() {
    if (props.modelValue === undefined) {
        isCheck.value = !isCheck.value;
        emit("onCheck", isCheck.value);
    } else {
        emit("update:modelValue", !props.modelValue);
        emit("onCheck", !props.modelValue);
    }
}
</script>

<style lang="scss" scoped>
.checkBox {
    box-sizing: border-box;
    width: 1rem;
    aspect-ratio: 1 / 1;
    border: 1px solid var(--color-border);
}
.checked {
    position: relative;
    background-color: var(--color-text-default);
    &::after {
        content: "";
        position: absolute;
        width: 50%;
        aspect-ratio: 2 / 1;
        left: 50%;
        top: 45%;
        transform: translate(-50%, -50%) rotate(-45deg);
        border: 1px solid var(--color-border);
        border-right: 0;
        border-top: 0;
    }
}
</style>
