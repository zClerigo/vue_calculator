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
            this.undo.push(this.input.charAt(this.input.length - 1));
            this.input = this.input.slice(0, -1);
        },
        undothis() {
            if (this.undo.length != 0) {
                this.input += this.undo.pop();
            }
        },
    },
}).mount("#app");

window.app = app;