import { createVNode, render } from "vue";
import type { VNodeProps } from "vue";
import messageComp from "./Message.vue";
import type { Props } from "./Message.vue";

type MessageProps = Partial<Props>;

let messageBox: HTMLDivElement | null = null;

function renderMessage(options: MessageProps) {
    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.style.cssText = `position:fixed;top:8%;display:flex;flex-direction:column;align-items:center;z-index:999;width:100%;height:0;`;
        document.body.appendChild(messageBox);
    }

    //todo 获得组件的实例
    const vm = createVNode(messageComp, options as VNodeProps);

    //todo 创建一个新元素并将组件渲染到上面，最后添加到messageBox中
    const renderBody = document.createElement("div");
    render(vm, renderBody);
    messageBox!.appendChild(renderBody.firstElementChild!);

    //todo 为了保证不会有内存泄漏所以手动卸载
    //todo 通过该方法卸载，该方法会作为emit放入message.vue 并且不需要在组件内声明
    vm.props!.onDestroy = () => render(null, renderBody);
}

interface MessageFunc {
    (text: string, options?: Omit<MessageProps, "text">): void;
    success: (text: string, options?: Omit<MessageProps, "type" | "text">) => void;
    error: (text: string, options?: Omit<MessageProps, "type" | "text">) => void;
}

const defaultProps: any = {
    duration: 1300,
    align: "left",
    isCanClose: true,
    type: "default",
};

const Message: MessageFunc = ((text, options) => {
    renderMessage(Object.assign(Object.assign({}, defaultProps), options, { text }));
}) as MessageFunc;
Message.success = (text, options) => {
    renderMessage(Object.assign(Object.assign({}, defaultProps), options, { text, type: "success" }));
};
Message.error = (text, options) => {
    renderMessage(Object.assign(Object.assign({}, defaultProps), options, { text, type: "error" }));
};

export default Message;
