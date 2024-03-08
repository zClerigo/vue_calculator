import {
    createApp,
    ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
    data() {
        return {
            input: "",
            error: false,
            beforePercent: "",
            afterSqrt: "",
            foundParen : false,
            undo: [],
        };
    },
    computed : {
        noSpaces: function(){
            return this.input.replace(/ /g, '');
        }
    },
    watch : {
        noNewLines() {
            this.input = this.input.replace(/\n/g, '');
        }
    },
    methods: {
        remove() {
            if(this.input.length != 0){
                this.undo.push(this.input);
                this.input = "";
            }
        },
        undothis() {
            if (this.undo.length != 0) {
                this.input = "";
                this.input += this.undo.pop();
            }
        },
        add(value) {
            this.input += value;
            if(this.input.length != 0){
                this.undo.push(this.input.slice(0, -1));
            }      
        },
        updateInput(event){
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
                                this.input = this.input.replace("%","")
                                this.input = this.input.replace(this.beforePercent.substring(j+1,i-1), eval(this.beforePercent.substring(j+1,i-1)) * 0.01)
                            }
                        }
                    }
                    else {
                        this.input = this.input.slice(0, i - 1) + this.input[i-1]*0.01 + this.input.slice(i + 1)
                    }
                }
                if (this.input[i] == '√') {
                    if (this.input[i + 1] == '(') {
                        this.foundParen = false;
                        this.afterSqrt = this.input.slice(i+1);
                        for (let j = 0; j < this.afterSqrt.length; j++) {
                            if (this.afterSqrt[j] == ")" && this.foundParen == false) {
                                this.foundParen = true;
                                this.input = this.input.replace("√","")
                                this.input = this.input.replace(this.afterSqrt.substring(i,j+1), Math.sqrt(eval(this.afterSqrt.substring(i+1,j))))
                            }
                        }
                    }
                    else {
                        this.input = this.input.slice(0, i) + Math.sqrt(this.input[i+1]) + this.input.slice(i + 2)
                    }
                }
                if (this.input[i] == 'm' && this.input[i + 1] == 'o' && this.input[i + 2] == 'd') {
                    this.input = this.input.slice(0, i) + "%" + this.input.slice(i + 3)
                }
                if (this.input[i] == '^') {
                    this.input = this.input.slice(0, i) + "**" + this.input.slice(i + 1)
                }
                if (this.input[i] == 'π') {
                    if (this.input[i + 1] == 'π' || !isNaN(parseInt(this.input[i+1]))) {
                        this.input = this.input.slice(0, i) + "Math.PI * "+ this.input.slice(i + 1)
                    } else{
                    this.input = this.input.slice(0, i) + "Math.PI" + this.input.slice(i + 1)
                    }
                }
                if (this.input[i] == '(') {
                    if (this.input.indexOf(')') === -1) {
                        this.input = this.input.replace("(", "");
                    }
                }
                if (this.input[i] == ')') {
                    if (this.input[i + 1] == '(' || this.input[i + 1] == 'π' || !isNaN(parseInt(this.input[i+1]))) {
                        this.input = this.input.slice(0, i) + ")*" + this.input.slice(i + 1)
                    }
                }
                if (!isNaN(parseInt(this.input[i]))) {
                    console.log("asd")
                    if (this.input[i + 1] == 'π') {
                        this.input = this.input.slice(0, i) + this.input[i] + "*" + this.input.slice(i + 1)
                    }
                    if (this.input[i + 1] == '(') {
                        this.foundParen = false;
                        this.afterSqrt = this.input.slice(i+1);
                        for (let j = 0; j < this.afterSqrt.length; j++) {
                            if (this.afterSqrt[j] == ")" && this.foundParen == false) {
                                console.log(this.afterSqrt.substring(i+1,j));
                                this.foundParen = true;
                                this.input = this.input.replace(this.afterSqrt.substring(i,j+1),"*(" + this.afterSqrt.substring(i+1,j) + ")")
                            }
                        }
                    }
                }
                }
                console.log(this.input);
            try { if(this.input.length != 0){
                this.undo.push(this.input);
            }this.input = eval(this.noSpaces);} catch(error) {this.input = "Error";}
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
