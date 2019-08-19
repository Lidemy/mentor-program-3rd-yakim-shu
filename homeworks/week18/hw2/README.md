## 作業規範
Webpack 的目的其實就是讓前端也能夠像 Node.js 那樣，支援 module.exports 以及 require。

為了讓你體驗 Webpack，在這個作業中你只要做以下簡單的幾件事情就好：

1. 寫一個檔案叫做 utils.js，裡面有一個叫做 add 的 function
2. 寫一個檔案叫做 index.js
3. 在 index.js 裡面引入 add 這個 function 並且輸出add(10, 3)
4. 用 Webpack 把以上檔案打包產生出 bundle.js
---

## 行前準備: 先學習 webpack 基本用法

以下照著 [Webpack教學 (一) ：什麼是Webpack? 能吃嗎？](https://medium.com/@Mike_Cheng1208/%E4%BB%80%E9%BA%BC%E6%98%AFwebpack-%E4%BD%A0%E9%9C%80%E8%A6%81webpack%E5%97%8E-2d8f9658241d) 步驟執行：

安裝 webpack & 新增 `webpack.config.js`
```shell
// 安裝 webpack
npm install webpack webpack-cli --save-dev

// 建立 webpack 設定檔
touch touch webpack.config.js  
```


#### 編輯 `webpack.config.js` 設定檔內容

```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

#### config 解析
- entry：是我們的進入點，我指定路徑是 index.js
- output：打包輸出後的檔案，檔名在index後面加了個bundle，來確認它是打包過後的檔案。

然後我們在 `package.json` 之中的 `script` 的部分加入 

```javascipt
"build": "webpack"
```


最後在 CLI 輸入：
```shell
npm run build
```

大功告成

---

## 大概掌握了基本語法，開始動工

基本上作業需求就是照官網範例，很簡單。


### 遇到的問題：

#### ☞ Q：可以成功編譯成 bundle.js，但 utils.js 的 module 好像沒有引入成功？
    
後來發現是成功的，只是 `console.log` 沒有辦法在瀏覽器的主控台出現，不知道為什麼 QQ

但直接把 `add(10, 3)` 輸出到 DOM 裡就可以。


#### ☞ Q: `index.js` 更新需要自己編譯很麻煩，想要引入 gulp watch，有更新立刻執行 webpack

1. 把 hw1 的 `gulpfile.js` 設定檔丟進來
2. 找資料看怎麼把 webpack 變成一個 task
    - 參考：[<27 - 番外篇 01> webpack 與 gulp 聯手 - 安裝 gulp](https://ithelp.ithome.com.tw/articles/10187642)

#### ☞ Q: 做到一半覺得好麻煩，想想難道 webpack 沒有 watch 功能嗎？

找了一下真的有，參考：[Webpack教學 (三)：教你如何用 Watch 來進行開發](https://blog.yottau.com.tw/2018/11/15/webpack%E6%95%99%E5%AD%B8-%E4%B8%89%EF%BC%9A%E6%95%99%E4%BD%A0%E5%A6%82%E4%BD%95%E7%94%A8-watch-%E4%BE%86%E9%80%B2%E8%A1%8C%E9%96%8B%E7%99%BC/)

結果 watch js 根本超簡單，只要在 `package.json` 的 `script` 加上

```javascript
"watch": "webpack --watch"
```

接下來執行只要輸入 : 
```shell
npm run watch
```

**大功告成 🙌**

---
## 其他注意事項

#### Export Mode
`webpack.config.js` 要是沒有設置 mode 會出現警告訊息，可以改成 `development` or `production`，詳細資料參考官網：[Mode](https://webpack.js.org/configuration/mode/)

- production ：上線版本，需要將檔案給壓縮跟優化
- development：開發中，只編譯

