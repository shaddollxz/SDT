import type { Props } from "./Message.vue";
declare type MessageProps = Partial<Props>;
interface MessageFunc {
    (text: string, options?: Omit<MessageProps, "text">): void;
    success: (text: string, options?: Omit<MessageProps, "type" | "text">) => void;
    error: (text: string, options?: Omit<MessageProps, "type" | "text">) => void;
}
declare const Message: MessageFunc;
export default Message;
