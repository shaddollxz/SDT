import type { StyleValue } from "vue";
interface Props {
    text: string;
    type: "default" | "success" | "error";
    duration: number;
    isCanClose: boolean;
    align: "left" | "right" | "center";
    style?: StyleValue;
    leaveTo: "top" | "left" | "bottom" | "right";
    onClose?: (el: Element) => void;
}
declare type MessageProps = Partial<Props>;
interface MessageFunc {
    (text: string, options?: Omit<MessageProps, "text">): void;
    success: (text: string, options?: Omit<MessageProps, "type" | "text">) => void;
    error: (text: string, options?: Omit<MessageProps, "type" | "text">) => void;
}
declare const Message: MessageFunc;
export default Message;
