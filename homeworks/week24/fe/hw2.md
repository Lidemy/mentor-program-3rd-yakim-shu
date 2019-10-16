## Redux 如何解決非同步（例如說 call API 拿資料）的問題

### 使用 middleware

middleware 算是一個中間層，可以讓 Component 維持很乾淨的狀態，如果要呼叫 API，就只要 call function，而真正的 call API 邏輯交給 middleware 去處理。

而 middleware 其實原理就是 action in, action out：

- 當 middleware 接收到一個 action 進去
- 做一些非同步的事情
- 再 dispatch 另一個 action 出來

用 middleware 的好處是什麼：
- 方便測試，component 裡不該有 side effect 的程式碼
- 如果要更改拿資料的方式，只要更改被 call 的 function 就好，Component 完全不用動


### redux thunk
當發現 `action` 為 function 時，會幫你執行 function


### redux-promise-middleware

當發現 `action.payload` 是一個 Promise 的時候：

- dispatch `PENDDING` action
- 執行 Promise，也就是 `action.payload`
    - 執行成功 => dispatch `FULFILLED` action
    - 執行失敗 => dispatch `REJECTED` action