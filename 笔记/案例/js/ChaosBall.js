import Utils from "./Utils.js";

export default class RedBall {
    speedX = 2;
    speedY = 3;
    x = 0;
    y = 0;
    w=50;
    rect;
    constructor() {
        this.elem = this.createElem();
    }
    createElem() {
        if (this.elem) return this.elem;
        this.w = Utils.random(30, 60);
        let div = Utils.ce("div", {
            width: this.w + "px",
            height: this.w + "px",
            borderRadius: "50%",
            backgroundColor: Utils.randomColor(),
            position: "absolute",
        })
        return div;
    }
    appendTo(parent) {
        if (parent.constructor === String) parent = document.querySelector(parent);
        parent.appendChild(this.elem);
        this.rect=parent.getBoundingClientRect();
    }
  
    move(x, y) {
        if(x) this.x=x;
        if(y) this.y=y;
        this.elem.style.left = this.x + "px";
        this.elem.style.top = this.y + "px";
    }
    update() {
        if (this.x + this.w > this.rect.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y + this.w > this.rect.height || this.y < 0) this.speedY = -this.speedY;
        this.x+=this.speedX;
        this.y+=this.speedY;
        this.move();
    }
    dispose(){
        this.elem.remove();
        this.elem=null;
    }
}