export default class LoadImage extends EventTarget{
    list;
    num=0;
    finishArr=[];
    callBack;
    static IMAGE_FINISH="imgFinish";
    constructor(list,basePath,expandedName,_callBack){
        super();
        if(basePath.constructor===Function)
        {
             this.callBack=basePath;
             this.list=this.changeList(list)
        }else{
            this.callBack=_callBack;     
            this.list=this.changeList(list,basePath,expandedName)
        }
        
        this.loadImage();
    }

    changeList(list,basePath,expandedName){
        if(basePath){
            basePath=basePath.endsWith("/") ? basePath : basePath+"/";
            list=list.map(item=>basePath+item);
        }
        if(expandedName){
            list=list.map(item=>{
                var names=item.split(".")
                var str="aa";
                if(/jpg|png|jpeg|bmp|gif|webp/i.test(names[names.length-1])) return item;
                return item+(expandedName.includes(".") ? expandedName : "."+expandedName);
            })
        }
        return list;
    }
    
    loadImage(){
        var img=new Image();
        this.loadFn=e=>this.loadHandler(e)
        img.addEventListener("load",this.loadFn);
        img.src=this.list[this.num];
    }
    loadHandler(e){
        var img=e.currentTarget;
        this.finishArr.push(img.cloneNode(false));
        this.num++;
        if(this.num>this.list.length-1){
            img.removeEventListener("load",this.loadFn);
            this.loadFn=null;
            if(this.callBack){
                this.callBack(this.finishArr);
            }else{
                var evt=new Event(LoadImage.IMAGE_FINISH);
                evt.list=this.finishArr;
                this.dispatchEvent(evt);
            }
            return;
        }
        img.src=this.list[this.num];
    }
}