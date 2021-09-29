<template>
    <div class="rollText" ref="view">
        <div class="move" :class="state" :style="{ animationDuration: $props.duration + 's' }">
            <template v-if="$props.asyncData === null">
                <div class="text" ref="text"><slot></slot></div>
                <div class="text" v-if="$props.type == 1"><slot></slot></div>
            </template>

            <template v-else>
                <div class="text" v-html="$props.asyncData" ref="text"></div>
                <div class="text" v-html="$props.asyncData" v-if="$props.type == 1"></div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: Number,
            default: 1,
        },
        duration: {
            type: Number,
            default: 8,
        },
        asyncData: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            state: "",
        };
    },
    methods: {
        setAnime() {
            //todo 通过判断文字与视口的宽度和传入的运动方式 执行不同的动画
            if (this.$refs.text.clientWidth > this.$refs.view.clientWidth) {
                if (this.$props.type == 1) {
                    this.state = "roll overView";
                } else {
                    this.backAnime();
                }
            } else {
                if (this.$props.type == 1) {
                    this.state = "roll notOverView";
                }
            }
        },
        backAnime() {
            //! 左右横跳
            const moveLength = this.$refs.text.clientWidth - this.$refs.view.clientWidth;
            let moveLengthEveryStep = moveLength / this.$props.duration / 60; //? 每一动画帧运动的距离 同时用来改变方向
            let position = 0;
            const move = () => {
                if (position >= 0 || position <= -moveLength) {
                    moveLengthEveryStep = -moveLengthEveryStep; //? 到顶点转向
                    //? 每到顶点时暂停两秒
                    setTimeout(() => {
                        this.$refs.text.style.transform = `translateX(${(position +=
                            moveLengthEveryStep)})px`;
                        requestAnimationFrame(move);
                    }, 2000);
                    return;
                }
                this.$refs.text.style.transform = `translateX(${(position +=
                    moveLengthEveryStep)}px)`;
                requestAnimationFrame(move);
            };
            requestAnimationFrame(move);
        },
    },
    mounted() {
        //todo 如果是直接传来的数据 直接设置动画  如果是异步获取的数据 通过watch后设置动画
        if (this.$props.asyncData === null) {
            this.$nextTick(this.setAnime);
        }
    },
    watch: {
        asyncData() {
            this.$nextTick(this.setAnime);
        },
    },
};
</script>

<style lang="less" scoped>
.rollText {
    position: relative;
    overflow: hidden;
    .move {
        width: max-content;
        margin: 0 auto;
        display: flex;
        align-items: center;
        position: relative;
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
        transform: translateZ(0); //? 开启硬件加速
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
