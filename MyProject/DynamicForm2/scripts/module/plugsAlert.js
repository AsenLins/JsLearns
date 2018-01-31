define(['sweetalert2'],function(swal){

function _alertHtml(option){
    swal({
    title: option.title,
    /*type: 'info',*/
    html:option.html,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: true,
    reverseButtons: true
  }).then((result) => {
      if(result.value){
        option.success.call(this);
      }
      else{

      }
  });
}


function _alertTip(option){
    swal({
    title: option.title,
    type: option.type,
    text:option.text,
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: true,
    reverseButtons: true
  }).then((result) => {
      if(result.value){
        option.success.call(this);
      }
      else{

      }
  });
}

return{
  alertHtml:_alertHtml,
  alertTip:_alertTip
}




});
