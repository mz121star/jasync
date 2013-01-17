var jsync = require("./jasync.js");
var http = require('http');


/**
 *  test case prepare
 *  */
function printnum(num) {
    var _j = new jsync();

    var print = function (i) {
        try {
            setTimeout(function () {
                console.log(i);
                _j.resolve(i);
            }, 3000);
        }
        catch (err) {
            _j.reject(err);
        }
    }
    console.log("function already run!")
    print(num);

    return _j
};

/**
 * test case "then test" prepare PASSED!
 * */
printnum(1010).then(
    function (d) {
        console.log("first successfully! result is " + d);
    },
    function (e) {
        console.log("Error！")
    }
).
    then(
    function (d) {
        console.log("second successfully! result same as " + d);
    }
);

/**
 * test case "delay" PASSED!
 * */
//var s=new jsync().then(function(d){console.log("user cut :"+d )})
//http.createServer(function (req, res) { }).listen(1666, 'localhost');


/**
 *  test case "when test" prepare FAILED!
 *  */

jsync.when(printnum(100), printnum(1020)).then(function (a, b) {
    console.log("all ops complete " + a + b);
});


/**
 *  test case "always test" prepare  PASSED!
 *  */
//var wait = function () {
//    var _j = new jsync(); // 新建一个Deferred对象
//    var tasks = function () {
//        console.log("执行完毕！");
//        _j.resolve();
//    };
//    setTimeout(tasks,3000);
//    return _j;
//};
//wait().always(function(){console.log("哈哈，成功了！"); });