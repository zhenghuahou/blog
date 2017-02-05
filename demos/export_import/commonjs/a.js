exports.done = false;
console.log('a.js 执行开始------>');
var b = require('./b.js');
console.log('在 a.js 之中，b = %j', b);
exports.done = true;
console.log('a.js 执行完毕<------');