function fn1(fn,i,sum){
    if(i===undefined) i=1,sum=1;
    i++;
    if(i>100) return sum;
    return fn(arguments.callee,i,sum)
}

function fn2(fn,i,sum){
    sum += i;
    return fn(arguments.callee,i,sum)
}
console.log(fn1(fn2));