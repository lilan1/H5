export default class CheckBox {
    labelText;
    checked = false;
    constructor(_label) {
        this.labelText = _label;
        this.elem = this.createElem();
    }
    createElem() {
        if (this.elem) return this.elem;
        let div = document.createElement("div");

        Object.assign(div.style, {
            marginRight: "50px",
            float: "left",
            width: "70px",
            position: "relative",
            // backgroundColor:"red"
        })

        let span = document.createElement("span")
        Object.assign(span.style, {
            width: "14px",
            height: "14px",
            display: "inline-block",
            position: "absolute",
            marginRight: "8px",
            backgroundImage: "url('./img/new_icon.png')",
            backgroundPositionX: "-238px",
            backgroundPositionY: "-37px",
            top: "4px"
        })

        div.appendChild(span)
        let spanLabel = document.createElement("span");
        spanLabel.style.position = "relative";

        spanLabel.textContent = this.labelText
        spanLabel.style.left = "20px"
        div.appendChild(spanLabel)
        div.addEventListener("click", e=>this.clickHandler(e))
        return div;
    }
    appendTo(parent) {
        if (typeof parent === "string") parent = document.querySelector(parent);
        parent.appendChild(this.elem)
    }
    clickHandler(e) {
        this.checked = !this.checked
        Object.assign(this.elem.firstElementChild.style, {
            backgroundPositionX: this.checked ? "-128px" : "-238px",
            backgroundPositionY: this.checked ? "-126px" : "-37px"
        })
    }
}