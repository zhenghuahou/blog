// exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a);
// exports.done = true;
console.log('b.js 执行完毕');


exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};

console.log(" ---------------> in b.js")