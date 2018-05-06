
/*原型模式
用原型实例指向创建对象的类，使用于创建新的对象的类共享原型对象的属性以及方法。

好处的就是，只要扩展原型，所有基于同一原型的类都会共享，可以减少实例消耗。

*/
class Hero{
    constructor(){

    }
    superPower(){
        console.log(this.power);
    }

    skill(){
        console.log(this.skillName);
    }
}

class superMan extends Hero{
    constructor(){
        super();
        this.power="fly";
        this.skillName="biu";
    }
}


var man=new superMan();
man.superPower();
man.skill();



/*原型扩展

只要扩展原型，所有继承这个原型的类型都会共享。

*/
Object.assign(Hero.prototype,{
    usePower(powerName){
        if(this[powerName]!=undefined){
            console.log("use the power is",this[powerName]);
        }else{
            console.log("this power does not exist");
        }
    }
});


/*
原型继承


*/