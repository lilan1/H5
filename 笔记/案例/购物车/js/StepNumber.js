import Utils from "./Utils.js"

export default class StepNumber extends EventTarget {
    leftBn;
    rightBn;
    input;
    step = 1;
    ids;
    data;
    constructor(_data) {
        super();
        this.data = _data;
        this.elem = this.createElem();
    }
    createElem() {
        if (this.elem) return this.elem;
        let div = Utils.ce("div", {
            width: "80px",
            height: "22px",
            position: "relative"
        });
        this.leftBn = Utils.ce("a", {
            width: "15px",
            height: "20px",
            border: "1px solid #cccccc",
            display: "block",
            textDecoration: "none",
            color: "#333333",
            textAlign: "center",
            lineHeight: "20px",
            float: "left",
            backgroundColor: "#ffffff"
        })
        this.leftBn.href = "javascript:void(0)";
        this.leftBn.textContent = "-"
        this.input = Utils.ce("input", {
            border: "none",
            borderTop: "1px solid #cccccc",
            borderBottom: "1px solid #cccccc",
            outline: "none",
            textAlign: "center",
            float: "left",
            width: "42px",
            height: "18px"
        })
        this.input.value = "1";
        this.rightBn = this.leftBn.cloneNode(false);
        this.rightBn.textContent = "+";
        div.appendChild(this.leftBn);
        div.appendChild(this.input);
        div.appendChild(this.rightBn);
        this.input.addEventListener("input", e => this.inputHandler(e));
        this.leftBn.addEventListener("click", e => this.clickHandler(e));
        this.rightBn.addEventListener("click", e => this.clickHandler(e));
        return div;
    }

    appendTo(parent) {
        if (typeof parent === "string") parent = document.querySelector(parent);
        parent.appendChild(this.elem);
    }
    inputHandler(e) {
        if (this.ids !== undefined) return;
        this.ids = setTimeout(() => {
            clearTimeout(this.ids);
            this.ids = undefined;
            this.setStep(this.input.value, true);
        }, 500)
    }
    clickHandler(e) {
        var bn = e.currentTarget;
        if (bn.bool) return;
        if (bn === this.leftBn) {
            this.step--;
        }else{
            this.step++;
        }
        this.setStep(this.step,true);
    }
    setStep(_step,bool){
        if(typeof _step==="string"){
            _step=Number(_step.replace(/\D/g,""));
        }
        if(_step>=99){
            _step=99;
            this.rightBn.style.color="#CCCCCC";
            this.rightBn.bool=true;
        }else if(_step<=1){
            this.leftBn.style.color="#CCCCCC";
            this.leftBn.bool=true;
            _step=1;
        }else{
            this.rightBn.bool=false;
            this.rightBn.style.color="#000000";
            this.leftBn.bool=false;
            this.leftBn.style.color="#000000";
        }
        this.step=_step;
        this.input.value=this.step;
        if(bool){
            var evt=new Event("change");
            evt.step=this.step;
            evt.data=this.data;
            this.dispatchEvent(evt);
        }
    }
}