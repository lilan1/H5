function jiecheng(num){
    if(num==1) return 1;
    return num*jiecheng(num-1)
}

console.log(jiecheng(4));