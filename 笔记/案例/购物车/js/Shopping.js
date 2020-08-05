import Utils from "./Utils.js";
import CheckBox from "./CheckBox.js";
import StepNumber from "./StepNumber.js";

export default class Shopping extends EventTarget{
    table;
    static styleBool=false;
    headList=["全选","","商品","","单价","数量","小计","操作"];
    static CHECK_CHANGE="check_change_event";
    static STEP_CHANGE="step_change_event";
    static DELETE_CHANGE="delete_change_event";
    
    constructor(){
        super();
        if(!Shopping.styleBool) Shopping.setStyle();
        this.elem=this.createElem();
    }
    createElem(){
        if(this.elem) return this.elem;
        return Utils.ce("div");
    }
    appendTo(parent){
        if(typeof parent==="string") parent=document.querySelector(parent);
        parent.appendChild(this.elem);
    }
    setData(list){
        if(this.table) this.table.remove();
        this.table=Utils.ce("table");
        this.table.className="tableClass"
        this.createHead(this.table,list);
        this.createListTr(this.table,list);
        this.elem.appendChild(this.table);
    }
    createHead(table,list){
        var thr=Utils.ce("tr");
        thr.className="thr";
        for(var j=0;j<this.headList.length;j++){
           if(j===1) continue;
           var th=Utils.ce("th");
           th.textContent=this.headList[j];
           th.style.textAlign="left"
           th.style.paddingLeft="15px";
           if(j===0){
              th.setAttribute("colspan","2");
              let ck=new CheckBox();
              var bool=list.every(item=>{
                  return item.checked
              })
                ck.setCheck(bool);
                ck.insertTo(th,th.firstChild);
                ck.addEventListener("change",e=>this.checkHandler(e))
           }
           if(j===2){
             th.style.textAlign="center"
             th.style.paddingLeft="0";
           }
           thr.appendChild(th);
        }
        table.appendChild(thr)
    }
    createListTr(table,list){
        for(var i=0;i<list.length;i++){
            var tr=Utils.ce("tr");
            tr.className="trs";
            if(i===0) tr.style.borderTop="2px solid #999999"
            for(var prop in list[i]){
                if(prop==="id") continue;
                var td=Utils.ce("td");
                td.style.padding="15px 0 10px";
                td.style.wordWrap="break-word";
                this.createTdContent(td,list[i],prop);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }   
    }
    createTdContent(td,data,prop){
        switch(prop){
            case "checked":
                let ck=new CheckBox(data);
                ck.setCheck(data[prop]);
                ck.appendTo(td);
                ck.addEventListener("change",e=>this.checkHandler(e))
                td.style.padding="0 15px 0 11px";
                break;
            case "icon":
                var img=new Image();
                img.src=data[prop];
                Object.assign(img.style,{
                    width:"80px",
                    height:"80px"
                })
                td.appendChild(img);
                break;
            case "total":
                td.style.fontWeight="600";
            case "price":
                td.textContent="￥"+data[prop].toFixed(2);
                break
            case "deleted":
                var span=Utils.ce("span");
                span.style.marginLeft="10px";
                span.textContent="删除";
                span.data=data;
                td.appendChild(span);
                span.addEventListener("click",e=>this.deleteHandler(e));
                break;
            case "num":
                var step=new StepNumber(data);
                step.setStep(data[prop]);
                step.appendTo(td);
                step.addEventListener("change",e=>this.stepChangeHandler(e))
                break;
            default :
               td.textContent=data[prop];
               td.style.paddingLeft="15px"
               break
        }
    }
    stepChangeHandler(e){
       var evt=new Event(Shopping.STEP_CHANGE);
       evt.data=e.data;
       evt.step=e.step;
       this.dispatchEvent(evt);
    }
    checkHandler(e){
        var evt=new Event(Shopping.CHECK_CHANGE);
        evt.data=e.data;
        evt.checked=e.checked;
        this.dispatchEvent(evt);
    }
    deleteHandler(e){
        var evt=new Event(Shopping.DELETE_CHANGE);
        evt.data=e.currentTarget.data;
        this.dispatchEvent(evt);
    }

    static setStyle(){
        Shopping.styleBool=true;
        Utils.setStyle({
            ".tableClass":{
                width:"990px",
                position:"relative",
                margin:"auto",
                left:0,
                right:0,
                borderCollapse:"collapse"
            },
            ".thr":{
                width:"100%",
                height:"32px",
                lineHeight:"32px",
                padding:"5px 0px",
                backgroundColor:"#F3F3F3",
                color:"#666666",
                fontSize:"12px",
                margin:"0px 0px 10px"
            },
            ".trs":{
                width:"100%",
                backgroundColor:"#fff4e8",
                color:"#666666",
                fontSize:"12px",
                borderTop:"1px solid #CCCCCC",
            },
            ".thr>th:nth-child(1)":{
                width:"122px",
                paddingLeft:"11px"
            },
            ".thr>th:nth-child(2)":{
                width:"208px",
             
            },
            ".thr>th:nth-child(3)":{
                width:"150px",
                padding:"0 10px 0 20px"
            },
            ".thr>th:nth-child(4)":{
                width:"100px",
                paddingRight:"40px"
            },
            ".thr>th:nth-child(5)":{
                width:"120px",
               
            },
            ".thr>th:nth-child(6)":{
                width:"100px",
                paddingRight:"40px"
            },
            ".thr>th:nth-child(7)":{
                width:"75px",
                paddingLeft:"11px"
            }
        })
    }
}