var gulp = require('gulp');
var watch = require('gulp-watch');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify-es').default;
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var scss = require('gulp-sass');

gulp.task('build-main-css', function(){

  var main = gulp.src([
    'src/scss/main.scss',
    'src/scss/forms.scss'
  ])
  . pipe(scss())
  . pipe(cleanCSS())
  . pipe(concat('main.min.css'))
  . pipe(gulp.dest('public/dist/css'));

  return merge(main);
});

gulp.task('build-main-js', function() {

  var authApp = gulp.src([
    'src/js/main.js',
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/dist/js'));

  return merge(authApp);
});

gulp.task('build-auth-js', function() {

  var authApp = gulp.src([
    'src/js/auth.app.js',
  ])
  .pipe(concat('auth.app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/dist/js'));

  return merge(authApp);
});

//Recompile SCSS/JS on save
gulp.task('watch', function(){
  gulp.watch('./src/scss/**/*.scss', gulp.series('build-css'));
  gulp.watch('./src/js/**/*.js', gulp.series('build-js'));
});

//Run a watcher by default
gulp.task('default', gulp.series('watch'));

//Compile all CSS tasks
gulp.task('build-css', gulp.series('build-main-css'));

//Compile all JS tasks
gulp.task('build-js', gulp.series(
    'build-main-js',
    'build-auth-js',
  ));