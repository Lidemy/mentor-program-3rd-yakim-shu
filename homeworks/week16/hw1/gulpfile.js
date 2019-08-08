const gulp = require('gulp'); // 將 node_modules 的檔案載入
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', () => {
  const processors = [
    autoprefixer({ browsers: ['last 2 version'] }),
  ];
  return gulp.src('./scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(
      { outputStyle: 'expanded' },
    ).on('error', sass.logError))
    .pipe(postcss(processors)) // 將 PostCSS 插入流程
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./scss/*.scss', ['sass']);
});
