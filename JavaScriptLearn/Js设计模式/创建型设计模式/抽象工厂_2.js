/*抽象工厂*/
class SuperHeroAbFactory{
    superPower(){
        throw new Error("hero must have super power ");
    }
    skill(){
        throw new Error("hero must have skill");
    }
}

class SuperManFactory extends SuperHeroAbFactory{
    constructor(name,power,skillName){
        super();
        this.name=name;
        this.power=power;
        this.skillName=skillName;
    }
    superPower(){
        console.log(this.name," power is ",this.power);
    }
    skill(){
        console.log(this.name," skill is ",this.skillName,"\n");
    }
}

class WonderWomanFactory extends SuperHeroAbFactory{
    constructor(name,power,skillName){
        super();
        this.name=name;
        this.power=power;
        this.skillName=skillName;
    }
    superPower(){
        console.log(this.name," power is ",this.power);
        console.log("WonderWoman Special power is True story noose");
    }
    skill(){
        console.log(this.name," skill is ",this.skillName,"\n");
    }
}

/*test code */
var superMan=new SuperManFactory("Clark Kent","fly","attake");
superMan.superPower();
superMan.skill();

var wonderWoman=new WonderWomanFactory("Diana Prince","jump","defense");
wonderWoman.superPower();
wonderWoman.skill();