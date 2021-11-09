<template>
    <div class="splitPage" v-if="totalPage > 1">
        <div class="buttons">
            <div
                class="button arrow"
                @click="
                    btns.prev();
                    changePage();
                "
            >
                ❮
            </div>

            <div
                class="button"
                v-for="page of btns.showArr"
                :key="page"
                :class="{ current: btns.curr == page, ellipsis: page == '...' }"
                @click="
                    btns.curr = page;
                    changePage();
                "
            >
                {{ page }}
            </div>

            <div
                class="button arrow"
                @click="
                    btns.next();
                    changePage();
                "
            >
                ❯
            </div>
        </div>

        <div class="jumpTo">
            <span>跳转到第</span>
            <input
                v-model="jumpPage"
                @keypress.enter="
                    btns.curr = +jumpPage;
                    changePage();
                "
                type="text"
            />
            <span>页</span>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch } from "@vue/runtime-core";
export default defineComponent({
    name: "splitPage",
});
</script>
<script setup>
const props = defineProps({
    //? 缓存的页面数据，如果不传入将不缓存
    modelValue: {
        type: Array,
    },
    limit: {
        type: Number,
        default: 7,
    },
    totalPage: {
        type: Number,
        default: 0,
        required: true,
    },
    //? 只在组件挂载时使用，保证刷新后是当前页
    currentPage: {
        type: [Number, String],
        default: null,
    },
});
const emit = defineEmits(["update:modelValue", "onPageChange", "getNewData"]);

//#region 按钮的数据结构
class BtnList {
    constructor(maxLen, limitLen) {
        this.max = maxLen;
        this.limit = limitLen;
        this.limitHalf = limitLen % 2 ? ~~(limitLen / 2) + 1 : limitLen / 2;
        this._curr = 1;
        this.maxArr = Array.from({ length: maxLen }).map((item, index) => index + 1);
        if (maxLen > limitLen) {
            this.showArr = this.maxArr.slice(0, this.limit - 2).concat("...", this.max);
        } else {
            this.showArr = this.maxArr;
        }
    }
    refreshList() {
        if (this.max <= this.limit) return;

        if (this._curr < this.limitHalf) {
            this.showArr = this.maxArr.slice(0, this.limit - 2).concat("...", this.max);
        } else if (this._curr < this.max - this.limitHalf + 1) {
            this.showArr = [1, "..."]
                .concat(
                    this.maxArr.slice(
                        this._curr - (this.limitHalf - 2),
                        this._curr - (this.limitHalf - 2) + this.limit - 4
                    )
                )
                .concat("...", this.max);
        } else {
            this.showArr = [1, "..."].concat(
                this.maxArr.slice(this.maxArr.length - this.limit + 2)
            );
        }
    }

    get curr() {
        return this._curr;
    }
    set curr(value) {
        if (value == this._curr) return;

        if (value > this.max) {
            this._curr = this.max;
        } else if (value < 1) {
            this._curr = 1;
        } else {
            this._curr = value;
        }
        this.refreshList();
    }
    next() {
        if (this.curr < this.max) {
            this.curr++;
        }
    }
    prev() {
        if (this.curr > 1) {
            this.curr--;
        }
    }
}
//#endregion

const pageCache = Object.create(null);
//todo 是同步数据时setup时就计算页面显示
const btns = ref(new BtnList(props.totalPage, props.limit));
btns.value.curr = props.currentPage ?? 1;
pageCache[btns.value.curr] = props.modelValue;
//todo 是异步数据或者总页数改变时重新计算页面显示
watch(
    () => props.totalPage, //? totalPage可能是异步得到的，只在父组件获得了数据后才会执行一次
    () => {
        btns.value = new BtnList(props.totalPage, props.limit);
        btns.value.curr = props.currentPage ?? 1;
        pageCache[btns.value.curr] = props.modelValue;
    }
);

let jumpPage = ref(btns.value.curr);
function changePage() {
    emit("onPageChange", btns.value.curr);
    //todo 如果缓存中有就直接更新 不然进行请求
    if (pageCache[btns.value.curr]) {
        emit("update:modelValue", pageCache[btns.value.curr]);
    } else {
        emit("getNewData", btns.value.curr);
    }
}

//todo 翻页后进行缓存 如果不传入list 则不会缓存
watch(
    () => props.modelValue,
    (n) => {
        if (!pageCache[btns.value.curr]) {
            pageCache[btns.value.curr] = n;
        }
    }
);
</script>

<style lang="less" scoped>
.splitPage {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    .buttons {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 1rem;
        .button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3rem;
            height: 3rem;
            box-sizing: border-box;
            padding: 0.3rem 0.6rem;
            border-radius: 0.3rem;
            border: 1px solid var(--color-border);
            margin: 0 0.5rem;
            cursor: pointer;
            &:hover {
                color: var(--color-text-theme);
                border-color: var(--color-text-theme);
            }

            &.current {
                color: var(--color-text-theme);
                border-color: var(--color-text-theme);
            }
            &.arrow {
                font-weight: 600;
            }
            &.ellipsis {
                border: none;
                pointer-events: none;
                cursor: default;
            }
        }
    }
    .jumpTo {
        input {
            margin: 0 0.5rem;
            max-width: 2rem;
            color: var(--color-text-default);
            background-color: var(--color-bg-bland);
            border: 1.5px solid var(--color-border);
            border-radius: 0.5rem;
            &:focus-visible {
                outline-style: none;
                border-color: var(--color-text-theme) !important;
            }
        }
    }
}
</style>
