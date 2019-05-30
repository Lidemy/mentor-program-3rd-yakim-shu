## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

- `<figure>` 幫不同種類的元素包起來，一個群組的概念
    - 通常會加上 `<figcaption>` 說明文字 ( 放在最前面 or 最後面 )
    - 通常是圖片、程式碼、引文
    
```html
<figure>
  <img
  src="https://developer.mozilla.org/static/img/favicon144.png"
  alt="The beautiful MDN logo.">
  <figcaption>MDN Logo</figcaption>
</figure>
```
- `<blockquote>` 表示引用自其他內容
    - 可用 `cite` 屬性標明出處 url
    
```html
<blockquote cite="http://developer.mozilla.org">
  <p>這是取自於 Mozilla Developer Center 的引言。</p>
</blockquote>
```

- `<code>` 放單行程式碼，會轉成等寬字體
    - 如果是整段的程式碼，通常會和 `<pre>` 搭配使用，例如以下：
    
```html
<pre><code>
    function sum(a, b) { 
        return a + b
    }
</code></pre>
```

參考資料：
- [figure](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
- [blockquote](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/blockquote)
- [code vs pre vs samp for inline and block code snippets](https://stackoverflow.com/questions/4611591/code-vs-pre-vs-samp-for-inline-and-block-code-snippets)

---

## 請問什麼是盒模型（box modal）？

可以想像成每個 HTML 標籤都是一個 box 方塊，而每個 box 都包含著四層寬度，會影響到 box 的長寬，以下由內至外說明：

- Content - 元素本身的大小，即是 `width` & `height` 的設定值
    - 寬度 `width` ： 會因為 `display` 的屬性，預設值會有所差異
        - `display: block`： 寬度為 100%
        - `display: inline | inline-block`： 寬度讓內容撐開
    - 高度 `height` ： 
        - 沒有設高度的話，就是讓內容去撐開 
        - 通常比較少設定高度，因為 RWD 時會很麻煩
    
- `padding` - 元素與內容的內邊距（ 空隙 ） 
- `border` - 元素的邊框
- `margin` - 元素的外間距
    - 不算在元素裡面，所以設元素的 `background` 屬性改不到 `margin` 佔據的部分

### box-sizing 盒模型屬性
#### content-box 預設
- 元素的實際大小會是 `content + padding + border`
- 元素 1 : `.box1 { width: 50px; height: 50px; margin: 10px;}`
    - 長、寬度各為： 50px
- 元素 2 : `.box2 { width: 50px; height: 50px; padding: 10px; border: 5px solid black; margin: 10px;}`
    - 長、寬度各為： 50 + (10\*2) + (5\*2) = 80px
- 補充： `margin` 是該元素佔據的位置，不算在大小裡面

<img src="https://i.imgur.com/TjjDqik.jpg" width="400" title="content-box">

> 動動腦時間 

Q： 把鏡頭轉向歹命的前端，如果要切出設計稿的某個元素： 總寬度 100px、跟內容留白 10px、邊框 2px，那該元素的 `width` 要設多少呢 ? 

A：`76px`： 100 - (10\*2) - (2\*2) = 76

但一個網頁有如此多個元素，總不能每次都拿出計算機按吧，所以在這裡推薦一個比較直覺的盒模型屬性。

#### border-box（ 推薦 ）
- 元素的實際大小就是 `width` & `height` 的設定值
- 元素 1 : `.box1 { width: 50px; height: 50px; margin: 10px;}`
    - 實際長、寬度各為： 50px
- 元素 2 : `.box2 { width: 50px; height: 50px; padding: 10px; border: 5px solid black; margin: 10px;}`
    - 實際長、寬度各為： 50px（ 用 chrome 的開發工具看會發現 content 變成 20px * 20px ）

<img src="https://i.imgur.com/pkoQRAD.jpg" width="400" title="border-box">


---

## 請問 display: inline, block 跟 inline-block 的差別是什麼？什麼時機點會用到？

#### `inline`
- 行內元素
- 會向左邊排列，不會換行、直到排滿才會換行
- 無法設定 `width` & `height`，寬、高會自然被內容撐開
- 無法設定 上下 `margin`
- `inline` 元素不該包著 `block` 元素
- 常見的 inline 元素有：
    - `<span>`、`<a>`、`<img>`、`<strong>`

#### `block`
- 塊級元素
- 向下排列，會換行
- 可以設定 `width` & `height`
    - 預設寬度會佔滿父容器的 100%、高度會自然被內容撐開
    - 就算「 兩個寬度加起來小於父容器 」的 block 並排，也是會換行

#### `inline-block`
- 會流動的塊級元素，兼顧 `inline` 跟 `block` 的優點
- 按照畫面的流動，會向左邊排列
- 可以設定 `width` & `height`
    - 預設寬、高會自然被內容撐開
- 常見的 `inline-block` 元素有： `<input>`

#### `none`
讓元素消失
如果只是想讓元素隱藏，但還是佔據相同位置的話可以用： `visibility : hidden`
    

#### 要小心設定為 `inline-block` 的 html 標籤造成空格間距，常見的解決方法如以下：

- 直接把所有標籤中的空白去掉
    - 捨棄縮排、不好閱讀 
- 用註解所有標籤中的空白填滿
    - 保留縮排
- 設定「 負 margin 」
    - 正常情況可以用 `margin: -4px`，用有可能會因為 `letter-space` 屬性受到影響，故不建議
- 元素加上 `display: float`（ **建議** ）
    - 但要記得後面的元素要 `clear: both` or `clear: left`，以免受到影響

參考資料：
- [【笨問題】Inline-Block元素多出來的間隙](https://blog.darkthread.net/blog/inline-block-redundant-space/)
- [为什么 input 元素能用 width 属性？](https://www.zhihu.com/question/20495297)

---

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？分別各舉一個會用到的場合

除了 static 是網頁自然的流動定位，其他三個都是 **相對定位**，差別在於「 參照點 」的位置不同，三者都是「 相對於參照點、進行的位移定位 」。

### 參照點：

#### `relative`： 元素本身
- 如果沒有設置偏移量 （ `left | top | right | bottom` ），則不會有任何改變。
- 不會影響其他元素：
    - 不管元素本身怎麼偏移，都不會影響到其他元素的定位。

#### `absolute`： 往上層找到「 第一個 」非 static 的元素 
- 跳脫原本的流動，定位位置有兩種可能：
    - 找到父層參照點 (`relative | absolute | fixed` )
    - 找不到父層參照點，意指上層的所有元素都以 `static` 定位，參照點則會是 `<body>` 元素。
- 如果沒設座標，預設位置為： `left: 0; top: 0;`（ 即父層參照點的左上角 ）
- 會影響其他元素：
    - 假設 `A、B、C` 是三個同級元素、且定位是 `static` 或 `relative`，當 `B` 設置 `position: absolute`，會影響到 `C` 元素的流動（ `C` 會補上原本 `B` 的位置 ）。


#### `fixed`： viewpoint，指瀏覽器可視範圍 
- 跳脫原本的流動，直接固定在相對於 viewpoint 的某個位置
- 不會隨著滑動頁面而移動位置
- 一定要設定座標才有作用
    - 水平 & 垂直 方向至少要設定一個 `top | bottom` & `left | right`
- 會影響其他元素：
    - 假設 `A、B、C` 是三個同級元素、且定位是 `static` 或 `relative`，當 `B` 設置 `position: fixed`，會影響到 `C` 元素的流動（ `C` 會補上原本 `B` 的位置 ）。
    
#### ☞ 新屬性 `sticky`： viewpoint
- **當視窗滾到該元素時**，才固定在相對於 viewpoint 的某個位置，**一直到「 父容器離開畫面為止 」**
- 一定要設定座標才有作用
    - 上下滾動要設定 `top | bottom` （ 左右是根據原本的位置，無法更改 ）
    - 左右滾動要設定 `left | right`（ 上下是根據原本的位置，無法更改 ）
- 不會影響其他元素：
    - 只有當視窗滾到該元素時，才會讓該元素位置改變，但同時並**不會影響到其他元素**。
- 可以想成是 `static` 跟 `fixed` 的混合版
    - 視窗滾到該元素前： `static`
    - 視窗滾到該元素後： `fixed`

---

### 應用：

#### 某元素要定位於右上角： `relative` & `absolute` 組合技

最常見的狀況應該是當某個元素要定位在「 右上角 」，通常是按鈕。
只要設置父容器為 `relative`，定位子元素為 `absolute`。

```html
<div class="box">
    <button class="button">我是關閉按鈕</button>
</div>
```

```css
.box {
    position: relative;
}
.button {
    position: absolute;
    right: 0;
    top: 0; /* 可以不用寫 top，因為預設就是 0 */
}
```

#### 選單固定於上方： `fixed` 的主場

這就很簡單了，可以使用 `fixed` 固定於上方（ 或 `sticky` 也可以 ）

```html
<nav class="nav">我是要固定在上方的選單</nav>
```

```css
.nav {
    width: 100%; 
    position: fixed;
    left: 0;
    top: 0;
}
```

#### 當視窗滾到某段落、段落標題固定於上方： 新功能 `sticky` 

<img src="https://i.imgur.com/MobfQe0.gif" width="500" title="demo_sitcky">

`sticky` 固定於上方：[Codepen - demo 網址](https://codepen.io/yakim-shu/pen/xNYzQY)

（ 厲害的地方在於，只會在父容器還在視窗內時固定 ）

> 但因為是新屬性，要注意瀏覽器兼容問題，至少現在 ( 05/2019 ) safari 都還要加前綴 
> `position: -webkit-sticky;`

```html
<section class="section">
  <h2 class="section__title">標題一</h2>
  <p>...</p>
</section>
<section class="section">
  <h2 class="section__title">標題二</h2>
  <p>...</p>
</section>
<section class="section">
  <h2 class="section__title">標題三</h2>
  <p>...</p>
</section>
<section class="section">
  <h2 class="section__title">標題四</h2>
  <p>...</p>
</section>
```

```css
.section__title{
  position: -webkit-sticky; /* for safari */
  position: sticky;
  top: 0;
}
```

