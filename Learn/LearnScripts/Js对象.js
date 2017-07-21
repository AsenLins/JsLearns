/*创建对象的形式
1.构造形式创建
2.字面形式创建
3.通过Object.create(prototype, descriptors)方式创建
*/
function FuncObj(){

}

var objCreateTypeOne=new FuncObj();
console.log(objCreateTypeOne);

var objCreateTypeTwo={};
console.log(objCreateTypeTwo);

var objCreateTypeThree=Object.create(null);
console.log(objCreateTypeThree);




/*typeof*/
var str="hello world";
var num=3;
console.log(typeof str);
console.log(typeof num);


/*instanceof*/
var strObj=new String("hello world");
/*输出字符串对象*/
console.log(strObj);

/*输出true*/
console.log(strObj instanceof String);

var strLength="Asen".length;
/*输出4*/
console.log(strLength);

var numFix=123.1.toFixed(2);
/*输出123.00*/
console.log(numFix);

var str_1="Asen";
/*并不是String的对象*/
console.log(str_1 instanceof String);

/*在特定时候会转换为String对象，输出4*/
console.log(str_1.length);

/*使用Object.defineProperty对象的值和特性*/
var testObj={};
Object.defineProperty(testObj,"a",{
  value:10,
  writable:true,
  configurable:true,
  enumerable:true
});

console.log("object的值是："+testObj.a);

/*Obj的get与put*/
var obj={
  a:10
};
obj.b=20;
console.log(obj.a);


/*重写对象属性的getter与setter*/
var getSetObj={
  get a(){
    return this._a_;
  },
  set a(val){
    this._a_=val*2;
    console.log(val);
    //this.a=val*2;
  }
}
getSetObj.a=4;
console.log(getSetObj);
console.log(getSetObj.a);

/*判断Obj是否存在*/
var hasAttrObj={
  a:10,
  b:20
};
console.log(hasAttrObj.c);

console.log("a" in hasAttrObj);

/*判断属性a是否存在*/
console.log(hasAttrObj.hasOwnProperty("a"));
/*判断属性c是否存在*/
console.log(hasAttrObj.hasOwnProperty("c"));



/*
对象枚举
*/
console.log("============对象枚举============");
var emunObj={};
Object.defineProperty(emunObj,"b",{
  enumerable:true
});
Object.defineProperty(emunObj,"a",{
    enumerable:false
});
console.log(emunObj.propertyIsEnumerable("b"));
console.log(emunObj.propertyIsEnumerable("a"));

var forObj={
  a:10,
  b:20
}

for(var key in forObj){

  console.log(key+":"+forObj[key]);
}
