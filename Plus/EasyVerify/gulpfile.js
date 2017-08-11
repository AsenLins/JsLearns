var gulp = require('gulp');
var connect=require('gulp-connect');

/*监测Js文件并且自动刷新浏览器*/
gulp.task("jsListen",function(){
  console.log("开始监听Js文件，并自动刷新");
  gulp.src("dist/*.js")
      .pipe(connect.reload());
});

gulp.task("htmlListen",function(){
  gulp.src("demo/*.html")
      .pipe(connect.reload());
});


gulp.task("connectServerStart",function(){
  console.log("开启监听js服务");
  connect.server({
    livereload:true
  });
});

gulp.task("watch",function(){
  gulp.watch("dist/*.js",["jsListen"]);
  gulp.watch("demo/*.html",["htmlListen"]);

});


gulp.task('taskStart',["watch","connectServerStart"]);
