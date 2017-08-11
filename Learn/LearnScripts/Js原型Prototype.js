function dc(){
  this.a=10;
  console.log("cool");
}

console.log(dc);

console.log(typeof dc)
console.log(dc.prototype);
console.log("=======对象名称========");
console.log(typeof Function);
console.log(Function instanceof Object);
console.log(dc instanceof Object);
console.log(dc.prototype);

console.log("开始回调");
for(var i in dc.prototype){
  console.log(i);
}


/*创建一个没有原型对象的对象*/
var obj=Object.create(null);
console.log(obj);


/*创建原型与目标关联的对象*/
var obj={
  a:10
}
var objCreate=Object.create(obj);
console.log(objCreate.a);

/*原型特性*/
/*1. 优先访问对象自己内部属性*/
var objAttr={
  a:1
};

var objAttrTest=Object.create(objAttr);
objAttrTest.a=20;

console.log(objAttrTest.a);

/*隐式屏蔽*/
var hideObj={
  a:20
};
var hideTest=Object.create(hideObj);

console.log(hideObj.hasOwnProperty("a"));
console.log(hideTest.hasOwnProperty("a"));

hideTest.a++;
console.log(hideTest.hasOwnProperty("a"));



function CreateObj(){
  this.a=10;
}




console.log(CreateObj);
CreateObj.prototype.b=10;
console.log(CreateObj);
var newObj=new CreateObj();
console.log(newObj);

var ObjCeate={
  a:10
};
console.log(ObjCeate);
ObjCeate.prototype.b=20;
console.log(ObjCeate);
