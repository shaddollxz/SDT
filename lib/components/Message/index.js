import { createVNode, render } from "vue";
import messageComp from "./Message.vue";

const messageBox = document.createElement("div");
messageBox.style.cssText = `
    width:100%;
    height:0;
    position:fixed;
    top:8%;
    display:flex;
    flex-direction:column;
    align-items:center;
    z-index:999;`;
document.body.appendChild(messageBox);

function renderMessage(options) {
    //todo 获得组件的实例
    const vm = createVNode(messageComp, options);

    //todo 创建一个新元素并将组件渲染到上面，最后添加到messageBox中
    const renderBody = document.createElement("div");
    render(vm, renderBody);
    messageBox.appendChild(renderBody.firstElementChild);

    //todo 通过该方法卸载，该方法会作为emit放入message.vue 并且不需要在组件内声明
    vm.props.onDestroy = () => render(null, renderBody);
}

function Message(text, options) {
    options = {
        ...options,
        text,
    };
    renderMessage(options);
}
Message.success = (text, options) => {
    options = {
        ...options,
        type: "success",
        text,
    };
    renderMessage(options);
};
Message.error = (text, options) => {
    options = {
        ...options,
        type: "error",
        text,
    };
    renderMessage(options);
};

export default Message;
