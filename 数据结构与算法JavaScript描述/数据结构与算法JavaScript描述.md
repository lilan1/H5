# 第2章 数组

### 使用数组

1. 创建数组

   + 效率最高
   
     ```
     var numbers = [];    //创建一个长度为0数组
     ```
     
   + 构造函数创建
   
     ```
     var numbers = new Array();//一个自然数参数，将作为数组的长度，否则作为数组元素
     ```
   
2. 由字符串生成数组，调用字符串的split方法可以生成数组

   ```
   var sentence = "My name is lilan";
   console.log(sentence.split(" "))
   ```

   运行结果

   ![](D:\GP-2002\数据结构与算法JavaScript描述\img\2-1.png)

3. 对数组的整体性操作

   + 使用for循环遍历copy数组的时候，只是复制的数组的引用，是浅复制

     ```
     var arr = [1,2,3,4,5,6];
     var arr_new = arr;
     ```

   + 使用for循环遍历arr的值，将arr的值分别对应赋给arr_new就可以达成深复制

   + 将一个数组整体复制给另一个数组、打印数组，是数组的两种整体性操作

###  存取数组

1. 查找元素
   + indexOf()，查找传进来的参数在目标数组中是否存在
     + 包含返回索引，不包含返回-1
     + 如果数组中有多个相同元素，该函数总是会返回第一个与参数相同的元素的索引
   + lastIndexOf()，从后向前查找传进来的参数在目标数组中是否存在
2. 数组的字符串表示
   + join()，返回一个包含数组所有元素的字符串，元素之间用“，”分隔
   + toString()，控制台打印的时候，会调用toString()
3. 由已有数组创建新数组
   + concat()，合并多个数组创建一个新数组
   + splice()，截取一个数组的子集创建一个新数组

### 可变函数

1. 为数组添加元素
   + push()，将一个元素添加到数组的末尾
   + unshift()，将元素添加到数组的开头，可以同时又多个参数，为数组添加多个元素
2. 从数组中删除元素
   + pop()，删除数组末尾的元素，返回被删除的元素
   + shift()，删除数组开头的元素
3. 从数组中间位置添加和删除元素
   + splice()，参数：起始索引，需要删除的元素个数，添加的元素
4. 为数组排序
   + reverse()，数组的反转
   + sort()，数组排序，可以是数字，也可以是字母

### 迭代器方法

1. 不生成新数组的迭代器方法

   + forEach()    该方法接收一个函数作为参数，对数组中的每个元素使用该函数

   + every()    该方法接收一个返回值为布尔类型的函数，对数组中的每个元素使用该函数，如果对于所有的元素，该函数均返回true，则该方法返回true

   + some()，该方法接收一个返回值为布尔类型的函数，只要有一个元素返回true，该方法返回true

   + reduce()，该方法接收一个函数，返回一个值，该方法会从一个累加开始，不断对累加值和数组中的后续元素调用该函数，直到数组中的最后一个元素，最后返回得到累加值

     还可以用来将数组中的元素连接成一个字符串

   + reduceRight()，从右向左执行reduce

2. 生成新数组的迭代器方法

   + map()，和forEach()有点像，但是map返回一个新的数组，该数组中的元素是对原有元素执行某个函数的结果
   + filter()，和every()类似，传入一个返回值为布尔类型的函数，和every不同的是，当对数组中的所有元素应用该函数，结果均为true的时候，该方法并不返回true，而是返回一个新的数组，该数组包含了应用该函数后结果为true的元素

### 二维和多维数组

1. 创建二维数组，为Array增加一个方法，设定了数组的行数、列数和初始值

   ```
   Array.matrix = function(numrows,numcols,initial){
   	var arr = [];
   	for(var i = 0; i<numrows;i++){
   		var columns = [];
   		for(var j = 0;j<numcols;j++) columns[j] = initial;
   		arr[i] = columns;
   	}
   	return arr;
   }
   ```

   

2. 处理二维数组的元素：按列访问、按行访问

3. 参差不齐的数组：指的是数组中每行的元素数量不一致

### 对象数组

### 对象中的数组



# 第3章 列表

```
function List(element,after,position) {
	this.listsize = 0;
	this.pos;
	this.dataStore = [];

	this.length();    // 返回列表的长度             
	this.clear();    // 清空列表           
	this.toString();    // 返回列表的字符串形式
	this.getElement();    // 返回当前位置的元素
	this.insert(element, after);    // 在现有元素后面插入新元素
	this.append(element);    // 在列表的末尾添加新元素
	this.remove();    // 在列表中删除元素
	this.front();    // 将列表的当前位置移动到第一个元素
	this.end();    // 将列表的当前位置移动到最后一个元素
	this.prev();    // 将当前位置后移一位
	this.next();    // 将当前位置前移一位
	this.currPos();    // 返回列表的当前位置
	this.moveTo(position);    // 将当前位置移动到指定位置

	// 辅助方法
	this.find();
}


List.prototype = {

	// 返回列表的长度
	length: function () {
		return this.listsize;
	},

	// 清空列表
	clear: function () {
		delete this.dataStore;
		this.dataStore = [];
		this.listsize = this.pos = 0;
	},

	// 返回列表的字符串形式
	toString: function () {
		return this.dataStore;
	},

	// 向列表末尾添加元素
	append: function (element) {
		this.dataStore[this.listsize++] = element;
	},

	// 返回当前位置的元素
	getElement: function () {
		return this.dataStore[this.pos];
	},

	// 在现有元素后面插入新元素
	insert: function (element, after) {
		var insertPos = this.find(after);
		if (insertPos > -1) {
			this.dataStore.splice(insertPos + 1, 0, element)
			++this.listsize;
			return true;
		}
	},

	// 在列表中删除元素
	remove: function (element) {
		var foundId = this.find(element);
		if (foundId > -1) {
			this.dataStore.splice(foundId, 1);
			--this.listsize;
			return true;
		}
		return false;
	},

	// 辅助方法，在列表中找到element
	find: function (element) {
		for (var i = 0; i < this.dataStore.length; i++) {
			if (this.dataStore[i] == element) return i;
		}
		return -1;
	},

	// 将列表的当前位置移动到第一个元素
	front: function () {
		this.pos = 0;
	},

	// 将列表的当前位置移动到最后一个元素
	end: function () {
		this.pos = this.listsize - 1;
	},

	// 将当前位置后移一位
	prev: function () {
		if (this.pos > 0) --this.pos;
	},

	// 将当前位置前移一位
	next: function () {
		if (this.pos < this.listsize - 1) ++this.pos;
	},

	// 返回列表的当前位置
	currPos:function(){
		return this.pos;
	},

	// 将当前位置移动到指定位置
	moveTo:function(position){
		this.pos = position;
	}

}
```



# 第4章 栈

```
function Stack(element){
	this.dataStore = [];
	this.top = 0;

	this.push(element);    //将一个元素压入栈中
	this.pop();     //从栈顶弹出元素并返回
	this.peek();        //返回栈顶的元素不弹出
	this.clear();   //清空栈
	this.length();      //返回栈长
}

Stack.prototype = {

	//将一个元素压入栈中
	push:function(element){
		return this.dataStore[this.top++] = element;
	},

	//从栈顶弹出元素并返回
	pop:function(){
		return this.dataStore[--this.top];
	},

	//返回栈顶的元素不弹出
	peek:function(){
		return this.dataStore[this.top-1];
	},

	//清空栈
	clear:function(){
		delete this.dataStore;
		this.dataStore = []
		this.top = 0;
	},

	//返回栈长
	length:function(){
		return this.top;
	}
}
```







