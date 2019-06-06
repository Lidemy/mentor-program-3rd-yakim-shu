## 什麼是 Ajax？

全名為 Asynchronous JavaScript and XML

透過 JS 用 「 非同步 」的方法來傳送資料，就可以解決傳統的表單換頁問題。

當發送一個 request 之後，以下是同步與非同步（ 異步 ）的差別：

- 非同步：
  - 頁面的其他程式並不會停下來，等拿到 response 才繼續執行 callback
- 同步：
  - 在拿到 response 之前，使用者不能對該頁面做任何的存取，頁面會被阻塞。

Ajax 流程：
- 瀏覽器發送一個 **帶上參數** 的 request 到 **一個新的頁面**
- 然後將 Server 回傳的 **「 response 傳給頁面上的 JS 」**



## 用 Ajax 與我們用表單送出資料的差別在哪？

表單：其實跟 JS 並沒有太大關係，是瀏覽器提供的一種發送 request 的方法，收到的 response 會直接渲染在頁面上。

跟 Ajax 的差別：
- 以畫面來說，最大的差別是，送出表單一定會跳轉（當前頁重新整理、換頁）
- 以資料來說，表單並不存在跨域問題。
  - 因為相對於 Ajax，表單送出後刷新頁面，原本頁面的 JS 並沒有辦法拿到 response 的內容，是個相對安全的方法，所以瀏覽器沒有限制跨域。

參考資料：
- [为什么 form 表单提交没有跨域问题，但 ajax 提交有跨域问题？](https://www.zhihu.com/question/31592553)

## JSONP 是什麼？

簡單來說 JSONP 就是 **利用 `<script>` 標籤不受同源限制的特性**，直接載入一隻帶參數的 js，當作是發 request。

實務上在操作 JSONP 的時候，Server 通常會提供一個 callback 的參數讓 client 端帶過去。

缺點是你要帶的那些參數永遠都只能用附加在網址上的方式（GET）帶過去，沒辦法用 POST。

## 要如何存取跨網域的 API？

- JSONP
- CORS 跨來源資源共用
  - 只要 Server 端在 response 的 header 加上一行，就可以允許不同網域的 request 存取 : ```Access-Control-Allow-Origin: *```
- AJAX Proxy
  - 屬於 Server 端的解決方案，簡單來說就是將 web server 當成前端瀏覽器與其它第三方伺服器之間溝通的中介，browser 發送 AJAX request 給 server 端 proxy，proxy 再將 request 轉送給第三方服務並取得內容回傳給前端。
- Fetch 
  - 是一個 HTML5 的 API
  - `fetch()` 方法是一個位於全域 window 物件的方法，它會被用來執行送出 Request 的工作，如果成功得到回應的話，它會回傳一個帶有 Response 的 Promise 物件 ( ES6 )。
      - `.then` : 作為下一步
      - `.catch` : 作為錯誤回應 (404, 500…)
- 非常不正規但很神奇的方法
  - 自架一個開放 CORS 的 Server，用 curl 存取資料（ 非瀏覽器，沒有同源限制 ），再發 request 到自己架的 Server
  - 參考資料：[解決 AJAX 沒辦法取得 CORS（跨網域存取）資料的問題](https://noob.tw/js-cors/)
  

參考資料：
- [JavaScript 前端跨網域存取解決方案](https://tpu.thinkpower.com.tw/tpu/articleDetails/402)
- [AJAX 與 Fetch API](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/ajax_fetch.html)
- [鐵人賽：ES6 原生 Fetch 遠端資料方法](https://wcc723.github.io/javascript/2017/12/28/javascript-fetch/)


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

因為第四週是在 node.js 環境下發 request，並沒有瀏覽器這層限制，跨域問題只存在於透過瀏覽器發送的 request。
