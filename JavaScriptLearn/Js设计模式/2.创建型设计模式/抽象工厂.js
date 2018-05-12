/*
抽象工厂模式

通过对类的工厂抽象使其业务用于对产品类簇的创建，而不负责创建某一类产品的实例

*/

/*抽象工厂类*/
class AbstractHero{
    constructor(){
        if(new.target===AbstractHero){
            throw new Error("this is Abstract Class !");
        }
    }
    superPower(){
        return new Error("hero must have superPower!");
    }
}

class SuperWomen extends AbstractHero{
    constructor(){
        super();
    }
    superPower(){
        console.log("my super power is attak");
    }
}

class SuperMan extends AbstractHero{
    constructor(){
        super();
    }
    superPower(){
        console.log("my super power is fly");
    }
}


class FactoryCreate{
    static superMan(){
        return new SuperMan();
    };
    static superWomen(){
        return new SuperWomen();
    };
    
}


var Hero=FactoryCreate["superMan"]();
Hero.superPower();

Hero=FactoryCreate["superWomen"]();
Hero.superPower();
