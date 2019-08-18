## 作業規範
gulp 就是用來把原本的工作流程自動化的，現在請你寫一個 gulp 的設定檔，依序完成以下事情：

1. 把 scss 編譯成 css
2. 把 js 用 babel 轉成 ES5 語法
3. 把 css 以及 js 壓縮

---

## 開始動工

### 1. 把 scss 編譯成 css => task: sass

因為 week16 作業有寫過編譯 SCSS ，直接拿來用

### 2. 把 js 用 babel 轉成 ES5 語法 => task: babel

1. 找到 [gulp-bael](https://www.npmjs.com/package/gulp-babel)，安裝最新的 Babel 7
2. 直接 copy 上面的範例，丟進一個名為 `babel` 的 task

#### ☞ 新增一個 default task => task: default
- 要跑的任務為 `['sass', 'babel']`

```javascript
gulp.task('default', ['sass', 'babel']);
```

#### ☞ 監測檔案更新： gulp watch
- gulp 可以監測檔案，一更新就自動 run task
- `gulp.watch(<file>, [<task-name>]);`

```javascript
gulp.watch('./src/scss/*.scss', ['sass']); // => watch scss
gulp.watch('./src/js/*.js', ['babel']); // => watch js
```


### 2. 把 css 以及 js 壓縮

1. CSS 用 `gulp-cssnano` 壓縮
2. JS 用 [`gulp-minify`](https://www.npmjs.com/package/gulp-minify)
    - 也是照官網步驟
    - 因為目前只有一個檔案，如果更多檔案的話可以用 `gulp-concat` 結合成一支 js
    - 要是想搞剛的話可以用 `gulp-uglify` 把 js 弄亂
    
---

### 成品 gulpfile.js


```javascript
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
        presets: ['@babel/env']
    }))
    .pipe(minify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
  gulp.watch('./src/js/*.js', ['babel']); // => 監測 js 檔案更新
});

// default task
gulp.task('default', ['sass', 'babel']);
```