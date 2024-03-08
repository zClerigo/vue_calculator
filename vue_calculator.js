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
        updateInput(event) {
            this.input = event.target.innerHTML;
        },
        calculate() {
            for (let i = 0; i < this.input.length; i++) {
                if (this.input[i] == '%') {
                    if (this.input[i - 1] == ')') {
                        this.foundParen = false;
                        this.beforePercent = this.input.slice(0, i);
                        for (let j = 0; j < this.beforePercent.length; j++) {
                            if (this.beforePercent[j] == "(" && this.foundParen == false) {
                                this.foundParen = true;
                                this.input = this.input.replace("%", "")
                                this.input = this.input.replace(this.beforePercent.substring(j + 1, i - 1), eval(this.beforePercent.substring(j + 1, i - 1)) * 0.01)
                            }
                        }
                    }
                    else {
                        this.input = this.input.slice(0, i - 1) + this.input[i - 1] * 0.01 + this.input.slice(i + 1)
                    }
                }
                if (this.input[i] == '√') {
                    if (this.input[i + 1] == '(') {
                        this.foundParen = false;
                        this.afterSqrt = this.input.slice(i + 1);
                        for (let j = 0; j < this.afterSqrt.length; j++) {
                            if (this.afterSqrt[j] == ")" && this.foundParen == false) {
                                this.foundParen = true;
                                this.input = this.input.replace("√", "")
                                this.input = this.input.replace(this.afterSqrt.substring(i, j + 1), Math.sqrt(eval(this.afterSqrt.substring(i + 1, j))))
                            }
                        }
                    }
                    else {
                        this.input = this.input.slice(0, i) + Math.sqrt(this.input[i + 1]) + this.input.slice(i + 2)
                    }
                }
                if (this.input[i] == 'm' && this.input[i + 1] == 'o' && this.input[i + 2] == 'd') {
                    this.input = this.input.slice(0, i) + "%" + this.input.slice(i + 3)
                }
                if (this.input[i] == '^') {
                    this.input = this.input.slice(0, i) + "**" + this.input.slice(i + 1)
                }
                if (this.input[i] == 'π') {
                    this.input = this.input.slice(0, i) + "Math.PI" + this.input.slice(i + 1)
                }
                if (this.input[i] == '(') {
                    if (this.input.indexOf(')') === -1) {
                        this.input = this.input.replace("(", "");
                    }
                }
            }
            console.log(this.input)
            try { this.input = (eval(this.input)).toString(); } catch (error) { this.input = "Error" }
        },
        handleKeyPress(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                this.calculate();
            }
        },
    },
}).mount("#app");

window.app = app;
