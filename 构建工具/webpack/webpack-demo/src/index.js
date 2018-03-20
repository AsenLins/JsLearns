import $ from 'jquery'
import './style.css';
import testImg from './image.gif';
import Data from './data.json'
import printMe from './index2.js'

console.log("cool");
console.log(Data);
console.log("i am asen lins2");
console.log("i am asen lins3");
console.log("i am asen lins4");
console.log("i am asen lins4");
console.log("i am asen lins4");

/*热加载模块*/
if (module.hot) {
  module.hot.accept('./index2.js', function() {
    console.log('i am hot reoload3');
    printMe();
  });
}
