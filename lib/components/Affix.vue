<template>
    <div ref="affix" class="affix">
        <div ref="fixed" :style="{ position: isFixed ? 'fixed' : '', zIndex: $props.zIndex }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, ref, shallowRef } from "@vue/runtime-core";
export default defineComponent({
    name: "affix",
});
</script>
<script setup>
const props = defineProps({
    // 当该元素部分离开视口时固定 如果不放入则是包裹元素离开视口时固定
    target: {
        type: String,
        default: null,
    },
    position: {
        type: String,
        default: "top",
    },
    zIndex: {
        type: Number,
        default: 100,
    },
});

let target;
const affix = shallowRef(null); // 没有target时以它为基准进行固定
const fixed = shallowRef(null); // 被固定元素
let isFixed = ref(false); // 控制是否固定
let io; // 观察器

onMounted(() => {
    //todo 获得相对固定元素
    if (props.target) {
        target = document.querySelector(props.target);
    } else {
        target = affix.value;
    }

    //todo 定affix宽高 内部fixed后会内部会塌陷 用它撑起来
    affix.value.style.height = affix.value.clientHeight + "px";
    affix.value.style.width = affix.value.clientWidth + "px";

    //todo 计算固定时的高度
    if (props.position == "top") {
        fixed.value.style.top = -(target.offsetTop - fixed.value.offsetTop) + "px";
    } else {
        fixed.value.style.bottom =
            target.offsetTop +
            target.offsetHeight -
            fixed.value.offsetTop -
            fixed.value.offsetHeight +
            "px";
    }

    io = new IntersectionObserver(
        ([e]) => {
            if (props.position == "top") {
                // 判断顶部与视口顶部相交的距离 如果小于零 说明离开页面
                if (e.boundingClientRect.top < 0) {
                    isFixed.value = true;
                } else {
                    isFixed.value = false;
                }
            } else if (props.position == "bottom") {
                // 判断底部与视口底部相交的距离
                if (e.boundingClientRect.bottom - innerHeight < 0) {
                    isFixed.value = false;
                } else {
                    isFixed.value = true;
                }
            }
        },
        { threshold: [1] }
    );
    io.observe(target);
});
onBeforeUnmount(() => {
    io.unobserve(target);
    io.disconnect();
});
</script>

<style lang="less" scoped>
.affix {
    width: max-content;
    height: max-content;
}
</style>
