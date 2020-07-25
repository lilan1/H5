import LoadImage from "./LoadImage.js";
import Utils from "./Utils.js";
export default class Carousel{
    imgList;
    w;
    h;
    bnlist;
    list;
    imageCon;
    parent;
    dot;
    dotList=[];
    pos=0;
    direction="";
    bool=false;
    x=0;
    speed=0.5;
    autoBool=false;
    time=200;
    pre;
    static carouselList=[];
    constructor(_imgList){
      
        this.imgList=_imgList;
        this.carousel=this.createCarousel();
        new LoadImage(_imgList,list=>this.finishHandler(list));
        Carousel.carouselList.push(this);
    }
    appendTo(parent){
        if(parent.constructor===String) parent=document.querySelector(parent);
        parent.appendChild(this.carousel);
        this.parent=parent;
    }
    finishHandler(_list){
        this.bnlist=_list.splice(-2);
        if(!this.w){
            this.w=_list[0].width/100;
            this.h=_list[0].height/100;
        }
        // 到此为止w和h正式全部确认完毕
        this.list=_list.map(item=>{
            item.style.width=this.w+"rem";
            item.style.height=this.h+"rem";
            return item;
        })
        Object.assign(this.carousel.style,{
            width:this.w+"rem",
            height:this.h+"rem"
        })
        this.createImageCon();
        this.createBn();
        this.createDot();
        this.changePre();
    }
    setWH(_w,_h){
        if(!this.parent) return;
        if(_w.constructor===Boolean){
            if(_w){
                var rect=this.parent.getBoundingClientRect();
                this.w=rect.width/100;
                this.h=this.w/3;
            }
        
        }else if(_w.constructor===Number){
            this.w=_w/100;
            this.h=_h/100;
        }
    }
    createCarousel(){
       var carousel=Utils.ce("div",{
            position:"relative",
            margin:"auto",
            overflow:"hidden",
            left:0,
            right:0,
            backgroundColor:"rgba(255,0,0,0.1)",
        });
        carousel.addEventListener("mouseenter",e=>this.mouseHandler(e));
        carousel.addEventListener("mouseleave",e=>this.mouseHandler(e));
        return carousel;
    }
    createImageCon(){
        this.imageCon=Utils.ce("div",{
            width:this.w*2+"rem",
            height:this.h+"rem",
            position:"absolute",
            left:0,
        })
        this.imageCon.appendChild(this.list[0]);
        this.carousel.appendChild(this.imageCon);
    }

    createBn(){
        this.bnlist.forEach((item,index)=>{
            Object.assign(item.style,{
                position:"absolute",
                left:index===0 ? "20px" : "none",
                right:index===1 ? "20px" : "none",
                top:(this.h-item.height/100)/2+"rem"
            });
            item.addEventListener("click",e=>this.clickHandler(e));
            this.carousel.appendChild(item);
        })
    }
    createDot(){
        this.dot=Utils.ce('ul',{
            listStyle:"none",
            margin:"0px",
            padding:"0px",
            position:"absolute",
            bottom:"0.2rem"
        })
        this.list.forEach((item,index)=>{
           var li=Utils.ce("li",{
                width:"0.15rem",
                height:"0.15rem",
                backgroundColor:"rgba(255,0,0,0)",
                border:"1px solid #FF0000",
                borderRadius:"0.15rem",
                float:"left",
                marginLeft:index===0 ? 0 : "0.1rem"
            },this.dot);
            this.dotList.push(li);
        });
        this.carousel.appendChild(this.dot);
        this.dot.style.left=(this.w-this.dot.offsetWidth/100)/2+"rem";
        this.dot.addEventListener("click",e=>this.clickDotHandler(e));
    }
    

    clickHandler(e){
        if(this.bnlist.indexOf(e.currentTarget)===0){
            this.pos--;
            if(this.pos<0) this.pos=this.list.length-1;
            this.direction="right";
        }else{
            this.pos++;
            if(this.pos>this.list.length-1) this.pos=0;
            this.direction="left";
        }
        this.createNextImage();
    }


    clickDotHandler(e){
        if(e.target.constructor!==HTMLLIElement) return;
        var index=this.dotList.indexOf(e.target);
        if(index===this.pos) return;
        this.direction=index>this.pos ? "left" : "right";
        this.pos=index;
        this.createNextImage();
    }

    createNextImage(){
        if(this.direction==="left"){
            this.imageCon.appendChild(this.list[this.pos]);
            this.imageCon.style.left="0rem"
            this.x=0;
        }else{
            this.imageCon.insertBefore(this.list[this.pos],this.imageCon.firstChild);
            this.imageCon.style.left=-this.w+"rem";
            this.x=-this.w;
        }
        this.bool=true;
        this.changePre();
    }

    changePre(){
        if(this.pre){
            this.pre.style.backgroundColor="rgba(255,0,0,0)";
        }
        this.pre=this.dotList[this.pos];
        this.pre.style.backgroundColor="rgba(255,0,0,0.6)";
    }

    mouseHandler(e){
        if(e.type==="mouseenter"){
            this.autoBool=false;
            this.time=200;
        }else{
            this.autoBool=true;
        }
    }

    update(){
        this.imgMove();
        this.autoPlay();
    }
    imgMove(){
        if(!this.bool) return;
            if(this.direction==="left"){
                this.x-=this.speed;
                if(this.x<=-this.w){
                    this.x=0;
                    this.bool=false;
                    this.imageCon.firstElementChild.remove();
                }
                this.imageCon.style.left=this.x+"rem";
            }else{
                this.x+=this.speed;
                if(this.x>=0){
                    this.x=0;
                    this.bool=false;
                    this.imageCon.lastElementChild.remove();
                }
                this.imageCon.style.left=this.x+"rem";
            }
    }
    autoPlay(){
        if(!this.autoBool)return;
        this.time--;
        if(this.time>0) return;
        this.time=200;
        var evt=new MouseEvent("click");
        this.bnlist[1].dispatchEvent(evt);
    }
    static UPDATE(){
        for(var i=0;i<Carousel.carouselList.length;i++){
            Carousel.carouselList[i].update();
        }
    }
}