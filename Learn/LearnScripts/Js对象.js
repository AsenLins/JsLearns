var str="hello world";
var num=3;
console.log(typeof str);
console.log(typeof num);

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
