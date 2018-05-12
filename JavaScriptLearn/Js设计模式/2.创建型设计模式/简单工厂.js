

/* 简单工厂： 
简单工厂，由一个工厂对象创建某一种产品对象的实例，通常都是同一类对象。

用于创建单种类型的对象。
*/


class People{
    constructor(){
        this.hasMoney=true;
        this.type="people"
    }
}

class SuperMan extends People{
    constructor(){
        super();
        this.type="SuperMan";
        this.name="SuperMan"
    }
}

class SuperWomen extends People{
    constructor(){
        super();
        this.type="superWomen";
        this.name="superWomen";
    }
}


function HeroFactory(type){
    switch(type){
        case "man":
            return new SuperMan();
        break;
        case "women":
            return new SuperWomen();
        default:
            return null;
        break;
    }
}


var man=HeroFactory("man");
var women=HeroFactory("women");

console.log(man);
console.log(women);


