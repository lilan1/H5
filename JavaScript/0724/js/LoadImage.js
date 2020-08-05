
export default class LoadImage extends EventTarget{
    /* 
    1. 将文件名拆开写：路径前缀+文件名+文件后缀
        比如说：加载一张图片的话，文件的后缀有可能是png、jpg等等。文件的前缀拆出来的原因是因为文件有可能存在不同的几个文件夹
    2. 能拆开的东西尽量都拆开，可能修改的地方全部独立
    */

    /* 
    1. 加载完成之后需要告知调用类的对象
    2. 使用callback将加载完成的数组返回给外面
    3. 通过使用回调函数的方式将结果返回
    4. 还需要考虑到callback函数没有给的情况，需要在类中自己创建一个事件抛发
    


    1. 所有的DOM和event.target可以抛发事件
    

    回调函数的问题
    1. 深层回调会出问题

    使用事件的分离度很高，而且深层遍历不容易出问题
    
    */
   callback;
   list;
   num = 0;
   finishArr = []
   static IMAGE_FINISH = "imgFinish"

   constructor(list,basePath,expandedName,_callback){
        super();
        if(basePath.constructor === Function){
            this.callback = basePath;
            this.list = this.changeList(list);
        }else{
            this.callback = _callback;
            this.list = this.changeList(list,basePath,expandedName)
        }
        this.LoadImage()
   }


   changeList(list,basePath,expandedName){
       if(basePath){
           basePath = basePath.endsWith("/") ? basePath:basePath+"/"
           list = list.map(item=>basePath+item)
       }
       if(expandedName){
           list = list.map(item=>{
               var names = item.split(".")
               if(/jpg|png|jpeg|bmp|gif|webp/i.test(names[names.length-1]))
               return item;
               return item+(expandedName.includes(".") ? expandedName :"."+expandedName);
           })
       }
       return list
   }

   LoadImage(){
       var img = new Image();
       this.loadFn=e=>this.loadHandler(e);
       img.addEventListener("load",this.loadFn);
       img.src = this.list[this.num];
   }
   loadHandler(e){
       var img = e.currentTarget;
       this.finishArr.push(img.cloneNode(false));
       this.num++;
       if(this.num>this.list.length-1){
           img.removeEventListener("load",this.loadFn);
           this.loadFn = null;
           if(this.callback){
               this.callback(this.finishArr);
           }else{
               var evt = new Event(LoadImage.IMAGE_FINISH);
               evt.list = this.finishArr;
               this.dispatchEvent(evt);
           }
           return;
       }
       img.src = this.list[this.num]
   }







}