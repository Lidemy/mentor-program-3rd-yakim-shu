## 為什麼我們需要 Redux？

主要是幫助我們管理複雜的狀態，在使用 React 開發時，當 Component 嵌套的階層越來越深，所要傳遞的 props 也會暴增（ Prop drilling ），而且平行關係的 Component 要互動也非常麻煩。

以下圖為例，假如 `<E />` 會觸發某些事件去改變 `<D />` 的狀態，那要怎麼寫呢？

![](https://res.cloudinary.com/practicaldev/image/fetch/s--ODj86ijB--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/axnmkq4b19fxeso4lb7z.png)

( image from [You don't have to use Redux](https://dev.to/anssamghezala/you-don-t-have-to-use-redux-32a6) )

沒錯，步驟很麻煩：
- 提升狀態：把 `state` 跟 `method` 存在最上層的 `A`
- 資料往下傳：把 `state` 當作 `props` 傳下去給 `D`
- 資料往下傳：把 `mehthod` 當作 `props` 傳下去給 `E`

而這中間的 `B`、`C` 明明沒有什麼關係，卻還是要接收資料才有辦法繼續往下傳，不難想像要是組件越來越龐大的話，這樣的方式是非常難以維護的。

#### Redux 能幫助跨組件溝通

![](https://res.cloudinary.com/practicaldev/image/fetch/s--fuxmEqIK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/5n276dibl7bxch5mls63.png)

( image from [You don't have to use Redux](https://dev.to/anssamghezala/you-don-t-have-to-use-redux-32a6) )

那這時如果有個 global state，任何 Component 都可以存取，就不需要像這樣無止盡地將 state 提升上去，而 Redux 提供了 `store` 當作一個 global state 來解決跨組件溝通問題。

---

## Redux 是什麼？

Redux 是一種設計模式，可以單用 Redux 跟原生 JavaScript、也可以跟框架作搭配。

就像本週作業結合 React & Redux ，所以才需要引入 `react-redux` 將 Redux 的 store 傳給 React Component。

### store 儲存狀態的物件
Redux 每次更新時，真正更新的叫做 `State Tree`，而這個 state Tree 也很簡單，就是一個 javascript plain object，無論你的 APP 架構簡單或很複雜，都是一樣的。

### action 描述即將要改變的 state 
`action` 是一個物件，由 `action.type` 跟 `action.value` 所組成，主要的功能就是：**描述這個 action 的類型、以及所要改變的值有哪些。**

### reducer 回傳新 state 的 pure function
所有 Redux Component 會有一個函式接收原本的狀態、要加入的動作、新的狀態，而這就是 `reducer()` 的作用。所以 reducer 只接收兩個參數：
- `oldState`
- `action`

基於傳進來的 `oldState`，並根據 `action` 的描述來改變 `oldState`，最後回傳一個新的 `newState`。

很重要的一點是，**reducer() 不能改變傳進來的 state**，一定要回傳一個新的 state，而且 reducer **必須是 Pure function**。

> 什麼是 Pure function: 

- 單純的 function，丟入參數回傳結果，而只要參數是一樣的，就可以保證結果也會一樣，沒有任何副作用產生（ 調整到 database、調整 DOM、`new Date()`... ）。
- 不能修改傳入的參數（ `oldState` & `action` ）


## Single Page Application 是什麼？

Single Page Application 顧名思義就是只有一頁：`index.html`。

所有**看起來像切換的頁面**的功能，都是靠 JavaScript 去管理 Router 進而改變頁面的內容，而不會真的讓瀏覽器跳到 `about.html` or `catorgory.html`...

- SPA 的優點：
    - 使用者體驗良好，因為網頁換頁永遠不會出現換屏的白畫面
- SPA 的缺點：
    - 前端開發變得很複雜，因為原本後端要處理的路由、狀態等等，全部變成前端的範疇

### 有哪些頁面一定要用這個架構去設計嗎？

影音、音樂串流網站，總不能點擊個按鈕就中斷音樂

