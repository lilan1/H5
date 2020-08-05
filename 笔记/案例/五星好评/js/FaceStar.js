import Utils from "./Utils.js";
export default class FaceStar extends EventTarget{
    label;
    list=[];
    pos=-1;
    constructor(_label){
        super();
        this.label=_label;
        this.elem=this.createElem();
    }
    createElem(){
        if(this.elem) return this.elem;
        let div=Utils.ce("div",{
            height:"32px",
            float:"left",
            marginRight:"20px",
            position:"relative"
        });
        let span=Utils.ce("span",{
            marginRight:"10px",
            position:"relative",
            top:"-3px"
        });
        span.textContent=this.label;
        let con=Utils.ce("ul",{
            listStyle:"none",
            margin:0,
            padding:0,
            height:"32px",
            position:"relative",
            display:"inline-block"
        })
        for(var i=0;i<5;i++){
            let star=Utils.ce("li",{
                width:"16px",
                height:"16px",
                float:"left",
                marginTop:"16px",
                backgroundImage:"url(./img/commstar.png)"
            });
            this.list.push(star);
            con.appendChild(star)
        }
       this.face=Utils.ce("div",{
            width:"16px",
            height:"16px",
            position:"absolute",
            backgroundPositionX:-20*4+"px",
            display:"none",
            backgroundImage:"url(./img/face-red.png)"
        })
        con.appendChild(this.face);
        div.appendChild(span);
        div.appendChild(con);
        con.addEventListener("mouseover",e=>this.mouseHandler(e))
        con.addEventListener("mouseleave",e=>this.mouseleaveHandler(e))
        con.addEventListener("click",e=>this.mouseHandler(e))
        return div;
    }
    appendTo(parent){
        if(typeof parent==="string") parent=document.querySelector(parent);
        parent.appendChild(this.elem);
    }
    mouseHandler(e){
        if(e.target.constructor!==HTMLLIElement) return;
        var index=this.list.indexOf(e.target);
        if(e.type==="mouseover"){
            this.face.style.display="block";
            this.face.style.backgroundPositionX=(4-index)*-20+"px"
            this.face.style.left=e.target.offsetLeft+'px';
            this.list.forEach((item,i)=>{
                if(i<=index){
                    item.style.backgroundPositionY="-16px"
                }else if(i>this.pos){
                    item.style.backgroundPositionY="0px"
                }
            })
        }else if(e.type==="click"){
            this.pos=index;
            this.setStar(this.pos);
            var evt=new Event("change");
            evt.pos=this.pos;
            this.dispatchEvent(evt);
        }
    }
    mouseleaveHandler(e){
        this.face.style.display="none";
       this.setStar(this.pos)
    }
    setStar(index){
        this.list.forEach((item,i)=>{
            if(i<=index){
                item.style.backgroundPositionY="-16px"
            }else{
                item.style.backgroundPositionY="0px"
            }
        })
    }
}