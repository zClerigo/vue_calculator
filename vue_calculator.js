import {
    createApp,
    ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
    data() {
        return {
            input: "",
        };
    },
    methods: {
        add(value) {
            this.input += value;
        },
    },
}).mount("#app");

window.app = app;
