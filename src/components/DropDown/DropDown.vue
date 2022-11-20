<template>
    <div class="dropDown">
        <div class="title">
            <slot name="title"></slot>
            <div class="arrow" :class="{ opened: isOpen }" @click="onClick">❮</div>
        </div>
        <template v-if="isRender">
            <div class="content" v-show="isOpen">
                <slot name="content"></slot>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
interface Props {
    defaultValue?: boolean;
    modelValue?: boolean;
    lazyRender?: boolean;
}
interface Emits {
    (n: "onOpen"): void;
    (n: "onClose"): void;
    (n: "update:modelValue", v: boolean): void;
}
// vue会把没有传入的布尔值做false处理 这里手动定义
const props = withDefaults(defineProps<Props>(), {
    defaultValue: false,
    modelValue: undefined,
});
const emit = defineEmits<Emits>();
const isRender = ref(!!props.defaultValue || !!props.modelValue || !props.lazyRender);
const isShow = ref(!!props.defaultValue);
const isOpen = computed(() => (props.modelValue == undefined ? isShow.value : props.modelValue));
function onClick() {
    if (!isRender.value) isRender.value = true;
    if (props.defaultValue == undefined) {
        !props.modelValue ? emit("onOpen") : emit("onClose");
        emit("update:modelValue", !props.modelValue);
    } else {
        !isShow.value ? emit("onOpen") : emit("onClose");
        isShow.value = !isShow.value;
    }
}
</script>

<style lang="scss" scoped>
.dropDown {
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 1rem;
        .arrow {
            transform: rotate(-90deg);
            transition: all linear 0.3s;
            cursor: pointer;
            user-select: none;
            &.opened {
                transform: rotate(90deg);
            }
        }
    }
}
</style>
