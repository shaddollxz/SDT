import $fill from "./v-fill.js";
export const fill = {
    install(app) {
        app.use($fill);
    },
};

import $hidden from "./v-hidden.js";
export const hidden = {
    install(app) {
        app.use($hidden);
    },
};
