import type { App, DirectiveBinding } from "vue";

export default {
    install(app: App) {
        app.directive("hidden", {
            mounted,
            beforeUpdate,
        });
    },
};

function mounted(el: HTMLElement, boolen: DirectiveBinding<boolean>) {
    el.style.visibility = boolen.value ? "" : "hidden";
}
function beforeUpdate(el: HTMLElement, boolen: DirectiveBinding<boolean>) {
    el.style.visibility = boolen.value ? "" : "hidden";
}
