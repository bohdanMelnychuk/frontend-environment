var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var axis = require('axis');
var lost = require('lost');
var postcss = require('gulp-postcss')
var rupture = require('rupture');
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
  return gulp.src('app/stylus/main.styl')
    .pipe(stylus({
      use: [nib(), axis(), rupture()]
    }))
    .pipe(postcss([
      lost()
    ]))
    .pipe(gulp.dest('dest/css'));
});

gulp.task('watch', function() {
  gulp.watch('app/stylus/**/*.styl', ['styles']);
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'dest'
  });

  browserSync.watch('dest/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', ['watch', 'serve']);
gulp.task('build', ['styles']);
gulp.task('default', ['build']);
