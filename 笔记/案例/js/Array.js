export default class Arrays{
    // 可以赋初值
    // constructor(a,b,c=3){
    // }

    // 定义类似Math.PI
    static PI = 3.1415926535

    // 在类中定义变量的时候，如果不加static的话。意味着只有类本身能够调用

    // 在静态方法中，理论上不能使用this，绝对不能使用
    // 实际上，在静态方法中，this就是当前的类型名
    


    // 输出多个参数的形参
    // ...参数允许有不定数量的数据，arg最后是一个数组
    // constructor等同于类名
    // 构造函数中不能使用return返回，构造函数中会自动返回this
    // 构造函数中的this就是实例化完成的对象 
    
    constructor(a,b,...arg){

    }
    /* 
    ...语法的用处：
    1. var o = {...obj}浅复制
    缺陷：如果o本身有值，则会将原本的值给覆盖
    相当于重新创建一个对象，并且将obj复制给这个新的对象，不会保留原数据

    */

    // 直接用类名来执行函数方法的
    // Array.from()
    // 这种方法写在类中的时候
    static from(){

    }
    
}