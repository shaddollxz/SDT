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
                    // @ts-ignore
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

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import type { NumberString } from "../../utils/typings";
import { BtnList } from "./SplitPageHelper";
export default defineComponent({
    name: "splitPage",
});
</script>
<script setup lang="ts">
interface Props {
    modelValue?: Array<any>;
    limit?: number | NumberString;
    totalPage: number | NumberString;
    currentPage?: number | NumberString;
}
interface Emit {
    (e: "update:modelValue", v: Array<any>): void;
    (e: "onPageChange", v: number): void;
    (e: "getNewData", v: number): void;
}
const props = withDefaults(defineProps<Props>(), {
    limit: 7,
});
const emit = defineEmits<Emit>();

const pageCache = Object.create(null);
//todo 是同步数据时setup时就计算页面显示
const btns = ref(new BtnList(props.totalPage, props.limit));
btns.value.curr = props.currentPage ? +props.currentPage : 1;
pageCache[btns.value.curr] = props.modelValue;
//todo 是异步数据或者总页数改变时重新计算页面显示
watch(
    () => props.totalPage, // totalPage可能是异步得到的，只在父组件获得了数据后才会执行一次
    () => {
        btns.value = new BtnList(props.totalPage, props.limit);
        btns.value.curr = props.currentPage ? +props.currentPage : 1;
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

<style lang="scss" scoped>
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
