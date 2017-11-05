(function(){
  function other(){

  }

  return {
    other:other
  }
})();

if(window.define){
  console.log("..");
  window.define({

  })
}
else{
  console.log(window);
  console.log("require.js未加载");
}
