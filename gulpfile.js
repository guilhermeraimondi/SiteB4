var gulp = require('gulp');
var image = require('gulp-imagemin');

gulp.task('default',['image']);


gulp.task('image', function() {
  gulp.src(['assets/img/*'])
  .pipe(image({
    progressive: true,
    svgoPlugins: [
    {removeViewBox: false},
    {cleanupIDs: false}
    ]
  }))
  .pipe(gulp.dest(['assets/img-min']));
});