# Code Review for week7 hw1

## 第一題 - 反應力遊戲

[by cocoisbad](view-source:https://lidemy.github.io/mentor-program-3rd-cocoisbad/homeworks/week7/hw1/)
- 顏色直接用 `Number.toString(16)` 轉 16 進制好聰明

[by shuanshuan030913](https://lidemy.github.io/mentor-program-3rd-shuanshuan030913/homeworks/week7/hw1/main.js)
- 判斷背景色的深淺來改變文字顏色，以免文字被隨機顏色背景吃掉，前面看不懂但覺得很酷！

```javascript
const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
(luma < 120) ? h1.style.color = '#fff' : h1.style.color = '#332411';
```

[by RZ-Huang](https://lidemy.github.io/mentor-program-3rd-RZ-Huang/homeworks/week7/hw1/main.js)

- [ 邏輯方向不一樣 ] 是背景變色後才加上監聽事件，一但點擊後就移除監聽 
    - 可以少儲存一些狀態變數來判斷，但不知道算不算是比較好的方式？

[by ClayGao](https://lidemy.github.io/mentor-program-3rd-ClayGao/homeworks/week7/hw1/index.js)
    
- 背景換色是漸變，好像不是很適合測試反應遊戲？！ 
- `e.timeStamp` 是從 epoch （ 01/01/1970 ）過的時間差毫秒，查資料是建議用 `ne Date()` 取代
    
[by tsenLin](https://github.com/Lidemy/mentor-program-3rd-tsenLin/pull/8/files)
- 找出 `e.target` 的自訂 `data` : `event.target.dataset.for`
    - 值得注意的是在 HTML 設置 `data-*` 中的 `*` 只能用小寫字母，所以只能用連字號 `-` 連接字詞，而轉換到 JS 要換成駝峰式。
    - 例如： `data-date-of-birth` -> `el.dataset.dateOfBirth`
    - 參考資料：
        - [HTMLElement.dataset](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLElement/dataset)
        - [[技術分享] 什麼是 HTML 5 中的資料屬性（data-* attribute）](https://pjchender.blogspot.com/2017/01/html-5-data-attribute.html)
        
[by lagom0327](https://github.com/Lidemy/mentor-program-3rd-lagom0327/blob/60defd71f7a28d2dbc0fb0f9c7f2844fde60a48e/homeworks/week7/hw1/index.js)
- 很厲害的韓國應援色，創意很好也很美，連線性、環狀漸層的呈現都是隨機，屬性很多要處理其實滿麻煩的，看到底下這串我給跪了。
    - 不過挺難閱讀的，本來想說每個屬性都寫成 class 再隨機出現應該會簡單很多，但漸層的方向屬性可能沒有辦法抽出來單獨寫，所以還是佩服佩服

```javascript
const name = [' 金在奐', 'TWICE', 'DreamNote', ' 尹智聖', 'EXID', 'GFRIEND', 'OH MY GIRL'];
const colorCollection = [['#48A9C5', '#A0D1CA', '#B4B5DF'], ['#FF5FA2', '#ECCBA6'], ['#00B0A3', '#FFCB05'], ['#5DDBD3', '#DDE4E6', '#EEBAE9'], ['#7474C1', '#E06287', '#F1E6B2'], ['#5F4B8B', '#00ABC0', '#F0EEE9'], ['#F4A6D7', '#9ADBE8', '#EEE29F']];
// https://www.dcard.tw/f/entertainer/p/229848093
const func = [
  ['-webkit-linear-gradient', ['left', 'right', 'left top', 'left bottom', 'right top', 'right bottom']],
  ['-webkit-radial-gradient', ['circle', 'ellipse']]];


const selectColor = () => {
  const numForColor = Math.floor(Math.random() * colorCollection.length);
  const numForFunc = Math.floor(Math.random() * func.length);
  const numForType = Math.floor(Math.random() * func[numForFunc][1].length);
  return [`${func[numForFunc][0]}(${func[numForFunc][1][numForType]}, ${colorCollection[numForColor]})`, colorCollection[numForColor][0], colorCollection[numForColor][1], numForColor];
};
```
- 計時的方式是用 `performance.now()`，查了一下才發現這計時器很方便，相較於 `Date.now()` 莫名其妙的計時方法好很多。
    - `Date.now()` ： 從 「 1970/01/01 00:00:00 UTC 」 所經過的毫秒數，
    - `performance.now()` ： 當頁面 load 好那一刻，所經過的毫秒數，IE 10 以下不支援
    - 參考資料：
        - [Performance.now()](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now)
        - [performance.now() vs Date.now()](https://stackoverflow.com/questions/30795525/performance-now-vs-date-now)
- 發現監聽器的第三個參數可以傳更多屬性，都為 boolean 值。  `starter.addEventListener('click', count, { once: true });` [by prochini](https://github.com/Lidemy/mentor-program-3rd-prochini/pull/11/files)
    - `capture` ： `true => 捕獲 ; false => 冒泡`
    - `passive` ： 允許所有頁面的默認行為 ，意思是如果設了 `e.preventDefault()` 也沒有用，且 console 會跳出警告，目的是防止監聽器造成頁面卡頓。
    - `once` ： 為一次性，一但觸發就會移除監聽器
    - 參考文章：
            - [passive 的事件监听器](https://www.cnblogs.com/ziyunfei/p/5545439.html)
            - [addEventListener () 的第三个参数可以传对象了](https://juejin.im/post/5a4f41cc518825734c5b34ee)
            
## 反思
Code Review 雖然很累，但好的用法可以學習，奇怪的 bug 也可以學習，而且一題看過太多次，漸漸的就瞄個大概就能夠知道在寫什麼了，還滿不錯的！

### 可以加強的觀念：
- clearTimeout
- Date 物件用法

### 語法新世界
- 判斷有沒有 class：`.classList.contains(<class-name>)`
- 找出節點的自訂 data : `e.target.dataset.<data-name>`
- 不同的計時方式 : `performance.now()`
    - `Date.now()` ： 從 「 1970/01/01 00:00:00 UTC 」 所經過的毫秒數，
    - `performance.now()` ： 當頁面 load 好那一刻，所經過的毫秒數，IE 10 以下不支援
- 監聽器的第三個參數可以傳更多屬性 : `capture`、`passive`、`once`
    - `capture` ： `true => 捕獲 ; false => 冒泡`
    - `passive` ： 允許所有頁面的默認行為 ，意思是如果設了 `e.preventDefault()` 也沒有用，且 console 會跳出警告，目的是防止監聽器造成頁面卡頓。
    - `once` ： 為一次性，一但觸發就會移除監聽器 
    