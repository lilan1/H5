function yueshu(num1,num2){
    if(num1<num2){
        var temp = num1;
        num1=num2;
        num2=temp;
    }
    if(num1%num2 !=0)  var result = yueshu(num1%num2,num2);
    else return num2;
    return  result
}
console.log(yueshu(12,18));