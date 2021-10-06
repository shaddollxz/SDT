export default {
    install(app) {
        app.directive("hidden", {
            mounted,
            beforeUpdate,
        });
    },
};

function mounted(el, boolen) {
    el.style.visibility = boolen.value ? "" : "hidden";
}
function beforeUpdate(el, boolen) {
    el.style.visibility = boolen.value ? "" : "hidden";
}
