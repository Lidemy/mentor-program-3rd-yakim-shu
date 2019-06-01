# 簡答題

## 什麼是 DOM？
就是把 HTML 的**標記**（ Document ） 轉換成**物件**( Object )。

JS 可以操作物件，但不能直接操作頁面上的標籤，所以 DOM 就是瀏覽器幫 object 轉換成 => HTML 對應的標記，進而讓 JS 可以改變到頁面的元素。

> 所以 DOM 可以說是 JS 跟 HTML 溝通的橋樑。

----

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

### 什麼是冒泡？

假設頁面有三個元素，由外至內分別是：`outer`、`inner`、`btn`，三個元素都分別監聽 `click` 事件。

但奇怪的事情來了，當我點擊最內層元素 `btn`，不只 `btn` 的 `click` 事件被觸發，連上兩層的元素都被觸發了，這種詭異的現象其實是「 冒泡事件 」。

![螢幕快照 2019-05-27 下午6.47.07](https://i.imgur.com/qBPcmlZ.jpg)

### DOM 的事件傳遞機制

再深究下去，會發現 DOM 的事件傳遞機制分成三個階段，其順序為 :
- `1: Capture` 捕獲
- `2: Target` 元素本身
- `3: Bubbling` 冒泡

![](https://blog.techbridge.cc/img/huli/event/eventflow.png)

### 改變事件的傳遞方式
要改變事件的傳遞方式，可以在 `.addEventListener` 方法**加上第 3 個參數，為 boolean 值。**

- `true => 捕獲 ; false => 冒泡`
- 不加參數的話，預設值是 `false`（ 也就是說預設是以冒泡方式傳遞 ）

### 捕獲、冒泡？
改寫剛剛的範例，假如把剛剛的三個元素都加上兩種傳遞模式：
```javascript
function addEvent(className) {
  document.querySelector(className)
  .addEventListener('click', function (e) {
    // e.eventPhase` 為事件階段 (1) 捕獲、(2) 自身、(3) 冒泡
    console.log(className, '冒泡', e.eventPhase); 
  }, false)
  document.querySelector(className)
    .addEventListener('click', function (e) {
      console.log(className, '捕獲', e.eventPhase);
    }, true)
};
```

點擊最內層的 `btn` 會看到順序如下 `(1) > (2) > (3)`：

```javascript
.outer 捕獲 1
.inner 捕獲 1
.btn 冒泡 2 // 看底下說明
.btn 捕獲 2 // 看底下說明
.inner 冒泡 3
.outer 冒泡 3
```

> 注意：

- 中間 `btn` 會「 先冒泡再捕獲 」是因為冒泡的綁定寫在更前面。
- 中文註釋這樣寫可能會造成混淆，因為其實是在階段 `(2) 自身`、非冒泡也非捕獲階段

---

## 什麼是 event delegation，為什麼我們需要它？

事件代理 event delegation 可以解決兩個問題：

1. 如果按鈕數量越來越龐大，假如變成 1000 個按鈕好了，難道要迴圈 1000 次幫每個按鈕都加上 `EventListener` 嗎？ 光想就非常沒有效率，尤其是 callback function 的內容其實很相似
2. 如果是**動態新增**的元素呢？（ 例如用 `appendChild` 的元素 ）要怎麼幫它綁定 `EventListener`？

別擔心，以上煩惱都可以用之前學的 **「 事件冒泡 」** 的概念去解決。

還記得事件傳遞預設是會冒泡的吧！改寫一下 HTML 結構，幫所有按鈕用 `.outer` 包起來。
```html
<div class="outer">
  <button class="btn_add" >add</button>
  <button class="btn" data-value="1">1</button>
  <button class="btn" data-value="2">2</button>
</div>
``` 
仔細想想，所有的 `button` 只要觸發 `click` 事件，都會向上冒泡傳遞到上層 `.outer`，觸發 `.outer` 的 `click` 事件，那就直接將 `EventListener` 綁定在上層的 `.outer` 身上就解決啦！

而且因為 `click` 事件是綁在上層的 `.outer` ，所以也不用擔心 `.appendChild()` 新增的子元素沒有綁定到 eventListener。

```javascript
document.querySelector('.outer').addEventListener('click', function (e) {
  console.log(e.target.getAttribute('data-value'));
})
```

> 大功告成 🙌

而像這樣把 `button` 的 `click` 綁定在上層的 `.outer` 元素上，就叫做 **事件代理 Event delegation**。


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

###  `event.preventDefault()` 阻止預設動作

阻止瀏覽器上的**特定元素**在**該事件預設的行為**，以下是比較常用的情況：

- `<form>` 的 `submit` - 阻止送出表單
- `<a>` 的 `click` 事件 - 阻止跳網址
- `<input>` 的 `keypress` 事件 - 阻止輸入按鍵

###  `event.stopPropagation()` 阻止事件傳遞

`e.stopPropagation()` 就是阻止事件的傳遞，換句話說，就是不向上（ 或下 ）級傳遞。

> 請注意，根據不同的指定傳遞方式，結果也會有所不同

以剛剛的例子來看，為了方便觀看，綁定的順序改成先「 捕獲 」 再 「 冒泡 」，也把中文去掉以免造成混淆。

### ☞ 阻止冒泡

在冒泡的流程上加了 `e.stopPropagation()`：

```javascript
function addEvent(className) {
  document.querySelector(className)
    .addEventListener('click', function (e) {
      console.log(className);
    }, true)
  document.querySelector(className)
  .addEventListener('click', function (e) {
    console.log(className);
    e.stopPropagation(); // 阻止冒泡事件傳遞
  }, false)
};
```
同樣的點擊 `btn`，會輸出以下，可以看得出來捕獲事件 `(1)(2)` 繼續傳遞，但冒泡 `(3)` 被阻止了：
```javascript
.outer 1
.inner 1
.btn 2
.btn 2
```

### ☞ 阻止捕獲

接下來，換阻止捕獲事件看看：

```javascript
function addEvent(className) {
  document.querySelector(className)
    .addEventListener('click', function (e) {
      console.log(className, '捕獲');
      e.stopPropagation(); // 阻止捕獲事件傳遞
    }, true)
  document.querySelector(className)
  .addEventListener('click', function (e) {
    console.log(className, '冒泡');
  }, false)
};
```

點擊 `btn` 卻是輸出以下結果：

```javascript
.outer 1
```

發現只傳到 `.outer` 就停止了！

其實也蠻合理的，還記得剛剛的捕獲、冒泡流程圖嗎？
1. 捕獲 `CAPTURING_PHASE`
2. 元素本身 `AT_TARGET`
3. 冒泡 `BUBBLING_PHASE`

事件傳遞是照以上順序的，而 `e.stopPropagation` 會阻止後續的傳遞，所以當 **`.outer` 的捕獲階段 `(1)` 就被阻止**的話，根本傳不到 `btn` ，所以 **`btn` 的 `(2)(3)` 當然就沒有執行下去。**

參考資料：
- [DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)