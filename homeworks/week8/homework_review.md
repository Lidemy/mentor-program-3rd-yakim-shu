# 作業心得

## hw1 抽獎程式
- 再玩一次 => 改成重新整理頁面
    - 因為當抽獎結果跟上次一樣，如果沒做轉場效果，看起來會像按鈕沒作用

## hw2 留言板

- 本來加上按 Enter 也可以送出留言的功能
    - 但中文輸入選字會需要用到 Enter，目前不知道該怎麼解，所以先刪掉了
- 前後頁控制
    - 本來是讓按鈕在不該出現時隱藏，但畫面看起來怪怪的，所以直接將 CSS 改成不能操作的樣式、JS 也有擋住。
- 載入順序 
    - prepend、appendChild、API 提供的順序，搞在一起頭腦很亂，最後是胡亂試、搞得對為止。
- 新增留言的差集
    - 一開始為了送出留言時、不想重新渲染所有留言，是直接抓 Input 的 value 新增進畫面，但後來想到這樣如果有人在使用者送出留言前也送出資料，留言順序會亂掉（ 直到重新整理）。
    - 所以後來才改成計算 response id 跟 上一次 id 的差集，但實作的時候也卡關了一陣子，沒想到一個留言板眉眉角角這麼多。
    
#### 花了很多時間想怎麼優化

因為 GET 跟 POST 方法參數很多是重複的，一開始是想說抽成物件，但遇到的問題是，如果參數是變數動態產生的，沒有辦法很彈性的改變物件的 value
只能像以下方式：

```javascript
getObj = {
  url: 'aaa';
}
getObj.url = 'bbb';
```

所以後來想到何不改成用 function 包裝，一樣式回傳物件，但可以傳參數進去更改。
```javascript
function getObj(newUrl) {
  return {
    url: newUrl
  }
}
```

（ 以上只是舉例 ）

其中函式 `RenderHtml()` 以這樣的方式寫，私有 property 用 `let` 宣告，公用 property 用 `this.method`，如果外部要存取私有 property，再用 `get` 方法。

第九週的 OOP 影片還沒看，但初衷是想練習之前看 [Youtube 教程](https://www.youtube.com/watch?v=PFmuCDHHpwk&list=PLTjRvDozrdlxEIuOBZkMAK5uiqp8rHUax&index=2) 的內容，雖然這免費課程只有釋出一小部分哈哈哈，所以我也只看了這個影片，如果有誤用，拜託用力鞭！

## hw3 Twitch API

「 挑戰題 」跟「 超級挑戰題 」都是 hw3 的延伸，就直接寫在一起。
- 搜尋框
    - 基本功能應該有做到，學到了用正則比對字串，要是為變數的話，要 new 一個正則表達式的物件。
    - 但更好的應該是要按向下鍵 ⬇︎ 可以直接選取到提示框，這部份待未來優化。
- 無限滾動
    - scroll 事件會一直觸發，效能可能會有影響，理想是改成 300 毫秒內只能觸發一次，先記錄起來，未來再進行優化。
- 解釋一下為什麼頻道卡片都是由一個隱藏元素 `<a class="origin hide"></a>` 為原型，而不是直接用 createElement 新增，原因如下：
    - 如果是 create 一個節點，新增該節點 className 跟 innerInner 都很麻煩
    - create 的節點不能用 outerHTML