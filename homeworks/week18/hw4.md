# hw4: 簡答題

## gulp 跟 webpack 有什麼不一樣？我們可以不用它們嗎？

#### gulp 
是把一些任務自動化，像是：壓縮圖片、移動檔案、compile css、轉換 JavaScript、minify js or css
- webpack 也可以當成 gulp 的任務之一

#### webpack 
是你可以用 **import 把資源加載進來，連圖片或是 css 也可以**，因此也可以做到 compile css、轉換 JavaScript 等等
- node.js 也辦不到 import 圖片 & CSS
- webpack 把所有東西都視作一個資源
 
 ---
  
## hw3 把 todo list 這樣改寫，可能會有什麼問題？
  
#### 不必要的渲染
因為是檔案一有更動就會重新渲染整個 todo-list ( Reflow )，在頁面效能優化來看不是很理想，較好的作法應該是指渲染修改的地方（ 其他元素位置不動的前提下 ）
  
  
----  
## CSS Sprites 與 Data URI 的優缺點是什麼？
## CSS Sprites 是什麼？
是一種將多張背景圖片合併成一張的技術，目的在於減少 Request，加快網頁載入速度。


#### 搭配工具
- Compass
    - [利用 Compass 自動合併小圖為 CSS Sprite 圖片及生成對應語法](https://terryl.in/zh/compass-generate-css-sprite-for-icons/)
- sass
- gulp
- 線上生成工具
- webpack
    - 參考：[使用 Sprite-Smith-Plugin 產生 CSS Sprite](https://ithelp.ithome.com.tw/articles/10201033?sc=iThelpR)

#### Sprites 的優點
- 很簡單，就是降低載入圖片的 HTTP 的請求（Request）數量。
- 一張圖片可以同時載入很多小 icon，所以不會給使用者每個 icon 載入時間不同的體驗
    
#### Sprites 的缺點
- 也滿顯而易見的，就是**很難製作及維護**，如果沒有一套工具輔助下，手動修改非常麻煩、也會被設計師討厭
    - 通常像是社群軟體的 icon 一定會做成 CSS Sprites，因為圖片寬高一致，其實還滿方便的，CSS 也只要改個 `background-position-x` or `background-position-y` 就好，但如果是各種不同尺寸的圖片，要集結成一張 Sprite，沒有工具下輔助是不太現實的。
- 要顧及到高解析度螢幕的情況下就會變得很複雜
    - 可以用 [SVG Sprites](https://segmentfault.com/a/1190000016476981) 解決
- 如果是手工的情況下
    - 只要其中一張圖片需要更改，就得全部更動，包括 CSS 也是
    - 圖片尺寸要掌握的很精確， 1px 沒對好就容易露餡
   
參考資料：
- [css sprite原理优缺点及使用](https://www.cnblogs.com/mofish/archive/2010/10/12/1849062.html)
 
----

## Data URI 是什麼？
Data URI 是一種**檔案格式，其資料全部都是經過 base64 編碼之後，以文字的方式來儲存**的，這樣以文字方式儲存的好處就是可以直接寫進 HTML 或 CSS 中，不需要透過外部的檔案儲存。

通常會拿來處理圖片，減少 Request 數量。

#### 如何取的 Base64 編碼結果：
- 工具網站：[dataurl.net](http://dataurl.net/#dataurlmaker)
- PHP： PHP 內建的編碼函數 `base64_encode()`
    - 甚至可以用 PHP 寫 CSS，參考 [CSS Variables with PHP](https://css-tricks.com/css-variables-with-php/)，但這樣寫到底有沒有提升效能，還不得而知

#### Data URI 的優點：
- 也是減少 HTTP 的請求（Request）數量。

#### Data URI 的缺點：
- 無法 Cache : 因為不是透過 Request 下載資源，所以也無法做快取。
- 易讀性差 : 不像載入圖片時，很清楚檔名相關內容
- 編碼後的大小會比原本的檔案還大



參考資料：
- [使用 DATA URI 將圖片以 Base64 編碼並內崁至網頁中，加速載入速度](https://blog.gtwang.org/web-development/minimizing-http-request-using-data-uri/)
- [Data URI 前端優化](https://medium.com/cubemail88/data-uri-%E5%89%8D%E7%AB%AF%E5%84%AA%E5%8C%96-d83f833e376d)