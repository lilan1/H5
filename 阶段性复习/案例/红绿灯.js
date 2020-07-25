function setLight(){
    arguments[0](arguments[1],arguments[2])
}

var id;

function redLight(fn,fn2){
    clearInterval(id)
    console.log("红灯");
    id = setInterval(fn,2000,fn2,arguments.callee)
}

function yellowLight(fn,fn2){
    clearInterval(id)
    console.log("黄灯")
    id = setInterval(fn,2000,fn2,arguments.callee)
}

function greenLight(fn,fn2){
    clearInterval(id)
    console.log("绿灯");
    id = setInterval(fn,2000,fn2,arguments.callee)
}

setLight(redLight,yellowLight,greenLight)