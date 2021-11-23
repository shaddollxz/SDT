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
var _a, _b;
import { defineComponent as defineComponent$1, openBlock, createElementBlock, isRef, normalizeStyle, createElementVNode, normalizeClass, unref, Fragment, renderSlot, createCommentVNode, renderList, toDisplayString, withDirectives, withKeys, vModelText, pushScopeId, popScopeId, createBlock, Transition, withCtx, vShow, createVNode, render } from "vue";
import { defineComponent, ref, shallowRef, watch, nextTick, onMounted } from "@vue/runtime-core";
var gusto = "";
var vFill = {
  install(app) {
    app.directive("fill", {
      mounted: mounted$1,
      beforeUpdate: beforeUpdate$1
    });
  }
};
const cache$1 = new WeakMap();
function mounted$1(el) {
  var _a2, _b2;
  let cacheData = cache$1.get(el);
  el.style.display = "flex";
  el.style.flexWrap = "wrap";
  el.style.justifyContent = "space-between";
  if (!cacheData) {
    cacheData = {
      width: el.clientWidth,
      childWidth: (_a2 = el.firstElementChild) == null ? void 0 : _a2.offsetWidth,
      maxNum: Math.floor(el.clientWidth / ((_b2 = el.firstElementChild) == null ? void 0 : _b2.offsetWidth))
    };
    cache$1.set(el, cacheData);
  }
  updateChild(el, cacheData);
}
function beforeUpdate$1(el) {
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
      beforeUpdate
    });
  }
};
function mounted(el, boolen) {
  el.style.visibility = boolen.value ? "" : "hidden";
}
function beforeUpdate(el, boolen) {
  el.style.visibility = boolen.value ? "" : "hidden";
}
var directives = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  VFill: vFill,
  VHidden: vHidden
});
var colors = "";
var index_vue_vue_type_style_index_0_scoped_true_lang$3 = "";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _hoisted_1$2 = {
  key: 0,
  class: "text"
};
const _hoisted_2$2 = ["innerHTML"];
const _hoisted_3$1 = ["innerHTML"];
const __default__$4 = defineComponent({
  name: "rollText"
});
function setup$4(__props) {
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
      ref: (_value, _refs) => {
        _refs["view"] = _value;
        isRef(view) && (view.value = _value);
      },
      style: normalizeStyle({ justifyContent: _ctx.$props.align })
    }, [
      createElementVNode("div", {
        class: normalizeClass(["move", unref(state)]),
        style: normalizeStyle({ animationDuration: _ctx.$props.duration + "s" })
      }, [
        _ctx.$props.asyncData === null ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createElementVNode("div", {
            class: "text",
            ref: (_value, _refs) => {
              _refs["text"] = _value;
              isRef(text) && (text.value = _value);
            }
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 512),
          _ctx.$props.type == 1 ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ])) : createCommentVNode("", true)
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createElementVNode("div", {
            class: "text",
            ref: (_value, _refs) => {
              _refs["text"] = _value;
              isRef(text) && (text.value = _value);
            },
            innerHTML: _ctx.$props.asyncData
          }, null, 8, _hoisted_2$2),
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
const _sfc_main$4 = /* @__PURE__ */ defineComponent$1(__spreadProps(__spreadValues({}, __default__$4), {
  props: {
    type: { default: 1 },
    duration: { default: 8 },
    asyncData: { default: () => null },
    align: { default: "left" }
  },
  setup: setup$4
}));
var $RollText = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-608f225a"]]);
var index_vue_vue_type_style_index_0_scoped_true_lang$2 = "";
const __default__$3 = defineComponent({
  name: "sliderBox"
});
function setup$3(__props) {
  const props = __props;
  const observer = shallowRef(null);
  const animeClass = ref("");
  let io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      animeClass.value = `${props.direction}`;
      io.unobserve(e.target);
    }
  });
  onMounted(() => io.observe(observer.value));
  return (_ctx, _cache) => {
    return openBlock(), createElementBlock("div", {
      class: normalizeClass(["sliderBox", animeClass.value]),
      style: normalizeStyle({ animationDuration: _ctx.$props.duration + "s" }),
      ref: (_value, _refs) => {
        _refs["observer"] = _value;
        isRef(observer) && (observer.value = _value);
      }
    }, [
      renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 6);
  };
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent$1(__spreadProps(__spreadValues({}, __default__$3), {
  props: {
    duration: { default: 0.5 },
    direction: { default: "bottom" }
  },
  setup: setup$3
}));
var $SliderBox = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-596ffdb9"]]);
var index_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-353ad892"), n = n(), popScopeId(), n);
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
function setup$2(__props, { emit }) {
  var _a2;
  const props = __props;
  class BtnList {
    constructor(maxLen, limitLen) {
      __publicField(this, "max");
      __publicField(this, "limit");
      __publicField(this, "limitHalf");
      __publicField(this, "_curr");
      __publicField(this, "maxArr");
      __publicField(this, "showArr");
      this.max = maxLen;
      this.limit = limitLen;
      this.limitHalf = limitLen % 2 ? ~~(limitLen / 2) + 1 : limitLen / 2;
      this._curr = 1;
      this.maxArr = Array.from({ length: maxLen }).map((item, index2) => index2 + 1);
      if (maxLen > limitLen) {
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
  const pageCache = Object.create(null);
  const btns = ref(new BtnList(props.totalPage, props.limit));
  btns.value.curr = (_a2 = props.currentPage) != null ? _a2 : 1;
  pageCache[btns.value.curr] = props.modelValue;
  watch(() => props.totalPage, () => {
    var _a3;
    btns.value = new BtnList(props.totalPage, props.limit);
    btns.value.curr = (_a3 = props.currentPage) != null ? _a3 : 1;
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
const _sfc_main$2 = /* @__PURE__ */ defineComponent$1(__spreadProps(__spreadValues({}, __default__$2), {
  props: {
    modelValue: null,
    limit: { default: 7 },
    totalPage: null,
    currentPage: null
  },
  emits: ["update:modelValue", "onPageChange", "getNewData"],
  setup: setup$2
}));
var $SplitPage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-353ad892"]]);
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-c84fbafc"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", null, null, -1));
const _hoisted_2 = [
  _hoisted_1
];
const __default__$1 = defineComponent({
  name: "switchButton"
});
function setup$1(__props, { emit }) {
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
        class: normalizeClass({ chosed: !__props.modelValue, notChosed: __props.modelValue })
      }, [
        renderSlot(_ctx.$slots, "left", {}, void 0, true)
      ], 2),
      createElementVNode("div", {
        class: "center",
        onClick: statuChange
      }, _hoisted_2),
      createElementVNode("div", {
        class: normalizeClass({ chosed: __props.modelValue, notChosed: !__props.modelValue })
      }, [
        renderSlot(_ctx.$slots, "right", {}, void 0, true)
      ], 2)
    ], 2);
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent$1(__spreadProps(__spreadValues({}, __default__$1), {
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "onStatuChange"],
  setup: setup$1
}));
var $SwitchButton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c84fbafc"]]);
const RollText = {
  install(app) {
    app.component("RollText", $RollText);
  }
};
const SliderBox = {
  install(app) {
    app.component("SliderBox", $SliderBox);
  }
};
const SplitPage = {
  install(app) {
    app.component("SplitPage", $SplitPage);
  }
};
const SwitchButton = {
  install(app) {
    app.component("SwitchButton", $SwitchButton);
  }
};
var components = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  RollText,
  SliderBox,
  SplitPage,
  SwitchButton
});
var Message_vue_vue_type_style_index_0_scoped_true_lang = "";
const __default__ = defineComponent({
  name: "message"
});
function setup(__props) {
  const props = __props;
  const isShow = ref(true);
  onMounted(() => {
    if (props.duration) {
      setTimeout(() => {
        isShow.value = false;
      }, props.duration);
    }
  });
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
            class: normalizeClass(__props.isCanClose || !__props.duration ? "canClose" : "cantClose")
          }, "\u2716", 2)
        ], 6), [
          [vShow, isShow.value]
        ])
      ]),
      _: 1
    }, 8, ["onBeforeLeave"]);
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent$1(__spreadProps(__spreadValues({}, __default__), {
  props: {
    text: null,
    duration: { default: 1300 },
    align: { default: "left" },
    isCanClose: { type: Boolean, default: true },
    style: null,
    type: { default: "default" },
    onClose: null
  },
  setup
}));
var messageComp = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e1497b42"]]);
const messageBox = document.createElement("div");
messageBox.style.cssText = `width:100%;height:0;position:fixed;top:8%;display:flex;flex-direction:column;align-items:center;z-index:999;`;
document.body.appendChild(messageBox);
function renderMessage(options) {
  const vm = createVNode(messageComp, options);
  const renderBody = document.createElement("div");
  render(vm, renderBody);
  messageBox.appendChild(renderBody.firstElementChild);
  vm.props.onDestroy = () => render(null, renderBody);
}
const Message = (text, options) => {
  renderMessage(__spreadProps(__spreadValues({}, options), {
    text
  }));
};
Message.success = (text, options) => {
  renderMessage(__spreadProps(__spreadValues({}, options), {
    type: "success",
    text
  }));
};
Message.error = (text, options) => {
  renderMessage(__spreadProps(__spreadValues({}, options), {
    type: "error",
    text
  }));
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
const _files = Symbol("_files");
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
      this[_files] = yield new Promise((resolve, reject) => {
        input.addEventListener("change", function read(e) {
          let target = e.target;
          if (count == 1 || target.files.length == 1) {
            if (target.files[0].size < limitSize) {
              resolve([target.files[0]]);
            } else {
              resolve([]);
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
            resolve(result);
          }
          this.removeEventListener("change", read);
        });
      });
    }));
    __publicField(this, _a);
    __publicField(this, "text");
    __publicField(this, "dataurl");
    this.text = ["txt", "md", "json", "js", "css", "less", "sass", "ts", "xml", "html"];
    this.dataurl = ["jpg", "png", "jpge", "gif", "mp4", "mp3", "flac"];
  }
  get file() {
    return this[_files].length == 1 ? this[_files][0] : this[_files];
  }
  get name() {
    if (this[_files].length == 1) {
      return this[_files][0].name;
    } else {
      return this[_files].map((item) => item.name);
    }
  }
  read() {
    return __async(this, arguments, function* (options = {}) {
      if (this[_files].length == 0)
        throw "\u6587\u4EF6\u8D85\u8FC7\u8BBE\u7F6E\u5927\u5C0F";
      const { readAs = void 0, order = 0 } = options;
      const reader = new FileReader();
      if (this[_files].length > 1 && !order) {
        const result = [];
        for (const file of this[_files]) {
          if (readAs) {
            reader[readAs](file);
          } else {
            reader[this.readType(file)](file);
          }
          const content = yield new Promise((resolve, reject) => {
            reader.onerror = () => {
              reject("\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25");
            };
            reader.onload = (e) => {
              resolve(e.target.result);
            };
          });
          result.push(content);
        }
        return result;
      } else {
        if (readAs) {
          reader[readAs](this[_files][order]);
        } else {
          reader[this.readType(this[_files][order])](this[_files][order]);
        }
        return new Promise((resolve, reject) => {
          reader.onerror = () => {
            reject("\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25");
          };
          reader.onload = (e) => {
            resolve(e.target.result);
          };
        });
      }
    });
  }
  readType(file) {
    const regexp = /(?<=\.)\w+$/;
    const fileType = file.name.match(regexp)[0];
    if (fileType == null) {
      throw "\u65E0\u6CD5\u83B7\u53D6\u6587\u4EF6\u540E\u7F00";
    }
    if (this.text.includes(fileType)) {
      return "readAsText";
    } else if (this.dataurl.includes(fileType)) {
      return "readAsDataURL";
    } else {
      return "readAsArrayBuffer";
    }
  }
}
_a = _files;
const _SDDate = class extends Date {
  constructor(args) {
    args ? super(args) : super();
  }
  format(formatStr = "/YYYY/-/MM/-/DD/ /HH/:/mm/:/ss/./ms/ /TT/ \u5468/W/", useChinese = true) {
    formatStr = formatStr.replace(/TT/g, this.getHours() > 12 ? useChinese ? "\u4E0B\u5348" : "p.m." : useChinese ? "\u4E0A\u5348" : "a.m.");
    const regexp = /(?<FullYear>\/YYYY\/)|(?<month>\/M{2,3}\/)|(?<Date>\/DD\/)|(?<Hours>\/(h|H){2}\/)|(?<Minutes>\/mm\/)|(?<Seconds>\/ss\/)|(?<Day>\/W\/)|(?<Milliseconds>\/ms\/)/g;
    return formatStr.replace(regexp, (...args) => {
      const groups = args.pop();
      const key = Object.keys(JSON.parse(JSON.stringify(groups)))[0];
      let data = "" + this["get" + key]();
      switch (key) {
        case "month":
          if (groups.month.length === 3) {
            return useChinese ? transformChinese[data] : transformEnglish_Month[+data - 1];
          }
        case "Day":
          return useChinese ? transformChinese[data] : transformEnglish_Week[data];
        case "Hours":
          return /hh/g.test(formatStr) ? +data > 12 ? +data - 12 : data : data;
        case "Milliseconds":
          return data.length < 3 ? "0" + data : data;
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
  const regexp = /(?<FullYear>\/YYYY\/)|(?<month>\/M{2,3}\/)|(?<Date>\/DD\/)|(?<Hours>\/(h|H){2}\/)|(?<Minutes>\/mm\/)|(?<Seconds>\/ss\/)|(?<Day>\/W\/)|(?<Milliseconds>\/ms\/)/g;
  return formatStr.replace(regexp, (...args) => {
    const groups = args.pop();
    const key = Object.keys(JSON.parse(JSON.stringify(groups)))[0];
    if (key != "Millisecond" && ("" + result[key]).length < 2) {
      return "0" + result[key];
    }
    return result[key];
  });
}
const transformChinese = ["\u5929", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u5341\u4E00", "\u5341\u4E8C"];
const transformEnglish_Week = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const transformEnglish_Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const isSymbol = (arg) => typeof arg == "symbol";
const isNull = (arg) => arg === null;
const isBaseType = (arg) => typeof arg !== "object";
const isObject = (arg) => typeof arg == "object" && !Array.isArray(arg) && typeof arg !== "function" && arg !== null && !(arg instanceof RegExp);
const isRegExp = (arg) => arg instanceof RegExp;
function isLimitItem(arg) {
  if (Array.isArray(arg) && isObject(arg[1]) && "__LIMIT__" in arg[1]) {
    return true;
  } else {
    return false;
  }
}
let cache = null;
const _localStorage = Symbol("_localStorage");
class LocalStorage {
  constructor() {
    __publicField(this, _b);
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
    if (isBaseType(value)) {
      this[_localStorage].setItem(key, value);
    } else {
      this[_localStorage].setItem(key, JSON.stringify(value));
    }
  }
  setLimitItem(key, value, limit, precision) {
    this[_localStorage].setItem(key, JSON.stringify([value, { __LIMIT__: new SDDate().add(limit, precision).getTime() }]));
  }
  getItem(key) {
    let item = JSON.parse(this[_localStorage].getItem(key));
    if (!isLimitItem(item))
      return item;
    if (item[1].__LIMIT__ < Date.now()) {
      this.removeItem(key);
      return null;
    } else {
      return item[0];
    }
  }
  get keys() {
    return Object.keys(this[_localStorage]);
  }
}
_b = _localStorage;
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
function deepClone(o, cache2 = new WeakMap()) {
  if (isRegExp(o) || isNull(o))
    throw "\u4F20\u5165\u7C7B\u578B\u9519\u8BEF";
  let result = Array.isArray(o) ? [] : Object.create(null);
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
let __DB__;
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
  createTable(_0) {
    return __async(this, arguments, function* (tableName, settings = {}) {
      if (this._tableList.includes(tableName))
        throw "\u6570\u636E\u5E93\u540D\u91CD\u590D";
      yield this.openDB("create", tableName, settings);
      return new IDBTable(tableName, settings);
    });
  }
  useTable(tableName) {
    return __async(this, null, function* () {
      if (this._tableList.includes(tableName)) {
        const settings = {};
        const IDBObjectStore = __DB__.transaction([tableName], "readonly").objectStore(tableName);
        settings.keyPath = IDBObjectStore.keyPath;
        const indexNames = IDBObjectStore.indexNames;
        if (indexNames.length) {
          const indexs = [];
          Array.prototype.forEach.call(indexNames, (value) => {
            const { keyPath, multiEntry, unique, name } = IDBObjectStore.index(value);
            indexs.push({ keyPath, multiEntry, unique, name });
          });
          settings.index = indexs;
        }
        return new IDBTable(tableName, settings);
      } else {
        throw "\u6CA1\u6709\u6307\u5B9A\u7684\u8868";
      }
    });
  }
  removeTable(tableName) {
    return __async(this, null, function* () {
      if (this._tableList.includes(tableName)) {
        yield this.openDB("remove", tableName);
      } else {
        throw "\u6CA1\u6709\u6307\u5B9A\u7684\u8868";
      }
      return this;
    });
  }
  static deleteDB(dbname) {
    window.indexedDB.deleteDatabase(dbname);
  }
  get version() {
    return this._version;
  }
  get tableList() {
    return this._tableList;
  }
}
function onupgradeneeded(DBRequest, type, tableName, settings) {
  return __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      DBRequest.onupgradeneeded = (e) => {
        var _a2, _b2;
        const DB = e.target.result;
        if (type == "create" && tableName) {
          const store = DB.createObjectStore(tableName, settings.keyPath ? { keyPath: settings.keyPath } : { autoIncrement: true });
          if (settings.index) {
            for (const value of settings.index) {
              store.createIndex(Array.isArray(value.keyPath) ? value.name : value.name ? value.name : value.keyPath, value.keyPath, {
                unique: (_a2 = value.unique) != null ? _a2 : false,
                multiEntry: ((_b2 = value.multiEntry) != null ? _b2 : Array.isArray(value.keyPath)) ? false : true
              });
            }
          }
        } else if (type == "remove" && tableName) {
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
        __DB__ = DB;
        this._version = DB.version;
        this._tableList = Array.from(DB.objectStoreNames);
        resolve(true);
      };
    });
  });
}
class IDBTable {
  constructor(tableName, tableSetting) {
    __publicField(this, "store");
    this.tableName = tableName;
    this.tableSetting = tableSetting;
    this.store = __DB__.transaction(this.tableName, "readwrite").objectStore(this.tableName);
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
      return yield CURDHandler.call(this, IDBrequest);
    });
  }
  findByKeypath(query) {
    return __async(this, null, function* () {
      const IDBrequest = query.keyPath ? this.store.index(query.keyPath).getAll(query.query, query.count) : this.store.get(query.query);
      return yield CURDHandler.call(this, IDBrequest);
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
function replaceObj(old, ...news) {
  if (isRegExp(old))
    throw "\u4E0D\u80FD\u66FF\u6362\u6B63\u5219\u5BF9\u8C61";
  if (Array.isArray(old)) {
    old.length = 0;
    news.flat(2).forEach((value) => {
      old.push(value);
    });
  } else {
    for (const key in old) {
      delete old[key];
    }
    Object.assign(old, ...news);
  }
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
function isEmpty(value, isCheckZero = false) {
  if (typeof value !== "object" || value == null) {
    return value == 0 ? isCheckZero ? false : true : !!value;
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
  const regexp = /((?<opera>OPR)|(?<safari>Safari)|(?<chrome>Chrome)|(?<edge>Edg)|(?<ie>NET)|(?<firefox>Firefox))\/(?<version>(\d|\.)*)/g;
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
export { AsyncConstructor, LocalFiles, LocalStorage, Message, Random, RollText, SDDate, SDIDB, SDMath, SliderBox, SplitPage, SwitchButton, vFill as VFill, vHidden as VHidden, Validator, debounce, deepClone, index as default, deleteEmpty, isEmpty, isSame, removeItem, replaceObj, throttle, userBrowers };
