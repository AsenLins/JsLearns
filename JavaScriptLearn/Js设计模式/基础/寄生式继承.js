function superClass(){
    this.name="asen";
    this.age=18;
}

superClass.prototype={
    getName:function(){
        return this.name;
    }
}



function sonClass(supers){
    if(supers!=null){
        super.call(this);
    }
    son.sonName="kim";
    son.count=12;
}

function ExtendSuperPrototype(son,supers){
    
    son.prototype=supers.prototype;
    son.constructor=supers
   
}



var mySon=new sonClass(superClass);
ExtendSuperPrototype(superClass);

console.log("cool");


