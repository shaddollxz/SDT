export default {
    //! 因为margin不能被js拿到，所以子元素不要设置左右margin
    install(app) {
        app.directive("fill", {
            mounted,
            beforeUpdate,
        });
    },
};

const cache = new WeakMap(); //? 使用weakMap自动删除不用的内存

function mounted(el) {
    let cacheData = cache.get(el);
    el.style.display = "flex";
    el.style.flexWrap = "wrap";
    el.style.justifyContent = "space-between";
    //todo 初始化时缓存父元素能接收一排子元素的个数 如果是异步渲染的数据 先设为undefind NaN
    if (!cacheData) {
        cacheData = {
            width: el.clientWidth,
            childWidth: el.firstElementChild?.offsetWidth,
            maxNum: Math.floor(el.clientWidth / el.firstElementChild?.offsetWidth),
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
    let fills = el.querySelectorAll(".fills");
    Array.prototype.forEach.call(fills, (value) => {
        el.removeChild(value);
    });
    fills = null;

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
