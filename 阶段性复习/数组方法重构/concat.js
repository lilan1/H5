var arr = [1,2,3,4,5,6]
var arr1 = [10,20,30,40,null]

console.log(arr.concat(arr1,100,200,null));
console.log(concat(arr,arr1,100,200,null));

function concat(arr){
    var arr_new=[];
    for(let i=0;i<arr.length;i++) arr_new[i] = arr[i]
    for(let i=1;i<arguments.length;i++){
        if(arguments[i].constructor===Array){
            for(let j=0;j<arguments[i].length;j++){
                arr_new.push(arguments[i][j])
            }
        }else{
            arr_new.push(arguments[i])
        }
    }
    return arr_new
}



// 没有考虑到添加元素为null的情况，如果是null就会报错
function concat(arr){
    var arr_new=[];
    for(let i=0;i<arr.length;i++) arr_new[i] = arr[i]
    for(let i=1;i<arguments.length;i++){
        if(arguments[i] != null&& arguments[i].constructor===Array){
            for(let j=0;j<arguments[i].length;j++){
                arr_new.push(arguments[i][j])
            }
        }else{
            arr_new.push(arguments[i])
        }
    }
    return arr_new
}
