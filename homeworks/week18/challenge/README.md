# 挑戰題： webpack

### 作業規範
把我們用 Gulp 做的事情：

1. 把 scss 編譯成 css
2. 把 js 用 babel 轉成 ES5 語法
3. 把 css 以及 js 壓縮

全都改成用 Webpack 來做。

---

## 編譯 SASS => CSS

照這個範例做：[Webpack 4 打包 Sass to Css 範例](https://blog.johnwu.cc/article/webpack-4-sass-to-css.html) => 失敗

注意事項：
> 在 module　屬性裡，我們寫的規則大概是這樣的：當遇到要載入 .css 檔案時，先用 css-loader 載入，再用 style-loader 解析，這邊使用的順序很重要，因為 webpack 會反向使用它們。

webpack 因為版本不同，網路上的教學方法都差滿多的，建議找最新的來看，像很多教學都有的 `extract-text-webpack-plugin` 已經不敷使用了，建議改用 [`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin)

照著官網文件 [sass-loader](https://webpack.docschina.org/loaders/sass-loader/) 做，沒有問題可以編譯，但這樣把 CSS 打包在 JS 裡面的方式還滿不習慣，所以想要把 CSS 獨立出來。

#### 將 CSS 獨立出來
中間歷經一番波折，照這個教學 [Webpack4 sass & css](https://medium.com/@mmaarriicckk/webpack4-sass-css-835062e31f6f) 終於搞定。


```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: ['./src/js/index.js', './src/scss/main.scss'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },  
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: './css/[id].css',
    })],
};
```

---

## 編譯 JS => ES5 語法



按照 [`babel-loader`](https://github.com/babel/babel-loader) 文件教學

安裝 babel 等 plugins

```shell
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

在 `rules` 加上一段

```javascript
{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
```


參考資料：
- 什麼是 `loader` ： [新手向 Webpack 完全攻略 (4) – 設定 Loader](https://5xruby.tw/posts/webpack-04/)

## 壓縮 CSS & JS

按照上面的步驟，JS 已經壓縮好了，所以只要專心處理 CSS 就好。

按照[`mini-css-extract-plugin`](https://github.com/webpack-contrib/mini-css-extract-plugin) 文件說明，並沒有壓縮 CSS 的功能，需要再額外安裝其他 plugin。


所以先安裝 [`optimize-css-assets-webpack-plugin`](https://github.com/NMFR/optimize-css-assets-webpack-plugin) 跟 `terser-webpack-plugin`

- 引入兩個 plugin

```javascript
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
```

- `module.exports` 加上 `optimization`

```javascript
optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
}
```

---


## 成品 webpack.config.js 🙌

```javascript
// webpack.config.js

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// webpack4+ 後
module.exports = {
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  mode: 'production',
  entry: {
    main: ['./src/js/index.js', './src/scss/main.scss'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: './css/[id].css',
    })],
};

```