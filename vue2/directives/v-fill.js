const cache = new WeakMap(); //? 使用weakMap自动删除不用的内存

function mounted(el) {
    let cacheData = cache.get(el);
    el.style.display = "flex";
    el.style.flexWrap = "wrap";
    el.style.justifyContent = "space-between";
    //todo 初始化时缓存父元素能接收一排子元素的个数 如果是异步渲染的数据 先设为null
    if (!cacheData) {
        cacheData = {
            childWidth: el.firstElementChild ? el.firstElementChild.offsetWidth : null,
            width: el.clientWidth,
            maxNum: el.firstElementChild
                ? Math.floor(el.clientWidth / el.firstElementChild.offsetWidth)
                : null,
        };
        cache.set(el, cacheData);
    }
    updateChild(el, cacheData);
}

function beforeUpdate(el) {
    let cacheData = cache.get(el);
    //todo 如果是异步数据 数据更新时 先检测是否有子元素宽
    if (!cacheData.childWidth && el.firstElementChild) {
        cacheData.childWidth = el.firstElementChild.offsetWidth;
        cacheData.maxNum = Math.floor(cacheData.width / cacheData.childWidth);
    }
    updateChild(el, cacheData);
}

function updateChild(el, cacheData) {
    //todo 计算补齐需要的元素个数 如果不够就补齐，如果多了就不管
    let arr = el.querySelectorAll(".fills");
    Array.prototype.forEach.call(arr, (value) => {
        el.removeChild(value);
    });
    arr = null;
    let adds = cacheData.maxNum - (el.childElementCount % cacheData.maxNum);
    adds = adds === cacheData.maxNum ? 0 : adds; //? 需要这么多个才能补齐
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < adds; i++) {
        let child = document.createElement("div");
        child.style.width = cacheData.childWidth + "px";
        child.classList.add("fills");
        fragment.appendChild(child);
    }
    el.appendChild(fragment);
}

export default {
    install(Vue) {
        Vue.directive("fill", {
            inserted: function (el) {
                mounted(el);
            },
            componentUpdated: function (el) {
                beforeUpdate(el);
            },
        });
    },
};
