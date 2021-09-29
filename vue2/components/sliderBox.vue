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
export default {
    name: "sliderBox",
    props: {
        duration: {
            type: Number,
            default: 0.5,
        },
        direction: {
            type: String,
            default: "bottom",
        },
    },
    data() {
        return { animeClass: "" };
    },
    mounted() {
        let io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                //todo 设置动画
                this.animeClass = `${this.$props.direction}`;
                //todo 取消监听
                io.unobserve(e.target);
            }
        });
        io.observe(this.$refs.observer, { root: document.body });
    },
};
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
