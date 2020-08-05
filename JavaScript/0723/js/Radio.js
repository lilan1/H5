import CheckBox from "./CheckBox.js"

export default class Radio extends CheckBox{
    name;
    constructor(_label,_name){
        super(_label);
        this.name = _name;
        Object.assign(this.elem.firstElementChild.style,{
            width:"18px",
            height:"18px",
            backgroundPositionX:"-195px",
            backgroundPositionY:"-104px",
        })
        Object.assign(this.elem.lastElementChild.style,{
            top:"-2px"
        })
        this.elem.setAttribute("name",this.name)
    }
    clickHandler(e){
        this.checked = true;
        // 单选框的名字都一样
        let arr = Array.from(document.getElementsByName(this.name));
        for(let i=0;i<arr.length;i++){
            if(arr[i]==this.elem){
                Object.assign(this.elem.firstElementChild.style,{
                    backgroundPositionX:"-175px",
                    backgroundPositionY:"-104px"
                });
            }else{
                Object.assign(arr[i].firstElementChild.style,{
                    backgroundPositionX:"-195px",
                    backgroundPositionY:"-104px"
                })
            }
        }
    }
}