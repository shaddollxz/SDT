<template>
    <div
        class="lazyLoadBox"
        :class="animeClass"
        :style="{ animationDuration: duration + 's' }"
        ref="observer"
    >
        <template v-if="isRender">
            <slot></slot>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, ref, onMounted } from "vue";
export default defineComponent({
    name: "lazyLoadBox",
});
</script>
<script setup lang="ts">
interface Props {
    duration?: number;
    direction?: "top" | "bottom" | "left" | "right";
    reHidden?: boolean;
    lazyRender?: boolean;
}
interface Emits {
    (n: "onShow"): void;
    (n: "onReHidden"): void;
}
const props = withDefaults(defineProps<Props>(), {
    duration: 0.5,
    direction: "bottom",
});
const emit = defineEmits<Emits>();

const observer = shallowRef<HTMLElement | null>(null);
const animeClass = ref("");
const isRender = ref(!props.lazyRender);

let io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
        // 出现在屏幕上
        emit("onShow");
        isRender.value = true;
        animeClass.value = `${props.direction}`;
        // 如果设置会重新隐藏将不会解除监听
        if (!props.reHidden) {
            io.unobserve(e.target);
        }
    } else {
        animeClass.value = "";
        emit("onReHidden");
    }
});
onMounted(() => io.observe(observer.value!));
</script>

<style lang="scss" scoped>
.lazyLoadBox {
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
