var gulp=require("gulp"),
    less=require("gulp-less");




gulp.task("Ct-Macao",function(){

  gulp.src(["src/*.less","src/**/*.less"])
  .pipe(less())
  .pipe(gulp.dest("dist"));
});

gulp.task("StyleWatch",function(){
  gulp.watch("src/**/*.less",['Ct-Macao']);
  gulp.watch("src/*.less",['Ct-Macao']);
});
