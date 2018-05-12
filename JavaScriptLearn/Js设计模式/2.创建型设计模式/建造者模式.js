/*
建造者模式 

将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示。
*/

class SuperPower{
    constructor(power){
        this.power=power;
    }

}

class Skill{
    constructor(skill){
        this.Skill=skill;

    }
}

class Hero{
    constructor(name){
        this.name=name;     
    }

}

class HeroBuilder{
    constructor(name,power,skill){
        var hero=new Hero(name);
        hero.Skill=new Skill(skill);
        hero.SuperPower=new SuperPower(power);
        return hero;
    }
}

var man=new HeroBuilder("superMan","fly","biu biu biu");
var women=new HeroBuilder("superWomen","attake","boom");

console.log(man.Skill);
console.log(women);