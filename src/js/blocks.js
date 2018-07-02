// делает inlude для всех js файлов в папке blocks
var context = require.context("../blocks", true, /\.js$/);
var obj = {};
context.keys().forEach(function (key) {
    obj[key] = context(key);
});