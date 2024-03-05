import {
    createApp,
    ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
    data() {
        return {
            input: "",
            undo: [],
        };
    },
    methods: {
        add(value) {
            this.input += value;
        },
        remove() {
            undo.push(this.input)
            this.input = this.input.slice(0, -1);
        },
    },
}).mount("#app");

window.app = app;