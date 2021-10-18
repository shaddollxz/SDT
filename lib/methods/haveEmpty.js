import isEmpty from "./isEmpty.js";

export default function (value) {
    if (typeof value !== "object") return isEmpty(value);

    if (Array.isArray(value)) {
        for (const item of value) {
            if (isEmpty(item)) {
                return true;
            }
        }
        return false;
    } else {
        for (const key in value) {
            if (isEmpty(value[key])) {
                return true;
            }
        }
        return false;
    }
}
