# 作業 hw4 ： this

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // => 2
obj2.hello() // => 2
hello() // => undefined
```

---

### 解釋輸出

這題只要清楚 「 `this` 關乎於**呼叫的方式**，而非定義的位置 」的觀念，就可以輕鬆解題。

#### ☞ `obj.inner.hello() // => 2`

- 首先看 `.hello()` 這個 function 是由誰呼叫的 => `obj.inner`
- `object.inner` 是什麼？ 
    - 物件 `obj` 裡面的物件 `inner`
- 既然是 `obj.inner` 呼叫的，就代表 `this => obj.inner`
- 所以這裡的 `this.value` 就是 `object.inner.value` => `2`

```javascript
// this: obj.inner
// 以下為 obj.inner 內容
{
    value: 2, 
    hello: function() {
    console.log(this.value)
}
```

#### ☞ `obj2.hello() // => 2` ( 內容跟上題基本一樣 )

- 首先看 `.hello()` 這個 function 是由誰呼叫的 => `obj2`
- `obj2` 是什麼？ 
    - `obj2 = obj.inner` 
    - 跟上題一樣，也是 `obj` 裡面的物件 `inner`
- 既然是 `obj.inner` 呼叫的，就代表 `this => obj.inner`
- 所以這裡的 `this.value` 就是 `object.inner.value` => `2`


```javascript
// this: obj.inner
// 以下為 obj.inner 內容
{
    value: 2, 
    hello: function() {
    console.log(this.value)
}
```

#### ☞ `hello() // => undefined`

- 首先看 `hello()` 這個 function 是由誰呼叫的 => `沒有` ?!
    - `沒有` => 其實就是由全域物件呼叫，就像在全域 call function 的情況。
    - 全域物件 => 在瀏覽器下可以當作 `window.hello()`、或在 node.js 可以看成是 `global.hello()`
- `hello()` 是什麼？ 
    - `hello = obj.inner.hello`
    - 是 `obj` 裡面的物件 `inner` 裡面的 **function hello 內容**
    - 意思是 `hello` => 就是一個單純的 function 
- 既然沒有透過物件呼叫 `hello`，就只是普通執行一個 function 的話，`this` 會為預設值，而預設值會因為執行環境而有所不同。
    - node.js : `global`
    - 瀏覽器 : `window`
    - 嚴格模式 : `undefined`（ 無論 node.js or 瀏覽器 ）
- 而**除非特別設定過全域物件或變數，不然在哪種環境下的 `this` 應該都找不到 `value` 屬性**，所以 `this.value` => `undefined`

```javascript
// this: 視環境不同 ( global || window || undefined )
// function: hello 內容
function() {
    console.log(this.value)
}
```

