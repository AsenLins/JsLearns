# CommonJs规范

CommonJs是Node的模块规范，而Node程序是由一个个模块组成，每个模块都有独立的**作用**通过module.exports属性暴露出去的属性/方法提供给外部访问，通过require去请求module.exports暴露的属性/方法。

## module

每一个模块都有一个内置对象**module**，它是由node内置的构造函数module实例的。

```
var name = "Asen";

/*暴露模块属性name供外部访问*/
module.exports.name=name;

/*这种方法等同于module.exports.age*/
exprots.age=12;

```

module对象有一些属性可供访问：

- module.id：模块标识符(带绝对路径的模块名)。
- module.filename：模块路径，绝对路径。
- module.loaded：表示模块是否加载完成。
- module.parent：返回一个调用该模块的对象。
- module.children：返回一个当前模块调用其他模块的数组。
- module.exports:返回一个当前模块暴露的属性值。

```
console.log("id:",module.id);
console.log("filename:",module.filename);
console.log("loaded",module.loaded);
console.log("parent",module.parent);
console.log("children",module.children);
console.log("exports",module.exports);

```

## require

每个模块都有一个内置





