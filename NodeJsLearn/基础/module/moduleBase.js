var jquery=require("jquery");
var moduleA=require("./moduleA");
var moduleB=require("./moduleB");





console.log("========每个模块都有module对象，这个对象是由内置构造函数module创建的========");
console.log("id:",module.id);
console.log("filename:",module.filename);
console.log("loaded",module.loaded);
console.log("parent",module.parent);
console.log("children",module.children);
console.log("exports",module.exports);



console.log("========require对象========");
console.log("require.cache:",require.cache);
console.log("require.main:",require.main);
console.log("require.extensions:",require.extensions);


console.log("========测试的输出========");

if(module.parent==null){
    console.log("当前是入口脚本");
}

console.log("this is moduleB.sex:",moduleB.sex);
console.log("this is moduleB.age:",moduleB.age);
