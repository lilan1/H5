export default class Box{
    // default表示默认导入
    a = 10;
    constructor(){
        this.a = a;
        this.elem = this.createElem();
    }
    createElem(){
        var elem = document.createElement("div")
        Object.assign(elem.style,{
            width:"50px",
            height:"50px",
            backgroundColor:"#"+Math.floor(Math.random()*0x).padStart(6,0)
        })
        document.body.appendChild(elem)
        elem.addEventListener("click",e=>this.clickHandler)
        return elem;
    }
    clickHandler(){
        
    }
    
}
export class A{

}