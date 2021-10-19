<template>
    <transition name="message" @before-leave="onClose" @after-leave="$emit('destroy')">
        <div class="message" v-show="isShow" :class="type" :style="style">
            <div :class="['text', align]">{{ text }}</div>
            <div
                @click="isShow = !isShow"
                :class="isCanClose || duration ? 'canClose' : 'cantClose'"
            ></div>
        </div>
    </transition>
</template>

<script>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
export default defineComponent({
    name: "message",
});
</script>
<script setup scoped>
const props = defineProps({
    text: {
        type: String,
        default: "",
    },
    // 弹框显示时间 为零则只能手动关
    duration: {
        type: Number,
        default: 1300,
    },
    // 文字对齐方式
    align: {
        type: String,
        default: "left",
    },
    // 是否显示删除按钮
    isCanClose: {
        type: Boolean,
        default: true,
    },
    // 样式 用来修改框的宽，高，背景色，文字颜色
    style: {
        type: Object,
        default: () => {},
    },
    // 弹框颜色快捷
    type: {
        type: String,
        default: "default",
    },
    // 关闭时的触发回调
    onClose: {
        type: Function,
        default: () => {},
    },
});

// 定义时间之后消失
const isShow = ref(true);
// 如果持续设为零 则不会定时删除
onMounted(() => {
    if (props.duration) {
        setTimeout(() => {
            isShow.value = false;
        }, props.duration);
    }
});
</script>

<style lang="less">
.message {
    width: 33%;
    height: max-content;
    box-sizing: border-box;
    padding: 1rem 1.8rem;
    margin-bottom: 0.6rem;
    border-radius: 0.4rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    &.default {
        color: #909399;
        background-color: #e9e9eb;
    }
    &.success {
        color: #67c23a;
        background-color: #e1f3d8;
    }
    &.error {
        color: #f56c6c;
        background-color: #fde2e2;
    }
    .text {
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
        // 叉叉
        width: 1rem;
        height: 1rem;
        cursor: pointer;
        position: relative;
        &::before,
        &::after {
            content: "";
            position: absolute;
            height: 1.2rem;
            width: 3px;
            top: 0;
            right: 1rem;
            background-color: #00000083 !important;
        }
        &::before {
            transform: rotate(45deg);
        }
        &::after {
            transform: rotate(-45deg);
        }
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
