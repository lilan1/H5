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
     static ce(type,style,parent){
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
    static setStyle(styles){
        var style=document.createElement("style");
        document.head.appendChild(style);
        var styleSheet=document.styleSheets[document.styleSheets.length-1];
        for(var prop in styles){
            Utils.addCss(styleSheet,prop,styles[prop]);
        }
    }
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
    static CSStoString(str){
       return str.replace(/(?<=:)(.*?)(?=;)|-[a-z](?=.+:)|;/g,function(item){
            if(item===";") return ","
            if(item[0]==="-")  return item[1].toUpperCase();
            return "'"+item.trim()+"'";
        });
    }

    static CSStoObject(str){
        str=Utils.CSStoString(str);
       return  str.split(",").reduce((value,item)=>{
           item=item.replace(/\n/g,"");
            var arr=item.split(":");
            arr[0]=arr[0].replace(/\s/g,"");
            if(arr[1]===undefined) return value;
            arr[1]=arr[1].replace(/'/g,"");
            value[arr[0]]=arr[1];
            return value;
        },{})
    }
}