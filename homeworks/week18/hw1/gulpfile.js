const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-minify');

// SCSS: watch & compile & minify
gulp.task('sass', () => {
  gulp.src('./src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
  gulp.watch('./src/scss/*.scss', ['sass']); // => 監測 scss 檔案更新
});

// JS: watch & compile & minify
gulp.task('babel', () => {
  gulp.src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(minify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'));
  gulp.watch('./src/js/*.js', ['babel']); // => 監測 js 檔案更新
});

// default task
gulp.task('default', ['sass', 'babel']);
