
/*
工厂方法

就是把多个相同的类的属性和方法抽象成一个工厂方法，工厂方法内部可以再对这些类进行不同的加工

用于创建单种类型的对象。
*/

class FactoryBuilder{
    /*直接在Class中写的方法其实就是放在原型prototype中 */
    ready(){
        console.log("HeroFactory:","is ready");
    }
}

/*定义类的原型方法*/
Object.assign(FactoryBuilder.prototype,{
    create(name,power,age){
    
        var hero=new Object();
        hero.type="hero";
        hero.name=name;
        hero.power=power;
        hero.age=age;
    
        switch(name){
            case "man":
                hero.name="superMan";
                hero.superPower="killAll";
            break;
            case "women":
                hero.name="superWomen";
                hero.superPower="biu biu biu";
            break;
        }
    
        return hero;
    }


})

var HeroFactory=new FactoryBuilder();
HeroFactory.ready();
var man=HeroFactory.create("man","fly",18);
var women=HeroFactory.create("women","attack",27);
console.log(man);
console.log(women);



/*
//ES5写法
function HeroFactory(name,power,age){
    var hero=new object();
    hero.type="hero";
    hero.name=name;
    hero.power=power;
    hero.age=age;

    switch(name){
        case "man":
            hero.name="superMan";
            hero.superPower="killAll";
        break;
        case "women":
            hero.name="superWomen";
            hero.superPower="biu biu biu";
        break;
    }

    return hero;
}
*/




