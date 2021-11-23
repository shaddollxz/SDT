import { createVNode, render } from "vue";
import type { StyleValue, VNodeProps } from "vue";
import messageComp from "./Message.vue";
import type { Props as MessageProps } from "./Message.vue";

const messageBox = document.createElement("div");
messageBox.style.cssText = `width:100%;height:0;position:fixed;top:8%;display:flex;flex-direction:column;align-items:center;z-index:999;`;
document.body.appendChild(messageBox);

function renderMessage(options: MessageProps) {
    //todo 获得组件的实例
    const vm = createVNode(messageComp, options as VNodeProps);

    //todo 创建一个新元素并将组件渲染到上面，最后添加到messageBox中
    const renderBody = document.createElement("div");
    render(vm, renderBody);
    messageBox.appendChild(renderBody.firstElementChild!);

    //todo 为了保证不会有内存泄漏所以手动卸载
    //todo 通过该方法卸载，该方法会作为emit放入message.vue 并且不需要在组件内声明
    vm.props!.onDestroy = () => render(null, renderBody);
}

interface MessageFunc {
    (text: string, options: Omit<MessageProps, "text">): void;
    success: (text: string, options: Omit<MessageProps, "type" | "text">) => void;
    error: (text: string, options: Omit<MessageProps, "type" | "text">) => void;
}

const Message: MessageFunc = ((text, options) => {
    renderMessage({
        ...options,
        text,
    });
}) as MessageFunc;
Message.success = (text, options) => {
    renderMessage({
        ...options,
        type: "success",
        text,
    });
};
Message.error = (text, options) => {
    renderMessage({
        ...options,
        type: "error",
        text,
    });
};

export default Message;
