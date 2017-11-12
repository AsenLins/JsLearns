var gulp=require("gulp"),
    less=require("gulp-less");

gulp.task("PluginLess",function(){

  gulp.src(['src/Plugin/*.less'])
  .pipe(less())
  .pipe(gulp.dest("dist/Plugin"));

});

gulp.task("Ct_CmShopPage",function(){
  gulp.src(['Ct_CmShopPage/src/*.less'])
  .pipe(less())
  .pipe(gulp.dest("Ct_CmShopPage/css"));
});


gulp.task("WatchLess",function(){
  gulp.watch("src/**/*.less",['PluginLess','Ct_CmShopPage']);
  gulp.watch("Ct_CmShopPage/src/*.less",['PluginLess','Ct_CmShopPage']);
});
