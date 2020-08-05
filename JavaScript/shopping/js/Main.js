import GoodsItem from "./GoodsItem.js"
import Shopping from "./Shopping.js"
import Utils from "./Utils.js"


export default class Main{
    list;
    goodsList = [];
    shoppingList = [];
    shopping;
    constructor(_list){
        this.list = _list;
        var div = Utils.ce("div");
        for(var i =0;i<this.list.length;i++){
            var goods = new GoodsItem();
            goods.appendTo(div);
            goods.setData(_list[i]);
            goods.addEventListener("click",e=>this.clickHandler(e))
        }
        document.body.appendChild(div);

        this.shopping = new Shopping();
        this.shopping.appendTo("body");
        this.shopping.addEventListener(Shopping.CHECK_CHANGE,e=>this.checkChangeHandler(e));
        this.shopping.addEventListener(Shopping.STEP_CHANGE,e=>this.stepChangeHandler(e));
        this.shopping.addEventListener(Shopping.DELETE_CHANGE,e=>this.deleteChangeHandler(e));
        this.totalDiv = Utils.ce("div",{
            fontSize:"30px",
            textAlign:"right",
            paddingRight:"150px",
            color:"red"
        },"body")
    }
    clickHandler(e){
        var data = e.currentTarget.data;
        var item = this.shoppingList.reduce((value,item) => {
            if(item.id === data.id) value =item;
            return value;
        },null);
        if(item){
            item.num++;
            item.total = item.price * item.num;
        }else{
            var obj = {
                id:data.id,
                checked:false,
                icon:e.icon,
            }
        }
    }
}