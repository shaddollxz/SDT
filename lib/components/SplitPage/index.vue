<template>
    <div class="splitPage" v-if="totalPage > 1">
        <div class="buttons">
            <div
                class="button prev"
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
                :class="{ chose: btns.curr == page, ellipsis: page == '...' }"
                @click="
                    btns.curr = page;
                    changePage();
                "
            >
                {{ page }}
            </div>

            <div
                class="button next"
                @click="
                    btns.next();
                    changePage();
                "
            >
                ❮
            </div>
        </div>

        <div class="jumpTo">
            <span>跳转到第</span>
            <input
                v-model="jumpPage"
                @keypress.enter="
                    btns.curr = jumpPage;
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
        default: 6,
    },
    totalPage: {
        type: Number,
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
        this._curr = 1;
        this.maxArr = Array.from({ length: maxLen }).map((item, index) => index + 1);
        if (maxLen > limitLen) {
            this.showArr = this.maxArr.slice(0, this.limit - 2).concat("...", this.max);
        } else {
            this.showArr = this.maxArr;
        }
    }
    refreshList() {
        if (this.max > this.limit) {
            if (this._curr == 1) {
                this.showArr = this.maxArr.slice(0, this.limit - 2).concat("...", this.max);
            } else if (this._curr <= this.max - this.limit) {
                this.showArr = this.maxArr
                    .slice(this._curr - 2, this._curr + this.limit - 4)
                    .concat("...", this.max);
            } else {
                this.showArr = this.maxArr.slice(this.max - this.limit, this.max);
            }
        }
    }

    get curr() {
        return this._curr;
    }
    set curr(value) {
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
            this.refreshList();
        }
    }
    prev() {
        if (this.curr > 1) {
            this.curr--;
            this.refreshList();
        }
    }
}
//#endregion

const pageCache = Object.create(null);
//todo 是同步数据时
const btns = ref(new BtnList(props.totalPage, props.limit));
btns.value.curr = props.currentPage ?? 1;
pageCache[btns.value.curr] = props.modelValue;
//todo 是异步数据时
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

            &.chose {
                color: var(--color-text-theme);
                border-color: var(--color-text-theme);
            }
            &.next,
            &.prev {
                font-weight: 600;
            }
            &.next {
                transform: rotate(180deg);
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
            max-width: var(--fontsize-large);
        }
    }
}
</style>
