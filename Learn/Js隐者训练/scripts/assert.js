(function(){
  function assert(value,message){
    var li=document.createElement("li");
    if(!value){
      li.style.cssText="margin-top:0.1em; background-color:#CC3333;color:white;";
    }else{
      li.style.cssText="margin-top:0.1em; background-color:#339966;color:white;"
    }
    li.appendChild(document.createTextNode(message));
    document.body.appendChild(li);
  }

  window.assert=assert;

})();
