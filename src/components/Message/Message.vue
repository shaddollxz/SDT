<template>
    <transition name="message" @before-leave="onClose" @after-leave="$emit('destroy')">
        <div class="message" v-show="isShow" :class="type" :style="style">
            <div :class="['text', align]">{{ text }}</div>
            <div @click="isShow = !isShow" :class="isCanClose || !(duration > 0) ? 'canClose' : 'cantClose'">✖</div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import type { StyleValue } from "vue";
export default defineComponent({
    name: "message",
});
</script>
<script setup lang="ts">
export interface Props {
    text: string;
    type: "default" | "success" | "error";
    duration: number; // 显示的事件 如果为零会无视isCanClose显示删除按钮
    isCanClose: boolean; // 是否显示删除按钮
    align: "left" | "right" | "center";
    style?: StyleValue;
    onClose?: (el: Element) => void;
}
const props = defineProps<Props>();

// 定义时间之后消失
const isShow = ref(true);
// 如果持续设为零 则不会定时删除
onMounted(() => {
    if (props.duration > 0) {
        setTimeout(() => {
            isShow.value = false;
        }, props.duration);
    }
});
</script>

<style lang="less" scoped>
.message {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 33%;
    height: max-content;
    box-sizing: border-box;
    padding: 1rem 1.8rem;
    margin-bottom: 0.6rem;
    border-radius: 0.4rem;
    &.default {
        color: var(--color-bg-bland);
        background-color: var(--color-text-default);
    }
    &.success {
        color: var(--color-primary);
        background-color: var(--color-primary-text);
    }
    &.error {
        color: var(--color-error);
        background-color: var(--color-error-text);
    }
    .text {
        margin-right: 1rem;
        font-size: 1rem;
        font-weight: 600;
        flex: 1;
        &.center {
            text-align: center;
        }
        &.left {
            text-align: left;
        }
    }
    .canClose {
        cursor: pointer;
    }
    .cantClose {
        display: none;
    }
}
.message-leave-active {
    transition: all 0.7s ease;
}
.message-leave-to {
    opacity: 0;
    transform: translateY(-100%);
}
</style>
