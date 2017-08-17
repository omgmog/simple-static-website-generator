const gulp = require('gulp');
const twig = require('gulp-twig');
const sass = require('gulp-sass');
const replaceExtension = require('gulp-ext-replace');

// sass task, just turns your sass in to css
gulp.task('sass', () => {
  return gulp
    .src('./src/assets/css/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
      .on('error', sass.logError)
    )
    .pipe(gulp.dest('./dist/assets/css/'));
});

// img task, you could add some compression/processing as part of this task
gulp.task('img', () => {
  return gulp
    .src('./src/assets/img/*.*')
    .pipe(gulp.dest('./dist/assets/img/'));
});

// js task, you could start with .ts or something, or transpile from es6 to es5, or do anything you like.
gulp.task('js', () => {
  return gulp
    .src('./src/assets/js/*.*')
    .pipe(gulp.dest('./dist/assets/js/'));
});


// twig task, takes the pages and config data, and then builds html with it
gulp.task('twig', () => {
  let DATA = require('./src/data.json');
  return gulp
    .src('./src/pages/*.twig')
    .pipe(
      twig({
        data: DATA
      })
    )
    .pipe(replaceExtension('.html'))
    .pipe(gulp.dest('./dist/'));
});

// build task runs all of the above
gulp.task('build', ['sass', 'img', 'js', 'twig']);

// watch task will run build when anything in src changes
gulp.task('watch', () => {
  gulp.watch('src/**/*.*', ['build']);
});