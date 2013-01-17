# Jasync Javascript异步类库 #

**Jasync** 是一个简单的javascript异步编程工具库，其实现参考 **Promise/A** 其使用类似于jquery中的 **Deferred** 对象。

jasync可以用于服务器端和浏览器端 Jasync目前正在完善中。

## 在Node中使用 ##
通过如下命令安装jasync.

> npm install jasync

然后可以通过如下方式引用jasync.

> var jasync = require("jasync");


## 一切就绪，您现在就可以开始使用jasync了 ##

如下代码模拟一个耗时的操作

> function printnum(num)  {
>      var _j = new jasync();
> 
>      var print = function (i) {
>          try {
>              setTimeout(function () {
>                  console.log(i);
>                  _j.resolve(i);
>              }, 3000);
>          }
>          catch (err) {
>              _j.reject(err);
>          }
>      }
>      console.log("function already run!")
>      print(num);
> 
>      return _j
>  };

方法返回一个 **jasync** 对象，我们可以通过如下方法使用 **then** 来注册该函数执行完之后的操作, **then** 包含两个参数，一个是执行成功 **resolve** 一个是执行失败
**reject**



>   printnum(1010).then(

>     function (d) {
>         console.log("first successfully! result is " + d);
>     },
>     function (e) {
>         console.log("Error！")
>     }
>    )

##缺少的功能##

jasync目前缺少when等函数

