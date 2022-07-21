var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var _a;
import { nextTick, defineComponent, ref, shallowRef, watch, openBlock, createElementBlock, normalizeStyle, createElementVNode, normalizeClass, unref, Fragment, renderSlot, createCommentVNode, onMounted, onUnmounted, pushScopeId, popScopeId, renderList, toDisplayString, withDirectives, isRef, withKeys, vModelText, useCssVars, createBlock, Transition, withCtx, vShow, createVNode, render } from "vue";
var vFill = {
  install(app) {
    app.directive("fill", {
      mounted: mounted$1,
      updated: updated$1
    });
  }
};
const cache$1 = /* @__PURE__ */ new WeakMap();
function mounted$1(el) {
  var _a2, _b;
  let cacheData = cache$1.get(el);
  el.style.display = "flex";
  el.style.flexWrap = "wrap";
  el.style.justifyContent = "space-between";
  if (!cacheData) {
    cacheData = {
      width: el.clientWidth,
      childWidth: (_a2 = el.firstElementChild) == null ? void 0 : _a2.offsetWidth,
      maxNum: Math.floor(el.clientWidth / ((_b = el.firstElementChild) == null ? void 0 : _b.offsetWidth))
    };
    cache$1.set(el, cacheData);
  }
  updateChild(el, cacheData);
}
function updated$1(el) {
  let cacheData = cache$1.get(el);
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
  let adds = cacheData.maxNum - el.childElementCount % cacheData.maxNum;
  adds = adds === cacheData.maxNum ? 0 : adds;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < adds; i++) {
    let child = document.createElement("div");
    child.style.width = cacheData.childWidth + "px";
    child.classList.add("fills");
    fragment.appendChild(child);
  }
  el.appendChild(fragment);
}
var vHidden = {
  install(app) {
    app.directive("hidden", {
      mounted,
      updated
    });
  }
};
function mounted(el, boolen) {
  el.style.visibility = boolen.value ? "" : "hidden";
}
function updated(el, boolen) {
  el.style.visibility = boolen.value ? "" : "hidden";
}
var vDrag = {
  install(app) {
    app.directive("draggable", {
      mounted: draggableMounted,
      updated: draggableUpdated
    });
    app.directive("dragtarget", {
      mounted: targetMounted
    });
  }
};
const map = /* @__PURE__ */ new WeakMap();
let dragging;
function draggableMounted(el, options) {
  var _a2;
  el.draggable = (_a2 = options.value.draggable) != null ? _a2 : true;
  map.set(el, options.value.data);
  function dragstartHandler(e) {
    var _a3;
    if (e.target !== el)
      return;
    dragging = el;
    e.dataTransfer.effectAllowed = "all";
    (_a3 = options.value.onDragstart) == null ? void 0 : _a3.call(this, e);
    nextTick(() => {
      var _a4;
      if (options.value.img) {
        let { pic, x = 0, y = 0 } = options.value.img.call(this);
        let img;
        if (typeof pic == "string") {
          img = new Image();
          img.src = pic;
        } else {
          img = pic;
        }
        (_a4 = e.dataTransfer) == null ? void 0 : _a4.setDragImage(img, x, y);
      }
    });
  }
  function dragHandler(e) {
    e.preventDefault();
    options.value.onDrag.call(this, e);
  }
  function dragendHandler(e) {
    e.preventDefault();
    options.value.onDragend.call(this, e);
  }
  el.addEventListener("dragstart", dragstartHandler);
  options.value.onDrag ? el.addEventListener("drag", dragHandler) : null;
  options.value.onDragend ? el.addEventListener("dragend", dragendHandler) : null;
}
function draggableUpdated(el, options) {
  var _a2;
  el.draggable = (_a2 = options.value.draggable) != null ? _a2 : true;
  map.set(el, options.value.data);
}
function targetMounted(el, options) {
  let data;
  function dragenterHandler(e) {
    var _a2, _b;
    e.preventDefault();
    data = map.get(dragging);
    (_b = (_a2 = options.value) == null ? void 0 : _a2.onDragenter) == null ? void 0 : _b.call(this, data, e, dragging);
  }
  function dragoverHandler(e) {
    var _a2;
    e.preventDefault();
    if (options.value.style) {
      e.dataTransfer.dropEffect = options.value.style;
    }
    (_a2 = options.value.onDragover) == null ? void 0 : _a2.call(this, data, e, dragging);
  }
  function dragleaveHandler(e) {
    options.value.onDragleave.call(this, data, e, dragging);
  }
  function dropHandler(e) {
    e.preventDefault();
    options.value.onDrop.call(this, data, e, dragging);
    dragging = null;
  }
  el.addEventListener("dragenter", dragenterHandler);
  options.value.onDragover || options.value.style ? el.addEventListener("dragover", dragoverHandler) : el.ondragover = () => false;
  options.value.onDragleave ? el.addEventListener("dragleave", dragleaveHandler) : null;
  options.value.onDrop ? el.addEventListener("drop", dropHandler) : null;
}
var directives = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VFill: vFill,
  VHidden: vHidden,
  VDrag: vDrag
}, Symbol.toStringTag, { value: "Module" }));
var colors = /* @__PURE__ */ (() => ":root{--color-text-theme: orange;--color-primary: #238636;--color-primary-bland: #2ea043;--color-primary-text: #bce1c3;--color-error: #f56c6c;--color-error-bland: #ff9191;--color-error-text: #ffdada;--color-text-default: #adbac7;--color-border: #444c56;--color-bg-deep: #1c2128;--color-bg-bland: #22272e}\n")();
var RollText_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".rollText[data-v-3bb0bd0f]{position:relative;overflow:hidden;display:flex}.rollText .move[data-v-3bb0bd0f]{width:max-content;display:flex;align-items:center;position:relative}.rollText .move .text[data-v-3bb0bd0f]{width:max-content;white-space:nowrap}.rollText .notOverView[data-v-3bb0bd0f]{width:200%!important}.rollText .notOverView .text[data-v-3bb0bd0f]{width:50%!important}.rollText .overView[data-v-3bb0bd0f]{width:max-content!important}.rollText .overView .text[data-v-3bb0bd0f]{width:max-content!important;padding-right:5rem}.rollText .roll[data-v-3bb0bd0f]{transform:translateZ(0);animation:move-3bb0bd0f 5s linear infinite}@keyframes move-3bb0bd0f{0%{transform:translate(0)}to{transform:translate(-50%)}}\n")();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$3 = {
  key: 0,
  class: "text"
};
const _hoisted_2$3 = ["innerHTML"];
const _hoisted_3$1 = ["innerHTML"];
const __default__$5 = defineComponent({
  name: "rollText"
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$5), {
  props: {
    type: { default: 1 },
    duration: { default: 8 },
    asyncData: { default: () => null },
    align: { default: "left" }
  },
  setup(__props) {
    const props = __props;
    let state = ref("");
    const text = shallowRef(null);
    const view = shallowRef(null);
    if (props.asyncData !== null) {
      watch(() => props.asyncData, () => nextTick(setAnime));
    } else {
      nextTick(setAnime);
    }
    function setAnime() {
      if (!text.value)
        return;
      if (text.value.clientWidth > view.value.clientWidth) {
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
      const moveLength = text.value.clientWidth - view.value.clientWidth;
      let moveLengthEveryStep = moveLength / props.duration / 60;
      let position = 0;
      const move = (time) => {
        if (!text.value)
          return;
        if (position >= 0 || position <= -moveLength) {
          moveLengthEveryStep = -moveLengthEveryStep;
          setTimeout(() => {
            if (!text.value)
              return;
            text.value.style.transform = `translateX(${position += moveLengthEveryStep})px`;
            requestAnimationFrame(move);
          }, 2e3);
          return;
        }
        text.value.style.transform = `translateX(${position += moveLengthEveryStep}px)`;
        requestAnimationFrame(move);
      };
      requestAnimationFrame(move);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "rollText",
        ref_key: "view",
        ref: view,
        style: normalizeStyle({ justifyContent: _ctx.$props.align })
      }, [
        createElementVNode("div", {
          class: normalizeClass(["move", unref(state)]),
          style: normalizeStyle({ animationDuration: _ctx.$props.duration + "s" })
        }, [
          _ctx.$props.asyncData === null ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createElementVNode("div", {
              class: "text",
              ref_key: "text",
              ref: text
            }, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 512),
            _ctx.$props.type == 1 ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ])) : createCommentVNode("", true)
          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createElementVNode("div", {
              class: "text",
              ref_key: "text",
              ref: text,
              innerHTML: _ctx.$props.asyncData
            }, null, 8, _hoisted_2$3),
            _ctx.$props.type == 1 ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "text",
              innerHTML: _ctx.$props.asyncData
            }, null, 8, _hoisted_3$1)) : createCommentVNode("", true)
          ], 64))
        ], 6)
      ], 4);
    };
  }
}));
var RollText = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-3bb0bd0f"]]);
var index$5 = {
  install(app) {
    app.component("RollText", RollText);
  }
};
var LazyLoadBox_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".lazyLoadBox[data-v-4b78e094]{opacity:0}.top[data-v-4b78e094]{animation:top-4b78e094 linear 1 forwards}.bottom[data-v-4b78e094]{animation:bottom-4b78e094 linear 1 forwards}.left[data-v-4b78e094]{animation:left-4b78e094 linear 1 forwards}.right[data-v-4b78e094]{animation:right-4b78e094 linear 1 forwards}@keyframes top-4b78e094{0%{transform:translateY(-20%)}to{opacity:1;transform:translateY(0)}}@keyframes bottom-4b78e094{0%{transform:translateY(20%)}to{opacity:1;transform:translateY(0)}}@keyframes left-4b78e094{0%{transform:translate(-20%)}to{opacity:1;transform:translate(0)}}@keyframes right-4b78e094{0%{transform:translate(20%)}to{opacity:1;transform:translate(0)}}\n")();
const __default__$4 = defineComponent({
  name: "lazyLoadBox"
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$4), {
  props: {
    duration: { default: 0.5 },
    direction: { default: "bottom" },
    isReHidden: { type: Boolean, default: false }
  },
  emits: ["onShow"],
  setup(__props, { emit }) {
    const props = __props;
    const observer = shallowRef(null);
    const animeClass = ref("");
    let io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        emit("onShow");
        animeClass.value = `${props.direction}`;
        if (!props.isReHidden) {
          io.unobserve(e.target);
        }
      } else {
        animeClass.value = "";
      }
    });
    onMounted(() => io.observe(observer.value));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["lazyLoadBox", animeClass.value]),
        style: normalizeStyle({ animationDuration: __props.duration + "s" }),
        ref_key: "observer",
        ref: observer
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 6);
    };
  }
}));
var LazyLoadBox = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-4b78e094"]]);
var index$4 = {
  install(app) {
    app.component("LazyLoadBox", LazyLoadBox);
  }
};
function mathBase(methods) {
  const method = Math[methods];
  return function(number, precision = 0) {
    if (precision) {
      number = number + "e" + precision;
      return +(method(+number) + "e" + -precision);
    } else {
      return method(+number);
    }
  };
}
const _mathMethods = {
  ADD: {
    getPoint: (point1, point2) => [point1 > point2 ? point1 : point2, point1 > point2 ? point1 : point2],
    method: (num1, num2) => num1 + num2
  },
  SUB: {
    getPoint: (point1, point2) => [point1 > point2 ? point1 : point2, point1 > point2 ? point1 : point2],
    method: (num1, num2) => num1 - num2
  },
  MUL: {
    getPoint: (point1, point2) => [point1 > point2 ? point1 : point2, point1 + point2],
    method: (num1, num2) => num1 * num2
  },
  DIV: {
    getPoint: (point1, point2) => [point1 > point2 ? point1 : point2, 0],
    method: (num1, num2) => num1 / num2
  }
};
function operateBase(type) {
  const methods = _mathMethods[type];
  return (num1, num2) => {
    const str1 = "" + num1;
    const str2 = "" + num2;
    let num1_point = str1.lastIndexOf(".");
    let num2_point = str2.lastIndexOf(".");
    if (~num1_point && ~num2_point) {
      num1_point = str1.length - 1 - num1_point;
      num2_point = str2.length - 1 - num2_point;
      const [point, finallyPiont] = methods.getPoint(num1_point, num2_point);
      const add1 = +(num1 + "e" + point);
      const add2 = +(num2 + "e" + point);
      return +(methods.method(add1, add2) + "e" + -finallyPiont);
    } else {
      return methods.method(num1, num2);
    }
  };
}
class SDMath {
}
__publicField(SDMath, "round", mathBase("round"));
__publicField(SDMath, "ceil", mathBase("ceil"));
__publicField(SDMath, "floor", mathBase("floor"));
__publicField(SDMath, "add", operateBase("ADD"));
__publicField(SDMath, "sub", operateBase("SUB"));
__publicField(SDMath, "mul", operateBase("MUL"));
__publicField(SDMath, "div", operateBase("DIV"));
class SliderHelper {
  constructor(sliderWidth, leftest) {
    __publicField(this, "beforemovePosition");
    this.sliderWidth = sliderWidth;
    this.leftest = leftest;
  }
  get rightest() {
    return this.sliderWidth + this.leftest;
  }
  movePosition(sliderWidth, leftest, beforemovePosition) {
    this.sliderWidth = sliderWidth;
    this.leftest = leftest;
    this.beforemovePosition = beforemovePosition;
  }
  btnPosition(mousePoint) {
    if (mousePoint < this.leftest) {
      return 0;
    } else if (mousePoint > this.rightest) {
      return 100;
    } else {
      return SDMath.round((mousePoint - this.leftest) / this.sliderWidth * 100, 2);
    }
  }
  reset() {
    return this.beforemovePosition;
  }
}
var Slider_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".slider[data-v-33f70ec2]{--Height: .8rem;--DIA: 1.2rem;position:relative;height:var(--Height);margin:calc((var(--DIA) - var(--Height)) / 2) 0;border-radius:calc(var(--Height) / 1.5);background-color:var(--color-text-default)}.slider .passed[data-v-33f70ec2]{height:var(--Height);border-radius:calc(var(--Height) / 1.5);background-color:var(--color-text-theme)}.slider .passed .btn[data-v-33f70ec2]{float:right;width:var(--DIA);height:var(--DIA);background:var(--color-text-theme);box-sizing:border-box;margin:calc((var(--DIA) - var(--Height)) / -2) calc(var(--DIA) / -2) 0 0;border:calc(var(--DIA) - var(--Height)) solid var(--color-text-default);border-radius:50%;cursor:grab}\n")();
const _withScopeId$2 = (n) => (pushScopeId("data-v-33f70ec2"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("div", { class: "btn" }, null, -1));
const _hoisted_2$2 = [
  _hoisted_1$2
];
const __default__$3 = defineComponent({
  name: "slider"
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$3), {
  props: {
    modelValue: null
  },
  emits: ["update:modelValue", "onDragStart", "onDragging", "onDrop"],
  setup(__props, { emit }) {
    const props = __props;
    const slider = shallowRef(null);
    let position = ref(props.modelValue != void 0 ? props.modelValue : 100);
    let isCanMove = false;
    let sliderHelper;
    if (typeof props.modelValue == "number") {
      watch(() => props.modelValue, () => {
        if (!isCanMove) {
          position.value = props.modelValue;
        }
      });
    }
    function getSliderDetail() {
      const { x, width } = slider.value.getBoundingClientRect();
      return { x, width };
    }
    function mouseDownHandler(e) {
      isCanMove = true;
      const sliderDetail = getSliderDetail();
      sliderHelper.movePosition(sliderDetail.width, sliderDetail.x, position.value);
      if (e.target.className !== "btn") {
        position.value = sliderHelper.btnPosition(e.clientX);
      }
      emit("onDragStart", position.value);
    }
    function mouseUpHandler(e) {
      if (isCanMove) {
        isCanMove = false;
        const nowPosition = sliderHelper.btnPosition(e.clientX);
        if (nowPosition == 0 || nowPosition == 100 || e.target.className == "btn") {
          position.value = nowPosition;
          emit("update:modelValue", position.value);
          emit("onDrop", position.value);
        } else {
          position.value = sliderHelper.reset();
        }
      }
    }
    function mouseMoveHandler(e) {
      if (isCanMove) {
        position.value = sliderHelper.btnPosition(e.clientX);
        emit("onDragging", position.value);
      }
    }
    onMounted(() => {
      const sliderDetail = getSliderDetail();
      sliderHelper = new SliderHelper(sliderDetail.width, sliderDetail.x);
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    });
    onUnmounted(() => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "slider",
        ref_key: "slider",
        ref: slider,
        onMousedown: mouseDownHandler
      }, [
        createElementVNode("div", {
          class: "passed",
          style: normalizeStyle({ width: unref(position) + "%" })
        }, _hoisted_2$2, 4)
      ], 544);
    };
  }
}));
var Slider = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-33f70ec2"]]);
var index$3 = {
  install(app) {
    app.component("Slider", Slider);
  }
};
class BtnList {
  constructor(maxLen, limitLen) {
    __publicField(this, "max");
    __publicField(this, "limit");
    __publicField(this, "limitHalf");
    __publicField(this, "_curr");
    __publicField(this, "maxArr");
    __publicField(this, "showArr");
    this.max = +maxLen;
    this.limit = +limitLen;
    this.limitHalf = this.limit % 2 ? ~~(this.limit / 2) + 1 : this.limit / 2;
    this._curr = 1;
    this.maxArr = Array.from({ length: this.max }).map((item, index2) => index2 + 1);
    if (this.max > limitLen) {
      this.showArr = this.maxArr.slice(0, this.limit - 2).concat("...", this.max);
    } else {
      this.showArr = this.maxArr;
    }
  }
  refreshList() {
    if (this.max <= this.limit)
      return;
    if (this._curr < this.limitHalf) {
      this.showArr = this.maxArr.slice(0, this.limit - 2).concat("...", this.max);
    } else if (this._curr < this.max - this.limitHalf + 1) {
      this.showArr = [1, "..."].concat(this.maxArr.slice(this._curr - (this.limitHalf - 2), this._curr - (this.limitHalf - 2) + this.limit - 4)).concat("...", this.max);
    } else {
      this.showArr = [1, "..."].concat(this.maxArr.slice(this.maxArr.length - this.limit + 2));
    }
  }
  get curr() {
    return this._curr;
  }
  set curr(value) {
    if (value == this._curr)
      return;
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
var SplitPage_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".splitPage[data-v-2026c63f]{display:flex;flex-direction:column;justify-content:space-between;align-items:center;user-select:none}.splitPage .buttons[data-v-2026c63f]{display:flex;justify-content:center;width:100%;margin-bottom:1rem}.splitPage .buttons .button[data-v-2026c63f]{display:flex;align-items:center;justify-content:center;width:3rem;height:3rem;box-sizing:border-box;padding:.3rem .6rem;border-radius:.3rem;border:1px solid var(--color-border);margin:0 .5rem;cursor:pointer}.splitPage .buttons .button[data-v-2026c63f]:hover,.splitPage .buttons .button.current[data-v-2026c63f]{color:var(--color-text-theme);border-color:var(--color-text-theme)}.splitPage .buttons .button.arrow[data-v-2026c63f]{font-weight:600}.splitPage .buttons .button.ellipsis[data-v-2026c63f]{border:none;pointer-events:none;cursor:default}.splitPage .jumpTo input[data-v-2026c63f]{margin:0 .5rem;max-width:2rem;border:1.5px solid var(--color-border);border-radius:.5rem}.splitPage .jumpTo input[data-v-2026c63f]:focus-visible{outline-style:none;border-color:var(--color-text-theme)!important}\n")();
const _withScopeId$1 = (n) => (pushScopeId("data-v-2026c63f"), n = n(), popScopeId(), n);
const _hoisted_1$1 = {
  key: 0,
  class: "splitPage"
};
const _hoisted_2$1 = { class: "buttons" };
const _hoisted_3 = ["onClick"];
const _hoisted_4 = { class: "jumpTo" };
const _hoisted_5 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("span", null, "\u8DF3\u8F6C\u5230\u7B2C", -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("span", null, "\u9875", -1));
const __default__$2 = defineComponent({
  name: "splitPage"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$2), {
  props: {
    modelValue: null,
    limit: { default: 7 },
    totalPage: null,
    currentPage: null
  },
  emits: ["update:modelValue", "onPageChange", "getNewData"],
  setup(__props, { emit }) {
    const props = __props;
    const pageCache = /* @__PURE__ */ Object.create(null);
    const btns = ref(new BtnList(props.totalPage, props.limit));
    btns.value.curr = props.currentPage ? +props.currentPage : 1;
    pageCache[btns.value.curr] = props.modelValue;
    watch(() => props.totalPage, () => {
      btns.value = new BtnList(props.totalPage, props.limit);
      btns.value.curr = props.currentPage ? +props.currentPage : 1;
      pageCache[btns.value.curr] = props.modelValue;
    });
    let jumpPage = ref(btns.value.curr);
    function changePage() {
      emit("onPageChange", btns.value.curr);
      if (pageCache[btns.value.curr]) {
        emit("update:modelValue", pageCache[btns.value.curr]);
      } else {
        emit("getNewData", btns.value.curr);
      }
    }
    watch(() => props.modelValue, (n) => {
      if (!pageCache[btns.value.curr]) {
        pageCache[btns.value.curr] = n;
      }
    });
    return (_ctx, _cache) => {
      return __props.totalPage > 1 ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
        createElementVNode("div", _hoisted_2$1, [
          createElementVNode("div", {
            class: "button arrow",
            onClick: _cache[0] || (_cache[0] = ($event) => {
              btns.value.prev();
              changePage();
            })
          }, " \u276E "),
          (openBlock(true), createElementBlock(Fragment, null, renderList(btns.value.showArr, (page) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["button", { current: btns.value.curr == page, ellipsis: page == "..." }]),
              key: page,
              onClick: ($event) => {
                btns.value.curr = page;
                changePage();
              }
            }, toDisplayString(page), 11, _hoisted_3);
          }), 128)),
          createElementVNode("div", {
            class: "button arrow",
            onClick: _cache[1] || (_cache[1] = ($event) => {
              btns.value.next();
              changePage();
            })
          }, " \u276F ")
        ]),
        createElementVNode("div", _hoisted_4, [
          _hoisted_5,
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(jumpPage) ? jumpPage.value = $event : jumpPage = $event),
            onKeypress: _cache[3] || (_cache[3] = withKeys(($event) => {
              btns.value.curr = +unref(jumpPage);
              changePage();
            }, ["enter"])),
            type: "text"
          }, null, 544), [
            [vModelText, unref(jumpPage)]
          ]),
          _hoisted_6
        ])
      ])) : createCommentVNode("", true);
    };
  }
}));
var SplitPage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-2026c63f"]]);
var index$2 = {
  install(app) {
    app.component("SplitPage", SplitPage);
  }
};
var SwitchButton_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".switchButton[data-v-cad2ce44]{--height: 2rem;--width: 5rem;display:flex}.switchButton .center[data-v-cad2ce44]{box-sizing:border-box;padding:0 calc(var(--height) / 2) 0 0;border-radius:var(--height);border:var(---color-border);margin:0 .5rem;width:var(--width);height:var(--height);background-color:var(--color-bg-deep);cursor:pointer}.switchButton .center>div[data-v-cad2ce44]{width:var(--height);height:var(--height);clip-path:circle(50%);background-color:var(--color-text-default);transition:all .3s}.switchButton .chosed[data-v-cad2ce44]{color:var(--color-primary-bland)}.switchButton .notChosed[data-v-cad2ce44]{color:var(--color-error-bland)}.switchButton.open .center[data-v-cad2ce44]{background-color:var(--color-primary-bland)}.switchButton.open .center>div[data-v-cad2ce44]{transform:translate(calc(var(--width) - 100%))}\n")();
const _withScopeId = (n) => (pushScopeId("data-v-cad2ce44"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", null, null, -1));
const _hoisted_2 = [
  _hoisted_1
];
const __default__$1 = defineComponent({
  name: "switchButton"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$1), {
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "onStatuChange"],
  setup(__props, { emit }) {
    const props = __props;
    function statuChange() {
      emit("update:modelValue", !props.modelValue);
      emit("onStatuChange", !props.modelValue);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["switchButton", { open: __props.modelValue }])
      }, [
        createElementVNode("div", {
          class: normalizeClass({ chosed: !__props.modelValue, notChosed: __props.modelValue }),
          onClick: _cache[0] || (_cache[0] = ($event) => (emit("update:modelValue", false), emit("onStatuChange", false)))
        }, [
          renderSlot(_ctx.$slots, "left", {}, void 0, true)
        ], 2),
        createElementVNode("div", {
          class: "center",
          onClick: statuChange
        }, _hoisted_2),
        createElementVNode("div", {
          class: normalizeClass({ chosed: __props.modelValue, notChosed: !__props.modelValue }),
          onClick: _cache[1] || (_cache[1] = ($event) => (emit("update:modelValue", true), emit("onStatuChange", true)))
        }, [
          renderSlot(_ctx.$slots, "right", {}, void 0, true)
        ], 2)
      ], 2);
    };
  }
}));
var SwitchButton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-cad2ce44"]]);
var index$1 = {
  install(app) {
    app.component("SwitchButton", SwitchButton);
  }
};
var components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RollText: index$5,
  LazyLoadBox: index$4,
  Slider: index$3,
  SplitPage: index$2,
  SwitchButton: index$1
}, Symbol.toStringTag, { value: "Module" }));
var Message_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".message[data-v-15ad05a8]{display:flex;align-items:center;width:33%;height:max-content;box-sizing:border-box;padding:1rem 1.8rem;margin:auto;margin-bottom:.6rem;border-radius:.4rem}.message.default[data-v-15ad05a8]{color:var(--color-bg-bland);background-color:var(--color-text-default)}.message.success[data-v-15ad05a8]{color:var(--color-primary);background-color:var(--color-primary-text)}.message.error[data-v-15ad05a8]{color:var(--color-error);background-color:var(--color-error-text)}.message .text[data-v-15ad05a8]{margin-right:1rem;font-size:1rem;font-weight:600;flex:1}.message .text.center[data-v-15ad05a8]{text-align:center}.message .text.left[data-v-15ad05a8]{text-align:left}.message .canClose[data-v-15ad05a8]{cursor:pointer}.message .cantClose[data-v-15ad05a8]{display:none}.message-leave-active[data-v-15ad05a8]{transition:all .7s ease}.message-leave-to[data-v-15ad05a8]{opacity:0;transform:var(--8984f1b4)}\n")();
const __default__ = defineComponent({
  name: "message"
});
const _sfc_main = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__), {
  props: {
    text: null,
    type: null,
    duration: null,
    isCanClose: { type: Boolean },
    align: null,
    style: null,
    leaveTo: null,
    onClose: null
  },
  setup(__props) {
    const props = __props;
    useCssVars((_ctx) => ({
      "8984f1b4": direction.value
    }));
    const isShow = ref(true);
    onMounted(() => {
      if (props.duration > 0) {
        setTimeout(() => {
          isShow.value = false;
        }, props.duration);
      }
    });
    const directionMap = {
      top: "translateY(-100%)",
      bottom: "translateY(100%)",
      left: "translateX(-100%)",
      right: "translateX(100%)"
    };
    const direction = ref(directionMap[props.leaveTo]);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: "message",
        onBeforeLeave: __props.onClose,
        onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy"))
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            class: normalizeClass(["message", __props.type]),
            style: normalizeStyle(__props.style)
          }, [
            createElementVNode("div", {
              class: normalizeClass(["text", __props.align])
            }, toDisplayString(__props.text), 3),
            createElementVNode("div", {
              onClick: _cache[0] || (_cache[0] = ($event) => isShow.value = !isShow.value),
              class: normalizeClass(__props.isCanClose || !(__props.duration > 0) ? "canClose" : "cantClose")
            }, " \u2716 ", 2)
          ], 6), [
            [vShow, isShow.value]
          ])
        ]),
        _: 1
      }, 8, ["onBeforeLeave"]);
    };
  }
}));
var messageComp = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-15ad05a8"]]);
let messageBox = null;
function renderMessage(options) {
  if (!messageBox) {
    messageBox = document.createElement("div");
    messageBox.style.cssText = `position:fixed;top:8%;display:flex;flex-direction:column;z-index:999;width:100%;height:0;`;
    document.body.appendChild(messageBox);
  }
  const vm = createVNode(messageComp, options);
  const renderBody = document.createElement("div");
  render(vm, renderBody);
  messageBox.appendChild(renderBody.firstElementChild);
  vm.props.onDestroy = () => render(null, renderBody);
}
const defaultProps = {
  duration: 1300,
  align: "left",
  isCanClose: true,
  type: "default",
  leaveTo: "top"
};
const Message = (text, options) => {
  renderMessage(Object.assign({}, defaultProps, options, { text }));
};
Message.success = (text, options) => {
  renderMessage(Object.assign({}, defaultProps, options, { text, type: "success" }));
};
Message.error = (text, options) => {
  renderMessage(Object.assign({}, defaultProps, options, { text, type: "error" }));
};
class AsyncConstructor {
  constructor(asyncArrowFunction) {
    __publicField(this, "then");
    const init = (() => __async(this, null, function* () {
      yield Promise.resolve();
      yield asyncArrowFunction();
      delete this.then;
      return this;
    }))();
    this.then = init.then.bind(init);
  }
}
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
function unCapitalize(str) {
  return str[0].toLowerCase() + str.slice(1);
}
function debounce(callback, delay = 300, style = true) {
  let timeoutId = void 0;
  if (style) {
    return function(...args) {
      if (!timeoutId) {
        callback.apply(this, args);
      } else {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        timeoutId = void 0;
      }, delay);
    };
  } else {
    return function(...args) {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  }
}
const isSymbol = (arg) => typeof arg == "symbol";
const isNull = (arg) => arg === null;
const isObject = (arg) => typeof arg == "object" && !Array.isArray(arg) && typeof arg !== "function" && arg !== null && !(arg instanceof RegExp);
const isRegExp = (arg) => arg instanceof RegExp;
function deepClone(o, cache2 = /* @__PURE__ */ new WeakMap()) {
  if (window.structuredClone)
    return window.structuredClone(o);
  if (isRegExp(o) || isNull(o))
    throw "\u4F20\u5165\u7C7B\u578B\u9519\u8BEF";
  let result = Array.isArray(o) ? [] : /* @__PURE__ */ Object.create(null);
  if (cache2.get(o)) {
    return cache2.get(o);
  } else {
    cache2.set(o, result);
    for (const key in o) {
      if (isObject(o[key])) {
        result[key] = deepClone(o[key], cache2);
      } else {
        result[key] = o[key];
      }
    }
    Object.setPrototypeOf(result, Object.getPrototypeOf(o));
    return result;
  }
}
function isEmpty(value, isCheckZero = false) {
  if (typeof value !== "object" || value == null) {
    if (value === "")
      return true;
    return value == 0 ? isCheckZero ? true : false : !value;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return true;
    } else {
      for (const item of value) {
        if (!isEmpty(item, isCheckZero)) {
          return false;
        }
      }
      return true;
    }
  } else {
    if (Object.keys(value).length === 0) {
      return true;
    } else {
      for (const key in value) {
        if (!isEmpty(value[key], isCheckZero)) {
          return false;
        }
      }
      return true;
    }
  }
}
function havaEmpty(value, isCheckZero = false) {
  if (Array.isArray(value)) {
    for (const item of value) {
      if (isEmpty(item, isCheckZero)) {
        return true;
      }
    }
    return false;
  } else {
    for (const key in value) {
      if (isEmpty(value[key], isCheckZero)) {
        return true;
      }
    }
    return false;
  }
}
function deleteEmpty(value, isCheckZero = false) {
  if (Array.isArray(value)) {
    const result = [];
    value.forEach((item) => {
      if (!isEmpty(item, isCheckZero)) {
        if (typeof item != "object") {
          result.push(item);
        } else {
          result.push(deleteEmpty(item));
        }
      }
    });
    return result;
  } else {
    const result = Object.create(Object.getPrototypeOf(value));
    for (const key in value) {
      if (!isEmpty(value[key], isCheckZero)) {
        if (typeof value[key] != "object") {
          result[key] = value[key];
        } else {
          result[key] = deleteEmpty(value[key]);
        }
      }
    }
    return result;
  }
}
var isMobile = /Mobile/i.test(navigator.userAgent);
function isSame(F, S, deep = false) {
  if (F === S)
    return true;
  if (Number.isNaN(F) && Number.isNaN(S))
    return true;
  if (isSymbol(F) && isSymbol(S)) {
    if (F.toString() === S.toString()) {
      return true;
    } else {
      return false;
    }
  }
  if (isRegExp(F) && isRegExp(S)) {
    if (!(F.source === S.source))
      return false;
  }
  let FF = F, SS = S;
  const Fkeys = deep ? Reflect.ownKeys(FF) : Object.keys(FF);
  const Skeys = deep ? Reflect.ownKeys(SS) : Object.keys(SS);
  if (Fkeys.length != Skeys.length)
    return false;
  for (const key of Fkeys) {
    if (!Skeys.includes(key))
      return false;
    if (!isSame(FF[key], SS[key])) {
      return false;
    }
  }
  return true;
}
function iterable(obj, sortFunc) {
  if (obj[Symbol.iterator])
    return;
  Object.defineProperty(obj, Symbol.iterator, {
    value: function() {
      const keys = sortFunc ? Object.keys(this).sort(sortFunc) : Object.keys(this);
      let count = 0;
      return {
        next: () => {
          if (count < keys.length) {
            return { done: false, value: this[keys[count]] };
          } else {
            return { done: true, value: void 0 };
          }
        },
        return() {
          return { done: true, value: void 0 };
        },
        throw() {
          throw { done: true, value: void 0 };
        }
      };
    }.bind(obj),
    writable: false,
    enumerable: false,
    configurable: false
  });
}
class LocalFiles extends AsyncConstructor {
  constructor({ count = 1, type = [], maxSize = Number.MAX_VALUE } = {}) {
    super(() => __async(this, null, function* () {
      const limitSize = maxSize ? maxSize * 1024 : maxSize;
      const input = document.createElement("input");
      input.type = "file";
      input.style.display = "none";
      input.multiple = count == 1 ? false : true;
      input.accept = ",." + (type.join(",.") || "*");
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
      this.files = yield new Promise((resolve, reject) => {
        input.addEventListener("change", function read(e) {
          let target = e.target;
          if (count == 1 || target.files.length == 1) {
            if (target.files[0].size < limitSize) {
              resolve([target.files[0]]);
            } else {
              reject("\u9009\u62E9\u7684\u6587\u4EF6\u8D85\u51FA\u5141\u8BB8\u5927\u5C0F");
            }
          } else {
            let counter = 0;
            const result = [];
            Array.prototype.forEach.call(target.files, (item) => {
              if (counter < count && item.size < limitSize) {
                counter++;
                result.push(item);
              }
            });
            if (result.length == 0) {
              reject("\u9009\u62E9\u7684\u6587\u4EF6\u5168\u90E8\u8D85\u51FA\u5141\u8BB8\u5927\u5C0F");
            } else {
              resolve(result);
            }
          }
          this.removeEventListener("change", read);
        });
      });
    }));
    __publicField(this, "text");
    __publicField(this, "dataurl");
    this.text = ["txt", "md", "json", "js", "css", "less", "sass", "ts", "xml", "html"];
    this.dataurl = ["jpg", "png", "jpge", "gif", "mp4", "mp3", "flac"];
  }
  get names() {
    return this.files.map((item) => item.name);
  }
  get sizes() {
    return this.files.map((item) => item.size);
  }
  read(_0) {
    return __async(this, arguments, function* (order, { chunkSize, readAs } = {}) {
      if (order === void 0) {
        const result = [];
        for (const file of this.files) {
          const content = yield this.readFile(file, readAs != null ? readAs : this.readType(file), chunkSize);
          result.push(content);
        }
        return result;
      } else {
        const file = this.files[order];
        return yield this.readFile(file, readAs != null ? readAs : this.readType(file), chunkSize);
      }
    });
  }
  readType(file) {
    const regexp = new RegExp("(?<=\\.)\\w+$");
    const fileType = file.name.match(regexp)[0];
    if (fileType == null) {
      return "readAsText";
    }
    if (this.text.includes(fileType)) {
      return "readAsText";
    } else if (this.dataurl.includes(fileType)) {
      return "readAsDataURL";
    } else {
      return "readAsArrayBuffer";
    }
  }
  readFile(file, readAs, chunkSize) {
    return __async(this, null, function* () {
      const reader = new FileReader();
      if (chunkSize === void 0 || file.size <= chunkSize) {
        reader[readAs](file);
        return new Promise((resolve, reject) => {
          reader.onerror = () => {
            reject("\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25");
          };
          reader.onload = (e) => {
            resolve(e.target.result);
          };
        });
      } else {
        const chunkCount = Math.ceil(file.size / chunkSize);
        const chunks = [];
        for (let i = 0; i < chunkCount; i++) {
          const start = i * chunkSize, end = start + chunkSize >= file.size ? file.size : start + chunkSize;
          chunks.push(yield this.readFile(file.slice(start, end), "readAsArrayBuffer", chunkSize));
        }
        return chunks;
      }
    });
  }
}
const _SDDate = class extends Date {
  constructor(args) {
    args ? super(args) : super();
  }
  format(formatStr = "/YYYY/-/MM/-/DD/ /HH/:/mm/:/ss/./ms/ /TT/ \u5468/W/", useChinese = true) {
    formatStr = formatStr.replace(/\/TT\//g, this.getHours() > 12 ? useChinese ? "\u4E0B\u5348" : "p.m." : useChinese ? "\u4E0A\u5348" : "a.m.");
    const regexp = new RegExp("(?<FullYear>\\/YYYY\\/)|(?<month>\\/M{2,3}\\/)|(?<Date>\\/DD\\/)|(?<Hours>\\/(h|H){2}\\/)|(?<Minutes>\\/mm\\/)|(?<Seconds>\\/ss\\/)|(?<Day>\\/W\\/)|(?<Milliseconds>\\/ms\\/)", "g");
    return formatStr.replace(regexp, (...args) => {
      const groups = args.pop();
      const key = Object.keys(JSON.parse(JSON.stringify(groups)))[0];
      let data = "" + this["get" + key]();
      switch (key) {
        case "month":
          if (groups.month.length === 5) {
            return useChinese ? transformChinese[data] : transformEnglish_Month[+data - 1];
          }
          return data.length < 2 ? "0" + data : data;
        case "Day":
          return useChinese ? transformChinese[data] : transformEnglish_Week[data];
        case "Hours":
          return /\/hh\//g.test(formatStr) ? +data > 12 ? +data - 12 : data : data;
        case "Milliseconds":
          if (data.length < 3) {
            return 3 - data.length == 1 ? "0" + data : "00" + data;
          } else {
            return data;
          }
        default:
          return data.length < 2 ? "0" + data : data;
      }
    });
  }
  getmonth(useChinese) {
    if (useChinese == void 0) {
      return this.getMonth() + 1;
    } else {
      if (useChinese) {
        return transformChinese[this.getMonth() + 1] + "\u6708";
      } else {
        return transformEnglish_Month[this.getMonth()];
      }
    }
  }
  add(add, precision = "ss") {
    const newTime = this.getTime() + add * _SDDate.timeTable[precision][1];
    return new _SDDate(newTime);
  }
  sub(sub, precision = "ss") {
    const newTime = this.getTime() - sub * _SDDate.timeTable[precision][1];
    return new _SDDate(newTime);
  }
  difference(time, precision = "mm", formatStr = "/mm/:/ss/") {
    const now = this.getTime();
    const timeNumber = new Date(time).getTime();
    const difference = now - timeNumber;
    return transformTimeNumber(Math.abs(difference), precision, formatStr);
  }
  static difference(timeOne, timeTwo, precision = "mm", formatStr = "/mm/:/ss/") {
    const TimeOne = new Date(timeOne).getTime();
    const TimeTwo = new Date(timeTwo).getTime();
    const difference = TimeOne - TimeTwo;
    return transformTimeNumber(Math.abs(difference), precision, formatStr);
  }
  static formatNow(formatStr = "/YYYY/-/MM/-/DD/ /HH/:/mm/:/ss/./ms/ /TT/ \u5468/W/", useChinese = true) {
    return new _SDDate().format(formatStr, useChinese);
  }
};
let SDDate = _SDDate;
__publicField(SDDate, "timeTable", {
  ms: ["Millisecond", 1],
  ss: ["Second", 1e3],
  mm: ["Minute", 1e3 * 60],
  hh: ["Hour", 1e3 * 60 * 60],
  DD: ["Day", 1e3 * 60 * 60 * 24],
  W: ["Week", 1e3 * 60 * 60 * 24 * 7],
  MM: ["Month", 1e3 * 60 * 60 * 24 * 30],
  YYYY: ["Year", 1e3 * 60 * 60 * 24 * 365],
  setYear(value) {
    return this.YYYY = ["Year", 1e3 * 60 * 60 * 24 * value];
  },
  setMonth(value) {
    return this.MM = ["Month", 1e3 * 60 * 60 * 24 * value];
  }
});
function transformTimeNumber(timeNumber, precision = "mm", formatStr = "/mm/:/ss/") {
  const TimeTable = SDDate.timeTable;
  const result = {};
  const detailPrecision = TimeTable[precision][0];
  switch (detailPrecision) {
    case "Year":
      result.Year = ~~(timeNumber / TimeTable.YYYY[1]);
      timeNumber = timeNumber % TimeTable.YYYY[1];
    case "Month":
      result.Month = ~~(timeNumber / TimeTable.MM[1]);
      timeNumber = timeNumber % TimeTable.MM[1];
    case "Day":
      result.Day = ~~(timeNumber / TimeTable.DD[1]);
      timeNumber = timeNumber % TimeTable.DD[1];
    case "Hour":
      result.Hour = ~~(timeNumber / TimeTable.hh[1]);
      timeNumber = timeNumber % TimeTable.hh[1];
    case "Minute":
      result.Minute = ~~(timeNumber / TimeTable.mm[1]);
      timeNumber = timeNumber % TimeTable.mm[1];
    case "Second":
      result.Second = ~~(timeNumber / TimeTable.ss[1]);
      if (/ms/g.test(formatStr)) {
        timeNumber = timeNumber % TimeTable.ss[1];
      } else {
        break;
      }
    case "Millisecond":
      result.Millisecond = timeNumber;
  }
  const regexp = new RegExp("(?<FullYear>\\/YYYY\\/)|(?<month>\\/M{2,3}\\/)|(?<Date>\\/DD\\/)|(?<Hours>\\/(h|H){2}\\/)|(?<Minutes>\\/mm\\/)|(?<Seconds>\\/ss\\/)|(?<Day>\\/W\\/)|(?<Milliseconds>\\/ms\\/)", "g");
  return formatStr.replace(regexp, (...args) => {
    const key = Object.keys(JSON.parse(JSON.stringify(args.pop())))[0];
    if (key == "Millisecond") {
      let data = "" + result[key];
      if (data.length < 3) {
        return 3 - data.length == 1 ? "0" + data : "00" + data;
      }
    } else {
      if (("" + result[key]).length < 2) {
        return "0" + result[key];
      }
    }
    return "" + result[key];
  });
}
const transformChinese = ["\u5929", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u5341\u4E00", "\u5341\u4E8C"];
const transformEnglish_Week = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const transformEnglish_Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
let cache = null;
const _localStorage = Symbol("_localStorage");
class LocalStorage {
  constructor() {
    __publicField(this, _a);
    if (cache)
      return cache;
    this[_localStorage] = window.localStorage;
    cache = this;
  }
  clear() {
    this[_localStorage].clear();
  }
  removeItem(key) {
    this[_localStorage].removeItem(key);
  }
  setItem(key, value) {
    this[_localStorage].setItem(key, JSON.stringify(pack(value)));
  }
  setLimitItem(key, value, limit, precision) {
    this[_localStorage].setItem(key, JSON.stringify(setLimit(pack(value), limit, precision)));
  }
  readCache(key) {
    try {
      return JSON.parse(this[_localStorage].getItem(key));
    } catch (e) {
      return this[_localStorage].getItem(key);
    }
  }
  getItem(key) {
    let data = this.readCache(key);
    if (isCacheItem(data)) {
      if (data[1].__LIMIT__ && data[1].__LIMIT__ < Date.now()) {
        this.removeItem(key);
        return null;
      } else {
        return unpack(data);
      }
    } else {
      return data;
    }
  }
  refresh(key, limit, precision) {
    let data = this.readCache(key);
    if (isCacheItem(data)) {
      data[1].__LIMIT__ = new SDDate().add(limit, precision).getTime();
      return unpack(data);
    } else {
      if (data == null) {
        return null;
      } else {
        this.setLimitItem(key, data, limit, precision);
        return data;
      }
    }
  }
  get keys() {
    return Object.keys(this[_localStorage]);
  }
}
_a = _localStorage;
function isCacheItem(data) {
  var _a2;
  if (Array.isArray(data) && typeof ((_a2 = data == null ? void 0 : data[1]) == null ? void 0 : _a2.__TYPE__) == "number") {
    return true;
  } else {
    return false;
  }
}
function pack(data) {
  switch (typeof data) {
    case "string":
      return [data, { __TYPE__: 0 }];
    case "number":
    case "boolean":
      return [data, { __TYPE__: 1 }];
    case "object":
      if (isNull(data)) {
        return ["null", { __TYPE__: 4 }];
      } else if (isRegExp(data)) {
        const { source, flags } = data;
        return [{ source, flags }, { __TYPE__: 6 }];
      } else {
        return [data, { __TYPE__: 3 }];
      }
    case "undefined":
      return ["void 0", { __TYPE__: 5 }];
    case "bigint":
      return [data, { __TYPE__: 2 }];
  }
  throw "\u8BE5\u7C7B\u578B\u4E0D\u80FD\u88AB\u5B58\u50A8";
}
function unpack(data) {
  const flag = data[1].__TYPE__;
  switch (flag) {
    case 0:
      return data[0] + "";
    case 1:
      return data[0];
    case 3:
      return data[0];
    case 4:
      return null;
    case 5:
      return void 0;
    case 2:
      return BigInt(data[0]);
    case 6:
      return new RegExp(data[0].source, data[0].flags);
  }
}
function setLimit(data, limit, precision) {
  data[1].__LIMIT__ = new SDDate().add(limit, precision).getTime();
  return data;
}
const charMap = {
  char: [33, 126],
  lower: [97, 122],
  upper: [65, 90],
  number: [48, 57],
  chinese: [19968, 40869]
};
class Random {
  static number(range, precision = 0) {
    const [min, max] = range;
    let random = Math.random() * (max - min + 1) + min;
    random = SDMath.floor(random, precision);
    return random;
  }
  static array(arr, start = 0, end = arr.length - 1) {
    return arr[Random.number([start, end])];
  }
  static pick(range, len = 1) {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(range[Random.number([0, range.length])]);
    }
    return arr.join("");
  }
  static boolean() {
    return Math.random() > 0.5;
  }
  static stringAndNumber(len = 1) {
    return Math.random().toString(36).slice(2, 2 + len);
  }
  static string(type, len = 1) {
    if (typeof type == "string") {
      if (len == 1) {
        return String.fromCharCode(Random.number(charMap[type]));
      } else {
        const chars = Array.from({ length: len }, () => Random.number(charMap[type]));
        return String.fromCharCode(...chars);
      }
    } else {
      if (len == 1) {
        return String.fromCharCode(Random.number(charMap[type[Random.number([0, type.length - 1])]]));
      } else {
        const chars = Array.from({ length: len }, () => Random.number(charMap[type[Random.number([0, type.length - 1])]]));
        return String.fromCharCode(...chars);
      }
    }
  }
}
function removeItem(array, target, pullOrigin = false) {
  const arr = pullOrigin ? array : deepClone(array);
  if (Array.isArray(target)) {
    for (let i = 0; i < arr.length; i++) {
      for (const value of target) {
        if (isSame(arr[i], value)) {
          arr.splice(i, 1);
          i--;
          break;
        }
      }
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (isSame(arr[i], target)) {
        arr.splice(i, 1);
        break;
      }
    }
  }
  return arr;
}
let __DB__ = {};
class SDIDB extends AsyncConstructor {
  constructor(name) {
    super(() => __async(this, null, function* () {
      yield this.openDB();
    }));
    __publicField(this, "_version");
    __publicField(this, "_tableList");
    this.name = name;
  }
  openDB(_0, _1) {
    return __async(this, arguments, function* (type, tableName, settings = {}) {
      let DBRequest = type && this._version ? window.indexedDB.open(this.name, ++this._version) : window.indexedDB.open(this.name);
      DBRequest.onerror = () => {
        throw "\u6570\u636E\u5E93\u6253\u5F00\u5931\u8D25";
      };
      if (type && tableName) {
        yield onupgradeneeded.call(this, DBRequest, type, tableName, settings);
      }
      yield onsuccess.call(this, DBRequest);
    });
  }
  removeTable(tableName) {
    return __async(this, null, function* () {
      if (this._tableList.includes(tableName)) {
        yield this.openDB("remove", tableName);
      }
    });
  }
  defineTable(_0, _1) {
    return __async(this, arguments, function* (tableName, _keys, indexs = {}) {
      if (!this._tableList.includes(tableName)) {
        yield this.openDB("create", tableName, indexs);
      }
      return () => new IDBTable(this.name, tableName, indexs);
    });
  }
  static deleteDB(dbname) {
    window.indexedDB.deleteDatabase(dbname);
  }
  get version() {
    return this._version;
  }
  get tables() {
    return this._tableList;
  }
}
function onupgradeneeded(DBRequest, type, tableName, settings) {
  return __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      DBRequest.onupgradeneeded = (e) => {
        var _a2, _b, _c;
        const DB = e.target.result;
        if (type == "create") {
          const store = DB.createObjectStore(tableName, settings.keypath ? { keyPath: settings.keypath } : { autoIncrement: true });
          if (settings.index) {
            const indexNames = Object.keys(settings.index);
            for (const name of indexNames) {
              store.createIndex(name, (_a2 = settings.index[name].path) != null ? _a2 : name, {
                unique: (_b = settings.index[name].unique) != null ? _b : false,
                multiEntry: ((_c = settings.index[name].multiEntry) != null ? _c : Array.isArray(settings.index[name].path)) ? false : true
              });
            }
          }
        } else if (type == "remove") {
          DB.deleteObjectStore(tableName);
        }
        resolve(true);
      };
    });
  });
}
function onsuccess(DBRequest) {
  return __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      DBRequest.onsuccess = (e) => {
        const DB = e.target.result;
        DB.onversionchange = () => DB.close();
        __DB__[this.name] = DB;
        this._version = DB.version;
        this._tableList = Array.from(DB.objectStoreNames);
        resolve(true);
      };
    });
  });
}
class IDBTable {
  constructor(dbName, tableName, tableSetting) {
    __publicField(this, "store");
    this.dbName = dbName;
    this.tableName = tableName;
    this.tableSetting = tableSetting;
    this.store = __DB__[this.dbName].transaction(this.tableName, "readwrite").objectStore(this.tableName);
  }
  insert(value, key) {
    return __async(this, null, function* () {
      let IDBrequest = this.store.add(value, key);
      return yield CURDHandler.call(this, IDBrequest);
    });
  }
  remove(keyPath) {
    return __async(this, null, function* () {
      let IDBrequest = this.store.delete(keyPath);
      return yield CURDHandler.call(this, IDBrequest);
    });
  }
  update(query, update, key) {
    return __async(this, null, function* () {
      let value = (yield this.find(query))[0];
      for (const item in update) {
        changeProperties(value, update[item], item);
      }
      let IDBrequest = this.store.put(value, key);
      yield CURDHandler.call(this, IDBrequest);
      return value;
    });
  }
  updateByKeypath(query, update) {
    return __async(this, null, function* () {
      let value = (yield this.findByKeypath(query))[0];
      for (const item in update) {
        changeProperties(value, update[item], item);
      }
      let IDBrequest = this.store.put(value);
      yield CURDHandler.call(this, IDBrequest);
      return value;
    });
  }
  findByKeypath(query) {
    return __async(this, null, function* () {
      let IDBrequest;
      if (typeof query == "string") {
        IDBrequest = this.store.get(query);
      } else {
        IDBrequest = query.index ? this.store.index(query.index).getAll(query.query, query.count) : this.store.get(query.query);
      }
      const result = yield CURDHandler.call(this, IDBrequest);
      return Array.isArray(result) ? result : [result];
    });
  }
  find(query) {
    return __async(this, null, function* () {
      const cursorFinder = this.store.openCursor();
      const keys = Object.keys(query);
      return new Promise((resolve, reject) => {
        const result = [];
        cursorFinder.onerror = () => {
          reject("\u67E5\u8BE2\u5931\u8D25");
        };
        cursorFinder.onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor) {
            const value = cursor.value;
            let isFind = true;
            for (const key of keys) {
              if (!isSame(value[key], query[key])) {
                isFind = false;
              }
            }
            if (isFind)
              result.push(cursor.value);
            cursor.continue();
          } else {
            resolve(result);
          }
        };
      });
    });
  }
  findAll(index2) {
    return __async(this, null, function* () {
      const cursorFinder = this.store.openCursor();
      return new Promise((resolve, reject) => {
        const result = [];
        cursorFinder.onerror = () => {
          reject("\u67E5\u8BE2\u5931\u8D25");
        };
        if (index2) {
          cursorFinder.onsuccess = (e) => {
            let cursor = e.target.result;
            if (cursor) {
              if (cursor.value[index2]) {
                result.push(cursor.value);
              }
              cursor.continue();
            } else {
              resolve(result);
            }
          };
        } else {
          cursorFinder.onsuccess = (e) => {
            let cursor = e.target.result;
            if (cursor) {
              result.push(cursor.value);
              cursor.continue();
            } else {
              resolve(result);
            }
          };
        }
      });
    });
  }
  count(key) {
    return __async(this, null, function* () {
      let IDBrequest = this.store.count(key);
      return yield CURDHandler.call(this, IDBrequest);
    });
  }
  clear() {
    return __async(this, null, function* () {
      let IDBrequest = this.store.clear();
      let result = yield CURDHandler.call(this, IDBrequest);
      return result ? false : true;
    });
  }
}
function CURDHandler(IDBRequest) {
  return __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      IDBRequest.onsuccess = (e) => {
        resolve(e.target.result);
      };
      IDBRequest.onerror = (e) => {
        reject(e.target.result);
      };
    });
  });
}
function changeProperties(changed, changedTo, methods) {
  switch (methods) {
    case "$set":
      for (const key in changedTo) {
        changed[key] = changedTo[key];
      }
      break;
    case "$push":
      for (const key in changedTo) {
        changed[key].push(changedTo[key]);
      }
      break;
    case "$pull":
      for (const key in changedTo) {
        removeItem(changed[key], key, true);
      }
      break;
    case "$inc":
      for (const key in changedTo) {
        changed[key] += changedTo[key];
      }
      break;
  }
}
function throttle(callback, delay = 500, style = true) {
  let timeoutId = void 0;
  if (style) {
    return function(...args) {
      if (!timeoutId) {
        callback.apply(this, args);
        timeoutId = window.setTimeout(() => {
          timeoutId = void 0;
        }, delay);
      }
    };
  } else {
    return function(...args) {
      if (!timeoutId) {
        timeoutId = window.setTimeout(() => {
          timeoutId = void 0;
          callback.apply(this, args);
        }, delay);
      }
    };
  }
}
const browerList = ["edge", "opera", "chrome", "safari", "firefox"];
function userBrowers() {
  const regexp = new RegExp("((?<opera>OPR)|(?<safari>Safari)|(?<chrome>Chrome)|(?<edge>Edg)|(?<ie>NET)|(?<firefox>Firefox))\\/(?<version>(\\d|\\.)*)", "g");
  const result = { main: "" };
  const matchAll = navigator.userAgent.matchAll(regexp);
  for (const { groups } of matchAll) {
    result[Object.keys(deleteEmpty(groups))[0]] = groups.version;
  }
  for (const brower of browerList) {
    if (result[brower]) {
      result.main = brower;
      return result;
    }
  }
  return result;
}
let instancePoor = null;
class Validator {
  constructor(data) {
    __publicField(this, "checkArr");
    __publicField(this, "data");
    if (instancePoor == null ? void 0 : instancePoor.length) {
      let instance = instancePoor.pop();
      instance.data = "" + data;
      instance.checkArr = [];
      return instance;
    }
    this.data = "" + data;
    this.checkArr = [];
  }
  check() {
    this.checkArr.reduce((pre, cur) => {
      if (!cur[0]()) {
        throw { errorMsg: [cur[1]] };
      }
      return null;
    }, null);
  }
  checkAll() {
    const errorMsgs = [];
    this.checkArr.reduce((pre, cur) => {
      if (!cur[0]()) {
        errorMsgs.push(cur[1]);
      }
      return null;
    }, null);
    if (errorMsgs.length) {
      throw { errorMsg: errorMsgs };
    }
  }
  errorMsg(error) {
    this.checkArr[this.checkArr.length - 1][1] = error;
    return this;
  }
  end() {
    if (!instancePoor)
      instancePoor = [];
    instancePoor.push(this);
  }
  addCheck(checkFunc, errorMsg) {
    if (typeof checkFunc == "function") {
      this.checkArr.push([() => checkFunc(this.data), errorMsg]);
    } else {
      this.checkArr.push([() => checkFunc.test(this.data), errorMsg]);
    }
    return this;
  }
  passWordLevel(level = 3) {
    this.checkArr.push([
      () => {
        const exclude = [/^\d+$/, /^[a-z]+$/, /^[A-Z]$/];
        for (const check of exclude) {
          if (check.test(this.data)) {
            return false;
          }
        }
        let baseLevel = 0;
        this.data.length > 10 ? baseLevel++ : baseLevel--;
        const include = [/\W/, /\d/, /[a-z]/, /[A-Z]/];
        for (const check of include) {
          if (check.test(this.data)) {
            baseLevel++;
          }
        }
        return baseLevel >= level ? true : false;
      },
      "\u5BC6\u7801\u5F3A\u5EA6\u4E0D\u8DB3"
    ]);
    return this;
  }
  noSpace() {
    this.checkArr.push([() => !/\s/.test(this.data), "\u4E0D\u80FD\u542B\u6709\u7A7A\u683C"]);
    return this;
  }
  isEmail() {
    this.checkArr.push([
      () => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.data),
      "\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E"
    ]);
    return this;
  }
  notEmpty(isCheckZero = false) {
    this.checkArr.push([() => !isEmpty(this.data, isCheckZero), "\u4E0D\u80FD\u4E3A\u7A7A"]);
    return this;
  }
  maxLength(len) {
    this.checkArr.push([() => !(this.data.length > len), "\u957F\u5EA6\u4E0D\u8DB3"]);
    return this;
  }
  minLength(len) {
    this.checkArr.push([() => !(this.data.length < len), "\u957F\u5EA6\u4E0D\u8DB3"]);
    return this;
  }
}
const plugins = __spreadValues(__spreadValues({}, directives), components);
var index = {
  install(app) {
    for (const name in plugins) {
      app.use(plugins[name]);
    }
  }
};
export { AsyncConstructor, index$4 as LazyLoadBox, LocalFiles, LocalStorage, Message, Random, index$5 as RollText, SDDate, SDIDB, SDMath, index$2 as SplitPage, index$1 as SwitchButton, vDrag as VDrag, vFill as VFill, vHidden as VHidden, Validator, capitalize, debounce, deepClone, index as default, deleteEmpty, havaEmpty, isEmpty, isMobile, isSame, iterable, removeItem, throttle, unCapitalize, userBrowers };
