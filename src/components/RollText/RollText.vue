<template>
    <div class="rollText" ref="view" :style="{ justifyContent: $props.align }">
        <div class="move" :class="state" :style="{ animationDuration: $props.duration + 's' }">
            <template v-if="$props.asyncData === null">
                <div class="text" ref="text"><slot></slot></div>
                <div class="text" v-if="$props.type == 1"><slot></slot></div>
            </template>

            <template v-else>
                <div class="text" ref="text" v-html="$props.asyncData"></div>
                <div class="text" v-html="$props.asyncData" v-if="$props.type == 1"></div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, ref, nextTick, watch } from "vue";
export default defineComponent({
    name: "rollText",
});
</script>
<script setup lang="ts">
interface Props {
    type?: 1 | 2;
    duration?: number;
    asyncData?: string | null;
    align?: "left" | "right" | "top" | "bottom";
}
const props = withDefaults(defineProps<Props>(), {
    type: 1,
    duration: 8,
    asyncData: () => null,
    align: "left",
});

let state = ref("");
const text = shallowRef<HTMLElement | null>(null);
const view = shallowRef<HTMLElement | null>(null);

//todo 如果传入异步获取的数据 则监听它改变后再设置动画
if (props.asyncData !== null) {
    watch(
        () => props.asyncData,
        () => nextTick(setAnime)
    );
} else {
    nextTick(setAnime);
}

function setAnime() {
    if (!text.value) return;
    //todo 通过判断文字与视口的宽度和传入的运动方式 执行不同的动画
    if (text.value.clientWidth > view.value!.clientWidth) {
        if (props.type == 1) {
            state.value = "roll overView";
        } else {
            backAnime();
        }
    } else {
        if (props.type == 1) {
            state.value = "roll notOverView";
        }
    }
}

function backAnime() {
    //* 左右横跳
    const moveLength = text.value!.clientWidth - view.value!.clientWidth;
    let moveLengthEveryStep = moveLength / props.duration! / 60; //? 每一动画帧运动的距离 同时用来改变方向
    let position = 0;
    const move: FrameRequestCallback = (time) => {
        if (!text.value) return;

        if (position >= 0 || position <= -moveLength) {
            moveLengthEveryStep = -moveLengthEveryStep; //? 到顶点转向
            //? 每到顶点时暂停两秒
            setTimeout(() => {
                if (!text.value) return;

                text.value.style.transform = `translateX(${(position += moveLengthEveryStep)})px`;
                requestAnimationFrame(move);
            }, 2000);
            return;
        }

        text.value.style.transform = `translateX(${(position += moveLengthEveryStep)}px)`;
        requestAnimationFrame(move);
    };
    requestAnimationFrame(move);
}
</script>

<style lang="scss" scoped>
.rollText {
    display: flex;
    position: relative;
    overflow: hidden;
    .move {
        display: flex;
        align-items: center;
        position: relative;
        width: max-content;
        .text {
            width: max-content;
            white-space: nowrap;
        }
    }
    .notOverView {
        width: 200% !important;
        .text {
            width: 50% !important;
        }
    }
    .overView {
        width: max-content !important;
        .text {
            width: max-content !important;
            padding-right: 5rem;
        }
    }
    .roll {
        transform: translateZ(0); // 开启硬件加速
        animation: move 5s linear infinite;
    }
}
@keyframes move {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}
</style>
