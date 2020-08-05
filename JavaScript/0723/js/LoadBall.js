import Utils from "./Utils.js";
export default class LoadBall {
    rect;
    angle = 360;
    x = 0;
    y = 0;
    r = 30;
    constructor() {
        this.elem = this.createElem();
    }
    createElem() {
        if (this.elem) return this.elem;
        let div = Utils.createElem("div", {
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "rgba(220,165,60,1)",
            position: "absolute"
        })
        return div;
    }
    changeBg(color) {
        this.elem.style.backgroundColor = color;
    }
    appendTo(parent) {
        if (parent.constructor === String)
            parent = document.querySelector(parent)
        parent.appendChild(this.elem);
        this.rect = parent.getBoundingClientRect();
    }
    move(x, y) {
        this.x = x;
        this.y = y;
    }
    alpha(_alpha) {
        this.elem.style.opacity = _alpha;
    }
    update() {
        this.angle -= 5;
        if (this.angle <= 0) this.angle = 360
        this.elem.style.left = this.x + Math.sin(this.angle * Math.PI / 180) * this.r + "px";
        this.elem.style.top = this.y + Math.cos(this.angle*Math.PI / 180) * this.r + "px"
    }

}