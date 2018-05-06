/*
工厂方法模式 

通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例,

小结：
主要用于相同业务类型，但是实现不一样的时候。

*/
/*实现形式一*/
class HeroAbstractClass{
    superPower(){
        return new Error("hero must have super power!");
    }
}


class HeroFactoryAbstractClass{
    create(){
        return new Error("hero factory must have create!");
    } 
}


class SuperManFactory extends HeroFactoryAbstractClass{
    create(){
        return new SuperMan();
    }
}

class SuperMan extends HeroAbstractClass{
    superPower(){
        console.log("my super power is fly");
    }
}

class SuperWomenFactory extends HeroFactoryAbstractClass{
    create(){
        return new SuperWomen();
    }
}

class SuperWomen extends HeroAbstractClass{
    superPower(){
        console.log("my super power is attack");
    }
}


var manFactory=new SuperManFactory();
var man=manFactory.create();

var womenFactory=new SuperWomenFactory();
var women=womenFactory.create();

man.superPower();
women.superPower();



/*实现形式2 */
class Hero2{
    superPower(){
        return new Error("hero2 must have super power");
    }
}
class SuperMan2 extends Hero2{
    superPower(){
        console.log("superMan2 superPower is fly");
    }
}

class SuperWomen2 extends Hero2{
    superPower(){
        console.log("superWomen2 superPower is attack");
    }
}

class Hero2Factory{
    static SuperMan2(){
        return new SuperMan2();
    }
}

var superMan2=Hero2Factory["SuperMan2"]();
superMan2.superPower();