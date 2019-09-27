## React Router 背後的原理你猜是怎麼實作的？


對於紀錄 URL history 的部分，以往要取得是 call [HTML5 提供的 History API](https://developer.mozilla.org/zh-TW/docs/Web/API/History_API)，例如 `pushState`、`replaceState`... 等等。

而 React Router 應該是把這個 API 包裝起來，結合 Router 提供的 Component 觸發網頁事件（ 例如 `onClick` ），像是 history 紀錄就會丟進 `match` 參數裡，讓操作的部分變得簡易許多，我們只要關心某個按鈕前往的路徑是哪裡，其他的像是上下頁等等的操作 Router 都會包裝好。

簡單來說，History API 像是監視瀏覽紀錄的人員，網址發生變動他都看在眼裡，但你要下指令他才會有動作，要跟他一一溝通很麻煩。

React Router 像是提供整合服務的公司，你對 Router 下一個指令的背後可能是對 History 下五個指令。

( 好其實我不是很確定 😭 )

---

## SDK 與 API 的差別是什麼？

API: 傳輸資料的接口，要使用必須符合 API 文件規範。
SDK: 現成的**多服務 or 功具包**，可能會包含作業環境、語言等等

以 Facebook 為例，下圖為官方文件：

![螢幕快照 2019-09-27 下午10.19.42](https://i.imgur.com/2bnMOgp.jpg)

如果只是要存取貼文、圖片等等較單純的動作，可以直接 call Facebook 的 API，但像是登入系統這種比較複雜的功能，就必須使用 SDK。

以 Web 平台就為例就是 JavaScript SDK，而下圖也可以看到不同的語言跟作業環境也提供相應的 SDK 。

![螢幕快照 2019-09-27 下午10.28.28](https://i.imgur.com/X0PyTUT.jpg)


---

## 在用 Ajax 的時候如果不是同源，預設是不會把 Cookie 帶上的，要怎麼樣才能把 Cookie 一起帶上？

前、後端都要設定：
- request: `withCredentials = true`
- response: `Access-Control-Allow-Credentials = true`

前端以 axiom 為例：

```javascript
import axios from 'axios';

axios.defaults.withCredentials = true;
// or
axios.get(url, {withCredentials: true})
```

