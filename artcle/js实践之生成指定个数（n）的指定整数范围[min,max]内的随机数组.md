###js实践之生成指定个数（n）的指定整数范围[min,max]内的随机数组


**图片看不见，可以参照pdf看，或者直接看pdf**

今天在前端早读课看到[这篇文章](http://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651226104&idx=1&sn=295ca768d34ff64fe84051cd3f4f8621&chksm=bd49a67c8a3e2f6aeba91b3dc06f61136b678d305710f6076d034d18365a125064ab4bff7d40&mpshare=1&scene=23&srcid=03073Ff6ATYDayP7TXIE3fcU#rd])

感兴趣就自己试了一下，刚开始代码是如下：
```javascript
function fn(n){
    var min = 2;
    var max = 32;
    // Let n be toUint32(lenValue).
    n = n >>> 0; //负数会变的很大，无符号位右移
    console.log(' arr:',arr,' n:',n);

    var temp = [];
    var arr = new Array(n);
    arr.forEach(function(){
       let r = rd(min,max);
       console.info(arr.length, 'temp.includes(r):',temp.includes(r));
       while(temp.includes(r)){
           console.warn(' temp:',temp,' r:',r);
           r = rd(min,max);
       }
       temp.push(r);
    });
    return temp;
}

function rd(min,max){
   return Math.floor(Math.random()*(max-min+1)+min);
}
```
运行下面这行代码：
`fn(3)`
![Alt text](./1488878113084.png)
arr.forEach并没有执行。
查看forEach和new Array看到有下面2处描述：
![Alt text](./1488878259982.png)

原文：
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach



![Alt text](./1488878346130.png)


原文：
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array


即 new Array(num)，创建的是空位数组，即没有初始化的素组，forEach会跳过空位。 new Array(num)和[undefined]并不一样，可以看下面的例子：
![Alt text](./1488880666215.png)


从forEach的polyfill也可以看出，forEach过滤空位数组：
![Alt text](./1488884993499.png)




其实，阮一峰的es6入门，也有很详情的讲解：
![Alt text](./1488885046256.png)

[原文:数组的空位](http://es6.ruanyifeng.com/#docs/array#数组的空位) 

接着把代码改成如下所示：
``` javascript
function fn(n){
    var min = 2;
    var max = 32;
    // Let n be toUint32(lenValue).
    n = n >>> 0;
    console.log(' arr:',arr,' n:',n);
    var temp = [];
    // var arr = new Array(n);
    var arr = [...new Array(n)];
    arr.forEach(function(){
       let r = rd(min,max);
       console.info(arr.length, 'temp.includes(r):',temp.includes(r));
       while(temp.includes(r)){
           console.warn(' temp:',temp,' r:',r);
           r = rd(min,max);
       }
       temp.push(r);
    });
    return temp;
}

function rd(min,max){
   return Math.floor(Math.random()*(max-min+1)+min);
}
```
但是上面fn还有个问题，就是现在并没有对n，进行判断，如果直接执行`fn(100)`,会直接死循环，因为temp的范围是【2，32】，无论如何都不可能输出100个【2，32]范围里的随机整数，结果在while里面死循环了。接着把代码改成如下所示：
```javascript
function fn(n){
    var min = 2;
    var max = 32;
    //Let n be toUint32(lenValue).
    n = n >>> 0;
    if(n >= max){
        return [];
    }

    var temp = [];
    // var arr = new Array(n);
    var arr = [...new Array(n)];
    arr.forEach(function(){
       let r = rd(min,max);
       while(temp.includes(r)){
           r = rd(min,max);
       }
       temp.push(r);
    });
    return temp;
}

function rd(min,max){
   return Math.floor(Math.random()*(max-min+1)+min);
}
```
运行结果如下所示：
![Alt text](./1488887562311.png)

多执行几次下面这行代码：
```javascript
console.time('b');cc=fn(31);console.info('cc:',cc);console.timeEnd('b')
```

![Alt text](./1488888090676.png)
从执行结果可以看出，当n取最大临界值的时候，有可能用的时间会比较久







**参考链接**：

*. [MDN Array][1] 
*. [MDN forEach][2] 
*. [数组的空位][3] 

[1]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array        "MDN Array"
[2]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach  "MDN forEach"
[3]:http://es6.ruanyifeng.com/#docs/array#数组的空位    "数组的空位"