/* 
    工具库
    1. 时间差计算
    2. 随机颜色获取
    3. 创建元素
    4. 创建CSS
    5. 增加CSS
    6. 拖拽
    作者：李岚
    时间：2020年7月20日

    1. 第一次修改
        1. 修改完善关于时间差运算时的多块体之间的交集时间差
        2. 创建随机色的获取函数
            修改时间：2020年7月14日
            修改人：李岚
    2. 第二次修改
        1. 创建函数：依据标签类型、样式和父元素生成元素
        2. 创建函数：将给定样式插入生成好的html页面中
        3. 创建函数：修改页面中生成好的CSS样式
            修改时间：2020年7月16日
            修改人：李岚
    3. 第三次修改
        1. 创建函数：拖拽
            修改时间：2020年7月20日
            修改人：李岚
        


*/




export default class Utils{
    static time=0;
    static ids=0;
    static timeManage={};
 //    在静态方法中调用的变量都需要写成静态的
 // 在静态方法中理论上不能使用this的，我们需要坚决贯彻这个思想
 // 实际在静态方法中this就是当前类名
    static timeStart(){
         if(Utils.time) return;
         Utils.time=new Date().getTime();
     }
    static timeEnd(){
         var t=new Date().getTime()-Utils.time;
         Utils.time=0;
         return t;
     }
     static ts(){
         Utils.ids++;
         Utils.timeManage[Utils.ids]=new Date().getTime();
         return ids;
     }
     static te(id){
         if(!Utils.timeManage[Utils.id]) return 0;
         var t=new Date().getTime()-Utils.timeManage[Utils.id];
         delete Utils.timeManage[Utils.id];
         return t;
     }

     /* 
        产生随机色的方法
            参数：无
            返回：返回十六进制编码的颜色#000000

            1. 循环产生六位十六进制
            2. 使用Math.random*16的方式产生随机的0-15之间的数值转换成字符串并返回
        */
     static randomColor(){
         var col="#";
         for(var i=0;i<6;i++){
             col+=Math.floor(Math.random()*16).toString(16);
         }
         return col;
     }
     static random(min,max){
         return Math.floor(Math.random()*(max-min)+min);
     }

     /* 
        创建元素
            参数：
                type：需要创建的元素的类型
                style：需要创建的元素的样式
                parent：需要创建的元素要添加在哪个父元素下
            
            返回：返回创建好的元素

            1. 创建元素
            2. 通过循环将给定的样式添加给创建好的元素
            3. 获取父元素
            4. 如果父元素存在，将创建好的子元素添加进父元素
        */
      static createElem(type,style,parent){
         var elem=document.createElement(type);
         if(style){
             for(var prop in style){
                 elem.style[prop]=style[prop];
             }
         }
         if(typeof parent==="string") parent=document.querySelector(parent);
         if(parent) parent.appendChild(elem);
         return elem;
     }

     /* 
        创建样式
            参数：
                styles：需要创建的样式

            1. 先创建style标签并添加到html的head标签中
            2. 获取只读的document.styleSheets
            3. 通过addCss函数，将给定的需要创建的样式写进第二步获取的styleSheets

            返回：无
        
        */
     static setStyle(styles){
         var style=document.createElement("style");
         document.head.appendChild(style);
         var styleSheet=document.styleSheets[document.styleSheets.length-1];
         for(var prop in styles){
             Utils.addCss(styleSheet,prop,styles[prop]);
         }
     }

     /* 
        增加CSS
            参数：

            返回：无
        */
     static addCss(styleSheet,selector,style){
         var str=selector+" {";
         for(var prop in style){
             var value=style[prop]
             prop=prop.replace(/([A-Z])/g,function($1){
                 return "-"+$1.toLowerCase();
             })
             str+=prop+":"+value+";"
         }
         str+=" }";
         styleSheet.insertRule(str,styleSheet.cssRules.length);
     }

     static dragElem(elem, parentOut) {
        elem.obj = this;
        elem.style.position = "absolute";
        document.parentOut = parentOut;
        elem.addEventListener("mousedown", this.mousedownHandler)
    }
    static mousedownHandler(e) {
        if (e.type === "mousedown") {
            e.preventDefault();
            document.x = e.offsetX;
            document.y = e.offsetY;
            document.div = this;
            document.obj = this.obj;
            document.addEventListener("mousemove", this.obj.mousedownHandler)
            document.addEventListener("mouseup", this.obj.mousedownHandler)
        } else if (e.type === "mousemove") {
            var rect = this.div.parentElement.getBoundingClientRect();
            var x = e.clientX - rect.x - this.x;
            var y = e.clientY - rect.y - this.y;
            if (this.parentOut === true) {
                if (x < 0) x = 0;
                if (x >= rect.width - this.div.offsetWidth) x = rect.width - this.div.offsetWeight;
                if (y < 0) y = 0;
                if (y >= rect.height - this.div.offsetHeight) y = rect.height - this.div.offsetHeight;
            } else if (typeof this.parentOut === "object") {
                if (x < 0) x = 0;
                if (x >= this.parentOut.width - this.div.offsetWidth) x = this.parentOut.width - this.div.offsetWidth;
                if (y < 0) y = 0;
                if (y >= this.parentOut.height - this.div.offsetHeight) y = this.parentOut.height - this.div.offsetHeight;
                if (this.parentOut.width === 0) x = 0;
                if (this.parentOut.height === 0) y = 0;
            }
            this.div.style.left = x + "px";
            this.div.style.top = y + "px"
        } else {
            document.removeEventListener("mousemove", this.obj.mousedownHandler)
            document.removeEventListener("mouseup", this.obj.mousedownHandler)
        }
    }
    static dragOff(elem) {
        elem.obj = null;
        document.obj = null;
        elem.removeEventListener("mousedown", this.mousedownHandler)
    }
    static random(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    }
 }



