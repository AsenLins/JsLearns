/*
组合模式

又称部分-整体模式，将对象组合成树形结构以表示“部分整体”的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。


*/



class News{
    constructor(){
        this.child=[];
        this.element=null;
    }

    init(){
        return new Error("please rewrite init");
    }

    add(){
        return new Error("please rewrite add");
    }

    getElement(){
        return new Error("please rewrite getElement");
    }
}


class Content extends News{
    constructor(id,parent){
        super();
        this.id=id;
        this.parent=parent;
        this.init();
    }

    init(){

    }

    add(child){
        this.child.push(child);
        return this;
    }

    getElement(){
        return this.child;
    }
}

var myNew=new Content("asenId","k");
myNew.add("333").add({
    "asen":"123", 
    "age":1

});

console.log(myNew);
console.log(myNew.child);


class Form{
    constructor(){
        this.child=[];
        this.element=null;
    }

    add(){
        throw new Error("方法add必须实现");
    }
}

class FormGroup extends Form{
    constructor(){
        super();
    }
    add(element){
        this.child.push(element);
        return this;
    }
}

class FormItem extends Form{
    constructor(){
        super();
    }
    add(formControl){
        
    }
}


class FormControl{
    constructor(){
        this.name="";
        this.type="";
        
    }
}

class input extends FormControl{
    constructor(){
        super();
    }
}




