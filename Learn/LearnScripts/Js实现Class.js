/*
显式混入
*/

/*把不存在的属性或方法附加到目标对象中*/
var mixFunc=function(mixObj,targetObj){
  for(var key in mixObj){
    if(!(key in targetObj)){
      targetObj[key]=mixObj[key];
    }
  }
}

var mixObj={
  a:10,
  b:20,
  func:function(param){
    console.log(param);
  },
  funcTwo:function(){
    this.func("i am Father funcTwo");
  }
}

var targetObj={
  c:10,
  d:20
}


mixFunc(mixObj,targetObj);

console.log(targetObj);
mixObj.func("i am mixObj");
targetObj.func("i am targetObj");
targetObj.funcTwo();


/*寄生式继承*/
function ObjCreate(){
  this.a=10
}

ObjCreate.prototype.Func=function(){
  console.log("i am good Father");
}

function Create(){
  var Obj=new ObjCreate();
  Obj.b=10;

  var FuncBackup=Obj.Func;

  Obj.Func=function(){
     FuncBackup.call(this);
     console.log("i am a son");
  }
  return Obj;
}

var PrototypeObj=new Create();
console.log(PrototypeObj);
PrototypeObj.Func();

/*隐式混入*/
 HideObj={
    Go:function(){
      this.count=1,
      this.name="Asen"
    }
}

 HideTestObj={
  Go:function(){
    HideObj.Go.call(this);
  }
}

HideTestObj.Go();
console.log(HideTestObj.count);
