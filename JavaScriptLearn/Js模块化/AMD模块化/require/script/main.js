require.config({
  baseUrl:"demoScript",
  paths:{
    "first":"first",
    "two":"two",
    /*
    "first":"../demoScript/first",
    "two":"../demoScript/two",
    */
  }
});

require(["first","two"],function(first,two){
  first.Response();
  two.Response();
  alert("??");
  console.log(window);
});
