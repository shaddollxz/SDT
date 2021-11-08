<template>
    <div
        class="sliderBox"
        :class="animeClass"
        :style="{ animationDuration: $props.duration + 's' }"
        ref="observer"
    >
        <slot></slot>
    </div>
</template>

<script>
import { defineComponent, shallowRef, ref, onMounted } from "@vue/runtime-core";
export default defineComponent({
    name: "sliderBox",
});
</script>
<script setup>
const props = defineProps({
    duration: {
        type: Number,
        default: 0.5,
    },
    direction: {
        type: String,
        values: ["top", "bottom", "left", "right"],
        default: "bottom",
    },
});

const observer = shallowRef(null);
const animeClass = ref("");

let io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
        //todo 设置动画
        animeClass.value = `${props.direction}`;
        //todo 取消监听
        io.unobserve(e.target);
    }
});
onMounted(() => io.observe(observer.value, { root: document.body }));
</script>

<style lang="less" scoped>
.sliderBox {
    opacity: 0;
}
.top {
    animation: top linear 1 forwards;
}
.bottom {
    animation: bottom linear 1 forwards;
}
.left {
    animation: left linear 1 forwards;
}
.right {
    animation: right linear 1 forwards;
}
@keyframes top {
    0% {
        transform: translateY(-20%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes bottom {
    0% {
        transform: translateY(20%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes left {
    0% {
        transform: translateX(-20%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
@keyframes right {
    0% {
        transform: translateX(20%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
