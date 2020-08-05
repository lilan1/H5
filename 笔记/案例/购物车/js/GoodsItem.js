import Utils from "./Utils.js";
export default class GoodsItem extends EventTarget {
    static styleBool = false;
    data;
    preIcon;
    constructor() {
        super();
        this.elem = this.createElem();
        if (!GoodsItem.styleBool) GoodsItem.setStyle();
        this.renderHTML();
        this.elem.addEventListener("click", e => this.clickHandler(e))
    }

    createElem() {
        if (this.elem) return this.elem;
        var div = Utils.ce("div");
        div.className = "goodsItem";
        return div;
    }
    appendTo(parent) {
        if (typeof parent === "string") parent = document.querySelector(parent);
        parent.appendChild(this.elem);
    }
    setData(_data) {
        this.data = _data;
        this.icon = this.elem.querySelector(".icon");
        let presell = this.elem.querySelector(".presell");
        this.miniIconCon = this.elem.querySelector(".miniIconCon");
        var price = this.elem.querySelector(".price");
        var infoCon = this.elem.querySelector(".infoCon");
        var evaluate = this.elem.querySelector(".evaluate");
        var shopCon = this.elem.querySelector(".shopCon");
        var tagCon = this.elem.querySelector(".tagCon");
        if (_data.presell.trim().length > 0) {
            presell.textContent = _data.presell;
        } else {
            presell.style.display = "none"
        }
        var miniIconStr = "";
        _data.miniIcon.forEach(item => {
            miniIconStr += `<img src=${item} class="miniIcon">`
        })
        this.miniIconCon.innerHTML = miniIconStr;
        this.miniIconCon.addEventListener("mouseover", e => this.iconMouseHandler(e))
        this.changeIcon(0);

        price.textContent = _data.price.toFixed(2);
        infoCon.textContent = _data.info
        evaluate.textContent = _data.evaluate;
        shopCon.textContent = _data.shopName;
        var dic = {
            "自营": "goods_icon_0",
            "放心购": "goods_icon_1",
            "本地仓": "goods_icon_0",
            "赠": "goods_icon_2",
            "京东物流": "goods_icon_2",
            "秒杀": "goods_icon_2",
            "免邮": "goods_icon_2",
            "险": "goods_icon_3",
        }
        var tagStr = "";
        _data.tag.forEach(item => {
            tagStr += `<span class='${dic[item]}'>${item}</span>`
        });
        tagCon.innerHTML = tagStr;
    }


    iconMouseHandler(e) {
        if (e.target.constructor !== HTMLImageElement) return;
        var index = Array.from(e.currentTarget.children).indexOf(e.target);
        this.changeIcon(index);
    }
    changeIcon(index) {
        if (this.preIcon) {
            this.preIcon.style.border = "1px solid #CCCCCC";
        }

        this.icon.src = this.data.icon[index];
        this.preIcon = this.miniIconCon.children[index];
        this.preIcon.style.border = "2px solid #e4393c";
    }

    renderHTML() {
        this.elem.innerHTML = `
            <div class="iconCon">
                <img class="icon">
                <div class="presell">
            </div>
            <div class="miniIconCon"></div>
            <div class="priceCon">
                <span class="money">￥</span>
                <span class="price"></span>
            </div>
            <a class="infoCon" href="#"></a>
            <div class="evaluateCon"><span class="evaluate"></span>条评价</div>
            <div class="shopCon"></div>
            <div class="tagCon">
            </div>
        `
    }

    static setStyle() {
        GoodsItem.styleBool = true;
        Utils.setStyle({
            ".goodsItem": {
                width: "240px",
                height: "466px",
                float: "left",
                margin: "5px"
            },
            ".goodsItem:hover": {
                boxShadow: "0px 0px 4px #999999"
            },
            ".iconCon": {
                width: "220px",
                height: "220px",
                marginBottom: "5px",
                position: "relative",
                margin: "auto",
                left: 0,
                right: 0,
            },
            ".presell": {
                width: "200px",
                height: "25px",
                position: "absolute",
                bottom: "0px",
                backgroundColor: "rgba(0,0,0,0.4)",
                fontSize: "12px",
                color: "#FFFFFF",
                paddingLeft: "20px",
                lineHeight: "25px"
            },
            ".miniIcon": {
                width: "25px",
                height: "25px",
                border: "1px solid #CCCCCC",
                marginRight: "5px"
            },
            ".priceCon": {
                width: "220px",
                height: "22px",
                color: "#e4393c",
                fontSize: "20px",
                marginTop: "5px",
            },
            ".money": {
                fontSize: "16px",
            },
            ".price": {
                marginLeft: "-10px"
            },
            ".infoCon": {
                width: "220px",
                height: "40px",
                wordWrap: "break-word",
                overflow: "hidden",
                display: "block",
                fontSize: "12px",
                color: "#333333",
                lineHeight: "20px",
                marginTop: "10px",
                textDecoration: "none"
            },
            ".evaluateCon": {
                width: "220px",
                height: "18px",
                fontSize: "12px",
                color: "#333333",
                marginTop: "5px"
            },
            ".evaluate": {
                color: "#646FB0",
                fontWeight: "600",
            },
            ".shopCon": {
                fontSize: "12px",
                marginTop: "5px",
                color: "#AAAAAA",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: "122px",
                height: "18px"
            },
            ".goods_icon_0": {
                float: "left",
                height: "16px",
                lineHeight: "16px",
                padding: "0 3px",
                marginRight: "3px",
                overflow: "hidden",
                textAlign: "center",
                fontStyle: "normal",
                fontSize: "12px",
                fontFamily: '"Helvetica Neue","Hiragino Sans GB",SimSun,serif',
                background: "#e23a3a",
                color: "#FFF",
                cursor: "default",
                borderRadius: "2px",
            },
            ".goods_icon_1": {
                border: "1px solid #e23a3a",
                borderColor: "#4d88ff",
                color: "#4d88ff",
                float: "left",
                height: "14px",
                lineHeight: "14px",
                padding: "0 3px",
                marginRight: "3px",
                overflow: "hidden",
                textAlign: "center",
                fontStyle: "normal",
                fontSize: "12px",
                fontFamily: '"Helvetica Neue","Hiragino Sans GB",SimSun,serif"',
                borderRadius: "2px",
            },
            ".goods_icon_2": {
                float: 'left',
                height: '14px',
                lineHeight: '14px',
                padding: '0 3px',
                border: '1px solid #e23a3a',
                marginRight: '3px',
                overflow: 'hidden',
                textAlign: 'center',
                fontStyle: 'normal',
                fontSize: '12px',
                fontFamily: '"Helvetica Neue","Hiragino Sans GB",SimSun,serif',
                borderRadius: '2px',
                color: '#e23a3a',
            },
            ".goods_icon_3": {
                float: 'left',
                height: '16px',
                lineHeight: '16px',
                padding: '0 3px',
                marginRight: '3px',
                overflow: 'hidden',
                textAlign: 'center',
                fontStyle: 'normal',
                fontSize: '12px',
                fontFamily: '"Helvetica Neue","Hiragino Sans GB",SimSun,serif',
                background: '#e23a3a',
                color: '#FFF',
                cursor: 'default',
                borderRadius: '2px',
                background: "#4b9bfc",
            },
            ".tagCon": {
                marginTop: "10px"
            }
        })
    }
    clickHandler(e) {
        var evt = new Event("click");
        evt.icon = this.preIcon.src;
        this.dispatchEvent(evt);
    }
}