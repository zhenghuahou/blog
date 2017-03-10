###webpack 1.X插件调用中的构建流程概述

![图片1](./style/w1.png)

```javascript
//MyPlugin.js
function MyPlugin() {
    // console.info("我是myplugin构造函数")
};

MyPlugin.prototype.apply = function (compiler) {
    var t1 = +new Date;
    var tmake,tcompile,taftercompile,temit,tafteremit,tdone,tafterplugins;
    //执行顺序0
    compiler.plugin('after-plugins',function(){
          tafterplugins = +new Date;
         console.log(tafterplugins,' after-plugins tafterplugins-t1:',tafterplugins-t1,' arguments:',arguments);
    });

    //执行顺序1
    compiler.plugin('compile',function(object){
          tcompile= +new Date;
         console.log(tcompile,' compile tcompile-t1:',tcompile-t1,'arguments:',arguments);
    });
    //执行顺序2
     compiler.plugin('make',function(compilation,callback){
          tmake= +new Date;
         console.log(tmake,' make tmake-t1:',tmake-t1,'arguments:',arguments);
         callback();
         
    });
    //执行顺序3
    compiler.plugin('after-compile',function(compilation,callback){
          taftercompile= +new Date;
         console.log(taftercompile,' aftercompile taftercompile-t1:',taftercompile-t1,'arguments:',arguments);
         callback();
    });

    //执行顺序4
    compiler.plugin('emit',function(compilation,callback){
          temit = +new Date;
         console.log(temit,' emit temit-t1:',temit-t1,'arguments:',arguments);
         callback();
    });
    //执行顺序5
    compiler.plugin('after-emit',function(compilation,callback){
          tafteremit = +new Date;
         console.log(tafteremit,' after-emit tafteremit-t1:',tafteremit-t1,' arguments:',arguments);
         callback();
    });
     //执行顺序6
    compiler.plugin('done',function(){
          tdone = +new Date;
         console.log(tdone,' done tdone-t1:',tdone-t1,' arguments:',arguments);
    });
   
}
module.exports = MyPlugin;


```

运行结果如下所示：
![图片2](./style/w2.png)

即执行时机：
after-plugins-->compile-->make-->aftercompile(多次执行)-->emit-->after-emit-->done
这只是测试这几种常见的时间点，更多其他的时间点，可以看[这里](https://doc.webpack-china.org/api/plugins/)