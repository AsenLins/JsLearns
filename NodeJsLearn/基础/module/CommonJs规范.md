# CommonJs规范

CommonJs是Node的模块规范，而Node程序是由一个个模块组成，每个模块都有独立的**作用**通过module.exports属性暴露出去的属性/方法提供给外部访问，通过require命令去请求module.exports暴露的属性/方法。

> CommonJs规范加载模块的方式是同步的,AMD规范加载模块的方式是异步的。

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

Node通过require命令去加载模块的exprots，并且相同的模块只会加载一次，然后就会缓存。

require加载规则：
- /开头则加载绝对路径
- /.开头则加载相对路径
- 不加开头则默认会在npm包里找（npm_moudle）
- 



### require加载模块会有缓存

```
require("./moduleA").a;
require("./moduleA").a=10;
/*输出10*/
console.log(require("./moduleA").a);

```

### require删除缓存

```
delete require.cache[moduleName];
```


### require的main属性：

可用于判断模块是被调用，还是入口函数。

```
if(require.main === module){
    console.log("当前模块是主模块");
}
```


### require的加载机制：
require会输出当前exprots的副本值，一旦当前模块被require请求并且输出后，模块内部就再也不会影响到require的值。

moduleA:
```
var name="Asen";

function changeName(){
    name="change Asen";
}

module.exports.name=name;
module.exports.changeName=changeName;

```

main:

```
var name=require("./moduleA").name;
var changeName=require("./moduleA").changeName;
changeName();

/*值一人是Asen*/
console.log(name);

```




