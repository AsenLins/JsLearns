var gulp=require("gulp"),
    less=require("gulp-less");
    concat=require("gulp-concat");


gulp.task("test",function(){
      gulp.src(['needmin/*.css','needmin2/*.css'])
      .pipe(concat('allcss.css'))
      .pipe(gulp.dest("min/"));
});
