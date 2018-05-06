/*
单例模式

又被称为单体模式，是只允许实例化一次的对象类。
有时我们也用一个对象来规划一个命名空间，井井有条地管理对象上的属性与方法。

*/

/*静态变量 */

var Hero=(function(){
    var name="hero is me";
    class Hero{
        constructor(){

        }
        getName(){
            return name;
        }

    }
    return Hero;
})();


var man=new Hero();
console.log(man.getName());


/*命名空间 */

var Tool={
    ajax:function(){

    },
    url:function(){

    }
}

Tool.ajax()

Tool.url();


/*惰性单列*/

var single=(()=>{
    var _instance;
    class mySingle{
        constructor(){
            this.name="asen";
        }
    }
    if(_instance==null){
        console.log("first create");
        _instance=new mySingle();
    }
    return _instance;
})();

console.log(single);
console.log(single);



