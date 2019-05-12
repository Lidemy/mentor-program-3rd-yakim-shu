# 截至目前的心得
第五週作業是個很棒的機會做總檢討，總之這是一篇很長的心得文，我看了都怕.jpg。

前半段：每週的學習重點整理、作業感想、尚未理解的部分、筆記連結。
後半段：課程感想、學習方式及問問題的反思、整理尚未研究清楚的問題


---
## 第一週

暖身週注重在基本觀念釐清，比較沒有明顯的挑戰。
但第一週好像是目前最累的一週，可能還在逐漸摸索學習與時間管理的方式，蕃茄鐘也是第一週結束就放棄了啊，看到同學分享的工具 Timely 抓工作時間很有興趣。

> 每天都保持穩定的時間學習，也比三天衝過頭、兩天耍廢好。

### 學習內容
#### [ Command Line ]
- 現在回頭看，真得是很關鍵的基礎，每天打開 Terminal 都感到很自在，希望未來可以再跟他建立更深厚的友情。
- 額外小技巧
    - Terminal 輸入的快捷鍵、跳資料夾位置
    
#### [ Git ]
- 用指令上傳 blog 文章的那一刻，認真感動！
- 學到版本有衝突並不是這麼可怕的事、也不再恐慌，動手解決其實很簡單。
- 透過交作業的流程也知道如何送 PR，對於觀念、實務上都有更深一層的了解，目前操作都沒有什麼問題。
    
#### [ 網路基礎概論 ]
- 搭配 week4 的課程，終於理解 IP 了！ 
    
#### [ Shell Script ]
- 是一個嶄新的世界，花了幾天在找資料。 

---
#### 作業
- `前面簡答題`： 解釋 CLI、 Git、網路基礎
    - 寫了整整兩天、而且相當冗長，廢話太多是一大問題，我只會增加字數、不會減少啊啊啊啊。
- `挑戰題`：用 shell 腳本產生 `n` 個檔案 
    - 不難，上網查個語法就行
- `超級挑戰題`： 用 `curl` 抓 GitHub API，再篩資料
    - 拿到資料也不難，但篩資料過程中狂碰壁，雖然也學到不少，沒用的找 Huli 求救，得到 `--silent` 關鍵字，最後成功很開心！
    - [解題撞牆心得](https://github.com/Lidemy/mentor-program-3rd-yakim-shu/blob/master/homeworks/week1/超級挑戰題心得.md)

#### 還沒有完全理解的
- Git
    - 沒辦法很自在的切換 commit 節點，之前不小心搞亂掉，Head 指向變得很奇怪，迷失在一片版本海。
    - 而且未來多人協作時應該更複雜，本週會找時間要好好把其他狀況劇設想一遍，並找出問題排除的方法。
- Shell Script
    - 除了寫作業必要的語法，其他都沒有詳細研究，等到哪天有強烈需求再來搞懂！ 

#### 筆記
- [[第一週] Command Line - Terminal、基本指令介紹](https://yakimhsu.com/project/project_w1_CommandLine.html)
- [[第一週] 版本控制 - 原理 ＆ 基本 Git 指令](https://yakimhsu.com/project/project_w1_Git_1.html)
- [[第一週] 版本控制 - 進階指令 & GitHub](https://yakimhsu.com/project/project_w1_Git_2.html)
- [[第一週] 搞懂目錄位置 & 網路基礎概論](https://yakimhsu.com/project/project_w1_Networking_Introduction.html)

-----
## 第二週
本週算是複習 JS 基礎觀念、基礎排序法，初次感受 ESLint 愛的教育，位元運算也是新世界。

在傳值 or 傳址討論中，學到不再去追根究底名詞背後的定義是什麼，了解其中的行為，比「 該如何定義此行為 」還重要。

看同學作業才知道 code review 的重要性，明明自己有過基礎還寫成那樣、感到羞愧加生氣。同時認清本週作業的超級挑戰題是比自己強太多的對手，現實生活不是 JUMP 漫畫般熱血，所以還是等練高一點再來挑戰。

### 學習內容
#### [ 基礎 JS ] 位元運算
過去放棄的觀念，很開心有機會補回來。明明是一樣的內容，霧裡看花時覺得痛苦萬分，理解了卻覺得很好玩，這心境差異也覺得滿有趣的。

#### [ 基礎 JS ] 變數、迴圈、判斷式、陣列、物件
- 學到一些小知識，例如 `++` 放前面跟後面居然有差


#### [ 基礎 JS ] 內建函式
- 內建函式總複習，內建函式筆記大概是我最常回去翻的一篇，根本沒辦法記住全部啊。
- 值得注意的是，有些物件的內建函式，會改到陣列本身。

#### [ 基礎 JS ] 變數傳遞特性
- 搞懂物件特性、**記憶體位置**的觀念相當重要
    - CS50 有就紹過 C 語言的指標，有指標的概念後就滿好懂的。
- Pass by ____? 
    - 不管名詞是怎麼定義的，只要了解不同類型的變數傳遞方式足矣。

    
#### [ 綜合練習題 ]
- `Lv1_10` 
    - 以前有研究過 `reduce`，以為只是效能更好的寫法而已，並不知道他的真正妙用，現在知道重點在於**累積器**，原來是可以把狀態存在裡頭，直接到回傳的參數，就**不需要外部變數**來存取，覺得蠻酷的！
- `Lv2_6： 費氏數列`
    - 原來費式數列可以用遞迴解！到現在還是很不熟遞迴，希望有更多練習機會。
- `Lv2_8： 大小寫轉換` 
    - 解答簡潔的寫法，跟我原本那一坨醜 code 根本不能比... 更熟悉 `map` 的運用。
- `Lv3_2 ： 壓平陣列`
    - 我認為練習題裡最難的一題，又敗在遞迴上，可惡
- `Lv3_3 ： 聖誕樹`
    - 不知道有 `.repeat` 可以用，導致用了超多迴圈再處理字串...
- `Lv3_4 ： 圈叉遊戲`
    - 寫得跟解答差不多，但未來有能力的話，想優化成超過 `3x3` 的陣列也適用 
    
#### 實用寫法
- 三元運算子
- 熟練內建函式
- 短路性質： `x = x || y` （ 如果 `x` 的布林值為 `false`，把 `x` 設為 `y` ）
- `n >> 1` 效果如同 `n / 2`
- `n << 1` 效果如同 `n * 2`
- `n & 1` 效果如同 `n % 2` → `1` ， 代表 `n` 為 `奇數`
- `n & 1` 效果如同 `n % 2` → `0` ， 代表 `n` 為 `偶數`
    
---
#### 作業
- `hw1 - hw6`
    - 本週的基本題作業都不難，很快寫完交卷後，回頭看同學的 code。
    - 不看沒事、一看整個震撼彈，反觀自己不知道在衝沙小，很多該善用函式的地方都沒寫好、邏輯也不簡潔。
    - 一邊回頭修改、一邊感到有點難過，不過也知道 code review 的重要，之後也都會回頭看同學作業，找到可以學習跟改善的部分，提交作業前也更嚴謹審視自己的 code。
- `挑戰題： Binaray Search`
    - 劃重點：當 `start` 大於 `end` 時，代表目標物不在資料裡。
    - 剛好前一個月才在 [CS50 助教課聽到二元搜尋](https://www.youtube.com/embed/T98PIp4omUA?autoplay=1&rel=0) 的步驟，用圖解的方式很容易理解，理解之後要寫就不難了，不過我到現在還是不知道有沒有寫錯。（ 許願： 希望這題會上 OJ ）

```javascript
// 取中間數當作參照值
function searchIndex(start, end) {
  return Math.floor((start + end) / 2);
}
// 主程式
function search(arr, target) {
  let start = 0;
  let end = arr.length;
  let index = searchIndex(start, end);
  // 起始點 與 終點 中間沒有其他數就跳出
  while (end > start + 1) {
    if (arr[index] === target) return index; // 找到目標
    if (arr[index] > target) {
      end = index;
    } else {
      start = index;
    }
    index = searchIndex(start, end); // 更新參照值
  }
  return -1;
}
```
- `超級挑戰題： BFS`
    - 認真查資料還是看不懂，看來要補齊不少背景知識，希望未來有機會解開。

#### 還沒有完全理解的
- 網路上解釋 `0.1 + 0.2 => 0.30000000000000004` 的文章都很難看懂... 筆記花了很多功夫還是沒辦法解釋好，更無法說服自己已經懂了。
- 遞迴：理解一回事、自己寫出來又是一回事。
- 各種排序法：寫成程式碼應該是一大挑戰。

#### 筆記
- [[第二週] 基礎 JavaScript - 邏輯、位元運算](https://yakimhsu.com/project/project_w2_Javasciprt_01.html)
- [[第二週] 基礎 JavaScript - 變數](https://yakimhsu.com/project/project_w2_Javasciprt_02.html)
- [[第二週] 基礎 JavaScript - 03 函式 Function](https://yakimhsu.com/project/project_w2_Javasciprt_03.html)

----
## 第三週
### 學習內容

這週開始耐心好像有點下降，但作業寫得很開心。

日後會多善用 ES6 語法、引用模組、不自己造輪子，還有個重要的關鍵是，該怎麼把測資寫得好，真是一門大學問。

寫作業時踩到 NaN 的陷阱，把教訓寫成筆記，有痛點的收穫，印象非常深刻。

#### [ npm 套件管理工具 ]
- 有了模組化 Module 的概念，學到如何在 JS 裡面引入跟導出模組
- 暸解 `package.json` 的 `script` 欄位
- 劃重點： 記得在 `.gitignore` 資訊加上資料夾 `node_modules`，不然等著上傳到天荒地老

#### [ 測試、Jest、TDD ]
- 直到比較常寫題目的後期，才知道測試的重要性啊！
- 學到用 jest 測試副檔名為 `.test.js` 的檔案。
- TDD 是一種開發流程，指的是在實作功能之前，先寫測試程式。雖然是個好方法，但覺得太花時間還沒辦法落實。

#### [ ES6 語法、Babel 轉譯器 ]
- ES6
    - `變數宣告 let、const` : 塊級作用域
    - `字串模板 Template` : 更方便的操作字串
    - `解構賦值 Destructuring` : 對應到陣列或物件的值
    - `展開運算子 Spread Operator` : 用 `...` 符號，展開陣列或物件
    - `其餘運算子 Rest Parameters` : 用 `...` 符號，集合剩餘的元素。
    - `參數預設值 Default Parameters` : 幫函式參數加入預設值
    - `箭頭函式 Arrow Function` : function 更簡潔的寫法
    - `import & export 引入跟匯出` : 跟 ES5 的 `require` & `module.exports` 很像
- Babel
    - JavaScript 的轉譯器。
    - 可以寫新版的 JS，同時轉成舊版本給舊的瀏覽器使用
    
#### [ 研究 NaN ]
- 問題發現： `NaN == NaN` or `NaN === NaN` → 都是回傳 `false`
- 解法： 使用判斷 `x` 是不是 `NaN` 的函式
    - `.isNaN(x)`  
        - 會先將 `x` 轉換成數字類型 → `.isNaN(Number(x))`，再進行比對是否為 `NaN`
    - `Number.isNaN(x)` 
        - ES6 出的新語法，又比 `.isNaN()` 可靠又嚴格一點
        - 只有傳入 **型態為 `number` 的 `NaN` 才回傳 `true`**，其餘皆 `false`
    
---
#### 作業
- `hw1 - hw4`
    - 基本題都是上週作業的延伸，有了上禮拜的慘痛經驗，這次作業認真檢查，來回看過很多遍才提交，第三題測資沒想好，一度卡關。 
- `hw5： 大數加法`
    - 有難度、不過在紙上寫過一遍就有解題想法，但同樣是測資沒想好，寫到乘法才發現加法有錯...
    - 最後進位要補 `1` 的情況，是測了 `99` + `1` 才發現，開始有了一點測資寫法的概念
    - 過後看同學都是用陣列解，才發現我當初完全沒想過要轉陣列欸，可能是光想就很複雜，腦袋自動幫我排除了，雖然字串也解的出來，但日後想改成陣列試看看。
    
```javascript
function add(a, b) {
  let temp10 = 0;
  let ans = '';
  const Max = a.length > b.length ? a.length : b.length;
  for (let i = 1; i <= Max; i += 1) {
    // 從後往前取數字，空位補 0
    let temp = (Number(a[a.length - i]) || 0) + (Number(b[b.length - i]) || 0) + temp10;
    temp10 = temp > 9 ? 1 : 0;
    temp %= 10;
    ans = temp + ans;
  }
  if (temp10) ans = `1${ans}`; // 最後還要再進一位，前面補 1
  return ans;
}
```
- `挑戰題： 大數乘法`
    - 比起「 從零到寫出加法 」，其實 「 從加法寫到乘法 」想的時間比較快 
    - 要計算很多位數有點複雜，一開始只用一個迴圈，以 `個位數` * `多位數`來寫，成功之後再換成雙迴圈
    - 但一開始提交的寫法有點丟臉，補乘積後面的 `n` 個 `0` ，我居然用數字 `10 的 n 次方`，好愚蠢啊我在想什麼！幸好被同學糾錯，後來改成加上 `'0'` 的字串，還比原本寫法簡單，感謝好心同學。
    
```javascript
function checkNum(str, index) {
  return Number(str[str.length - index]) || 0; // 從後往前取數字，空位補 0
}
function add(a, b) {
  let temp10 = 0;
  let ans = '';
  const Max = a.length > b.length ? a.length : b.length;
  for (let i = 1; i <= Max; i += 1) {
    let temp = checkNum(a, i) + checkNum(b, i) + temp10;
    temp10 = temp > 9 ? 1 : 0;
    temp %= 10;
    ans = temp + ans;
  }
  if (temp10) ans = `1${ans}`; // 最後還要再進一位，前面補 1
  return ans;
}

function times(a, b) {
  let ans = '';
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const temp = checkNum(a, i) * checkNum(b, j) + '0'.repeat(i + j - 2); // 乘積後面補上 n 位數的 0
      ans = add(ans, temp); // 乘積不斷相加
    }
  }
  return ans;
}
```    
- `hw5： 大數除法`
    - 在心裡想了一下，嗯，沒有任何想法。難度應該比上兩題多出不少，決定先擱著、等基礎都搞定再回頭看頭上會不會出現小燈泡。


#### 還沒有完全理解的
- library、module、package (函式庫、模組、套件) 之間的差別
- 研究怎麼下「 有效的 」測試資料 edge case 、 corner case
- 「淺拷貝」＆「深拷貝」的差異
    - 如果要拷貝完全的話可以參考以下方法：
    1. 先把物件轉成 json 字串格式： `const obj_json = JSON.stringfy(obj)`
    2. 再把字串轉回物件： `const obj2 = JSON.parse(obj_json)`

#### 筆記
- [[第三週] JavaScript - npm 套件管理工具](https://yakimhsu.com/project/project_w3_Javasciprt_npm.html) 
- [[第三週] JavaScript - 測試、Jest、TDD](https://yakimhsu.com/project/project_w3_Javasciprt_jest.html) 
- [[第三週] JavaScript - ES6 語法、Babel 轉譯器](https://yakimhsu.com/project/project_w3_Javasciprt_ES6.html) 

---

## 第四週

本週學的東西都比較抽象，理解 API 怎麼運作的是一回事，真的要串接時，還是碰到一堆困難，request header 的寫法明明也不複雜，但剛開始搞不懂時就是一直撞牆。

> 體會到好的文件很重要，規則不寫清楚，新手還不會通靈啊

### 學習內容
#### [ 網路基礎 - HTTP、Request、Response ]
- 以前看開發人員工具，只會在 `Elements` 跟 `Console` 之間遊走，本週正式踏入了 `Network` 標籤，開心。
    - 看懂 request 跟 response 的 header
- 對瀏覽器發送 request 的發送順序感到好奇，目前理解是： 
    - `發送 html 的 request` > `解析 html 內容` > `發現其他資源 ( CSS、JS、img )` > `發送其他資源 request` > `渲染網頁`
- `GET` : 通常網頁都是 `GET` 的 request 比較多
    - 因為只是要獲取資訊、不會帶 request body
- `POST` : 需要執行一些動作時，會傳送 `POST` 的 request
    -  獲取「 指定的 」資訊，放在 request body ( Form data ) 裡面
- Http Code 狀態碼
- 利用套件 `request` 實作 Client 端
- 利用 Node.js 內建 library `http`，實作 Server 端  

#### [ 網路基礎 - TCP / IP ]
- 世界抽象的四層 TCP/IP 模型，豁然開朗的那一刻很爽
    - 應用層 （ 傳輸的資料內容 ） : `HTTP`, `HTTPS`, `FTP`,`DNS` ...
    - 傳輸層 （ 傳輸的方式 ） : `TCP`, `UDP`
    - 網路層 （ 傳輸的地址 ） : `IPv4`, `IPv6`
    - 網路訪問層 （ 實體傳輸 ） : `乙太網路`、`Wi-Fi`
- 暸解 IP 的各種花式名稱 : 固定IP、浮動IP、虛擬IP
- 簡單理解 TCP 協定的三次握手，更高層次的理解就先放棄。

#### [ API ]
- 就像是把家裡的 **插頭 (開發者)** 插進 **插座(API)** 就 **有電(資料交換)**。
- 而 Web API 是基於 http 協定下運作的 API
    - 送一個 request 加上參數，就會得到一個結果，中間的商業邏輯與資料篩選是提供 API 的 Server 端來處理。
    
#### [ RESTful API ]
- 符合 CRUD 原則的、分別是 Create (Post)、Read (Get)、Update (Put)、Delete (Delete)，我們就把這種風格稱為 RESTful API。
- 「 非 」 RESTful API
    - **動詞是寫在 URL**
    - 例如：[Twitter](https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/overview)( 因為刪除跟更新是用 `POST`，但其實我不是很確定是否歸類在非 RESTful )
- RESTful API
    - **語易化的動詞 Method** + **名詞 URL**
    - 例如：[GtiHub](https://developer.github.com/v3/)、[Stripe](https://stripe.com/docs/api)

#### [ Curl 指令 ]
- 雖然很簡單使用，但 curl 可是很強大的，支援發 HTTP request 、下載及上傳檔案的功能，基本格式為 : `curl [options] [URL...]`

---
#### 作業
- `hw1 - hw4 ： API 基礎串接`
    - 正式踏入串 API 的世界，在寫 hw2 的時候，想把重複的 function 抽出來，就發現有 Bug，這次的問題應該是真的「 非同步 」吧！直接用 request 官方文件推薦的另一個套件 request-promise 解決。

- `hw5 簡答題： 解釋 API、規劃 API 文件`
    - 不得不稱讚這作業出的真好！認真參考各家大神出的 API 文件，想辦法寫出簡潔又帶有足夠資訊的文件。
    - 個人覺得好的範例很重要，像是每家 API 的 token 位置都不太一樣，有些文件沒寫得很清楚，導致有時候會摸索很久，雖然可能是自己經驗不足，但如果範例寫清楚一點，可以會省很多麻煩啊！
    - API 一開始就要規劃好真的很重要，不然一但串完資料，後期要是很常更新文件，應該會把所有工程師搞瘋。
-  `挑戰題 & 超級挑戰題 ： 串接 Twitch API`
    - 比較大的挑戰是在了解文件的 100 條資料限制後，如何依照規則拿到後面的資料，跟如何解決 JS 非同步的狀態。
    - 不過我是靠套件 request-promise 解決的，可能算是偷吃步，而且如果要呼叫更多筆資料，還是要寫多層 `.then`，非常不理想。看到有同學提出用遞迴覺得很聰明！之後會再改成 `callback + 遞迴` 試試，感謝同學分享。

```javascript
const rp = require('request-promise');

const token = '11gzim2pdteu8xr2p6qgotmuiur42i';
const url = 'https://api.twitch.tv/helix/streams';
const id = '21779'; // game_id of LOL
const num = 100;
let keyNext;

const options = {
  url: `${url}?game_id=${id}&first=${num}`,
  headers: {
    'Client-ID': token,
  },
  json: true, // auto transform to JSON
};

const printData = (body) => {
  body.data.forEach(element => console.log(element.id, element.title));
};
const getItemFront = (body) => {
  printData(body);
  keyNext = body.pagination.cursor;
};
const getItemEnd = () => {
  options.url = `${options.url}&after=${keyNext}`; // request url 加上更新過的 cursor
  rp(options)
    .then(body => printData(body));
};

rp(options)
  .then(body => getItemFront(body)) // 抓前 100 個
  .finally(() => getItemEnd()); // 抓後 100 個
```

#### 還沒有完全理解的
- 非同步概念
    - 但偷瞄到後面教學有講，決定留給聽完再說
- request 跟 response 的 header 還是一團迷霧
- 瀏覽器的渲染是怎麼辦到的

#### 筆記
- [[第四週] 網路基礎 - HTTP、Request、Response](https://yakimhsu.com/project/project_w4_Network_http.html)
- [[第四週] 網路基礎 - TCP/IP](https://yakimhsu.com/project/project_w4_Network_TCP_IP.html)
- [[第四週] API 基礎 - RESTful API、JSON、curl 指令](https://yakimhsu.com/project/project_w4_Network_API.html)
 
---
## 第五週

寫這份心得的同時、也複習了前四週所學，還有 HTTP GAME 跟挑戰賽可以玩，完全是目前體驗最佳的一週，沒辦法，解題總是比聽理論有趣啊！

同時零機一動給自己出的抓作業小挑戰，能夠實現的感覺很好。

### 學習內容
#### [ OJ 挑戰賽 ]

前幾題都蠻快通過的，第五題已經放生兩天了。
依照 Huli 說的佛系解題法，答案可以現身了嗎我還在等你欸！

- `第二題： 不公平的人，是誰？`
    - 一開始題目看錯，一直以為有數字有小數點，寫的超級冗長又麻煩，後來才發現自己耍笨、題目沒看清楚...

- `第五題： 友好數`
    - 至今還在 60 分，我過不去。
    - 想 edge case 真的比寫程式還難啊，已經把條件以內的「 友好數 」、「 完全數 」都丟進陣列、用迴圈跑了，本機測都沒問題，好害怕又是那種槌心肝的蠢問題。

#### [ HTTP GAME ]

目前卡在 Lv14，完全看不懂題目，同樣被我放生。
但真的很好玩，雖然太急著過關沒時間注意彩蛋、連有 hint 都忘了啊哈哈哈

- Lv6 :
    - base64 我是用網頁服務轉出來的，看其他同學作業才知道，難道是要自己寫程式生成嗎？（ 惶恐 ）
- Lv10 :
    - 不敢把 0 ~ 9999 都拿去送 request 怕他壞掉，改成跑迴圈 0 ~ 99，很容易觀察出是哪 4 個數字，再把順序換一下就好，喜歡這題！！！
- Lv11 : 
    - 雖然是解出來了，但還是有點疑惑，加上 header 的 origin，這樣就算是同源嗎？
    - 原理是 Server 端會有個白名單，列出哪些 domain 送的 request 不用被擋掉的這樣嗎？ 例如以下：
    
```
Access-Control-Allow-Origin: *  # 允許所有網站發送的請求
Access-Control-Allow-Origin: lidemy.com  # 只允許 lidemy.com 的請求
```

- Lv13 : 
    - 嘗試了一些很蠢的寫法，因為找不到 header 有帶著地點或國家資訊，甚至把語言改成菲律賓語... `'Accept-Language': 'en-PH'` （ 完全是被逼瘋 ）
    - 最後是隨便找了個菲律賓 id，填上去居然過了！！超級爽
    
    
參考資料：
- [[JS] 同源政策與跨來源資源共用（CORS）](https://pjchender.github.io/2018/08/20/同源政策與跨來源資源共用（cors）/)
- [Same Origin Policy 同源政策 ! 一切安全的基礎](https://medium.com/@jaydenlin/same-origin-policy-同源政策-一切安全的基礎-36432565a226)

#### [ 靈機一動 - 串 API 抓同學作業 ]
- 契機 :

平常如果想要參考同學的作業，一直覺得步驟有點繁瑣：

`點開 Issue` > `點進留言附的 pr 連結` > `進去 Code 標籤` (註1) > `homeworks/` > `當週資料夾/` 

[ 註 1 ] : 其實點進 file-change 也可以，但紅紅綠綠的我看了很痛苦（ 還是大家都可以忍受？ ）

> 洗澡時點子找上門，決定實驗有沒有辦法把同學在 GitHub 的作業抓下來。

- 遇到的困難 1 : 沒取得 token，一小時只能發 `60` 個 request
    - 像個無知的愚婦，一開始串得很開心、用第一個迴圈跑的時候，出現了以下訊息。還好錯誤訊息非常簡單好懂，也附上了文件連結。但 token 分很多種，說實在有點搞不懂之間的差異。
    - 最後是使用了 `personal API tokens`，加上去一小時可以發 `5000` 個 request，送到突破天際也不怕。
    
```
HTTP/1.1 403 Forbidden
{
  "message": "Maximum number of login attempts exceeded. Please try again later.",
  "documentation_url": "https://developer.github.com/v3"
}
```

- 遇到的困難 2 : Callback 不熟
    - 一開始用 require 抓，但要發太多 request，處理資料完全超出能力所及。
雖然很掙扎，因為前前後後 5 個小時的沈沒成本... 但就算都知道怎麼拿資料，敗在 callback 太多、我也束手無策，還是決定整個砍掉重練。
    - 換下 curl 指令用腳本寫，邏輯變得超級簡單啊，雖然字串的篩選寫的很爛，但有了前面的經驗後，沒有碰到太多問題。最後終於有點小成果，有點感動啊！

- 最後完成的程式邏輯：
    - `curl` 用 Issue ID 取得 title & user-name & label
    - `curl` 取得該 ueser 的當週 repo 裡面的所有檔案的 file-name
    - 新建資料夾，名稱為 `[week-number]` `user-name` `label`
    - `curl` 下載 repo 裡面的所有檔案

- 執行方法：
`./get.sh <id-start> <id-end>`

![螢幕快照 2019-05-11 下午9.12.23](https://i.imgur.com/EEehoSQ.jpg)


- 感想： 結果不如預期，但做中學很開心
    - 雖然跟想像中不同、簡化操作的目的沒有達成，看檔案也沒比較方便。
    - 程式一堆 bug，邏輯非常沒有彈性、下載時間也很久。
    - 本來還想著如果其他同學有同樣的困擾，還可以一起分享寫出來的小工具，但最後實用性實在是不高就還是算了哈哈哈哈。
    - 能夠實現自己天馬行空的想法，真的無與倫比。
    
> 此練習剛好運用了之前的課程所學，有 `week1 的挑戰題 + 超級挑戰題` 跟 `week4 的串接 API 作業` 的經驗，其實並不會很難實現，超級感謝 Huli 用心的課程設計。
   
- 後言：

因為抓檔案的效率不好，也懷疑自己是不是用很愚蠢的方法在實現目的，問了 Huli 有沒有改善的方法，得到關鍵字 `parallel`，真是非常感謝！日後會好好研究，等優化完程式、有實用性再來分享。
    
---

### 課程安排的感想
當時一看到課綱跟報名表，除了後端的部分，課程內容有 70% 都是「 以前有碰過、但不甚了解的 」，所以覺得超級興奮。

本來這段時間是要在家自學的，但我認為在家自學的障礙是，對於陌生的領域，很難挑到適合自己的教學材料、學習內容跟職場需求的切合度、訂出有挑戰性的大目標跟小目標，以及如何檢視學習成果。

雖然直接就業也不是不行，但以現在的實力能進的公司應該不理想，上戰場也很有可能被 Deadline 追著，這邊改一下、那邊再 `ctrl + V`，反正可以動就好，這不是我期望的。

所以在課程的安排下，至少這四週都是很扎實的學習，而付出了努力多寡也體現在作業成果上，更好的機制是看同學作業，code review 真的可以學很多。只要付出足夠多的時間，我認為人人都可以轉職成功不是講假的。

### 時間安排
自己都特地跑到一個偏遠地區、就是想遠離任何干擾，說實在是挺有效的。所以基本上沒有什麼外務纏身、時間很充裕，主要也是在測試自己的意志力，時間都放在那裡了，到底能不能好好利用。

雖然目前來說、好像有點每下愈況。（ 汗 ） 

### 持續有輸出的學習方式
自己對於學習與做筆記還在摸索當中。
課程都是很友善地以初學者出發、善用各種比喻，所以教學影片就算只是講理論也都滿好理解的，但隔天的理解度就變成 50 %，或是我自己稱為「假性理解」，因為試圖用自己的話解釋就會卡住。

這時候再上網查不同資料就會很有幫助，就像同一個物體、每個人看到的角度都不同。

同一件觀念，看 5 個參考文章，會得到 5 種面向的解釋，雖然越查越困惑的情況也不在少數，但聽 Huli 講完課有個大方向的理解，有時間的話再看其他教學文的解釋，最後用筆記統整成自己的理解內容。 
很多時候我直接看教學文都是看不懂的，有了 Huli 給的世界觀的前提再去深入理解，就變得沒有這麼困難了。

所以前幾週都有練習「 用自己的話解釋某觀念 」的作業，覺得這作業出的真好！

像是第四週，當時的日記寫著：
「 覺得 http 筆記寫的蠻好的，之前看一遍覺得懂了，但當我要寫下來才發現還是有許多可以釐清的地方，消化過再輸出成自己的語言，真的好重要！ 」

總而言之，希望能保持著不斷有 **output** 的學習，才對得起課程用心的 **input**

（ 不過我自己是有點猶豫關於課程筆記的拿捏，寫太簡略我看不懂、寫太詳細都快變成逐字稿了。因為畢竟不是免費的課程，擔心 Huli 會不會覺得侵犯到課程的財產權，所以如有感到一絲不妥，麻煩跟我說一聲，可以撤下來當自己本地筆記也沒問題喔，謝謝～ ）

### 先別急著問
雖然我知道大家都鼓勵多問問題，但我嘗試了一種方法，如果不是三分鐘能解決的問題、就先列下來，不要急著查資料、也不要急著問，等本週的重點學習內容都告一段落，再來 google 所有列下來的問題，自己找解答、同時試著回答那個不懂的自己，真的找不到再發問。

會這麼做是因為自己很愛問問題、也很急性子，而我的經驗是，只要是我迅速拋出去的問題，得到的答案都不會留在我記憶太久，可能是因為還沒痛過、解答也來得太方便。

而這方法其實是以前主管教我的。

「你的問題先寫在一張紙上，留到我全部說完再發問。」

場景是我坐在他位子旁邊，主管手把手地教我某個功能，在過程中我總是會產生超多問題想問，一直想打斷主管，他可能被我搞瘋了，所以教（逼）我用這種方法之後，整個豁然開朗。

因為許多問題根本不需要發問，我要的答案都在之後會講的內容裡，而我需要的只是**聽到最後**，那時候才知道。

> 我會不會只是缺乏等候答案的耐心？

### 待研究問題
- [ Git ] 切換 commit，研究 head 運作
- [ Shell ] 研究 parallel 一次下載多個檔案
- [ 演算法 ] 各種排序法：試著寫成程式碼
- [ 名詞解析 ] library、module、package (函式庫、模組、套件) 之間的差別
- [ 測試 ] 怎麼下「 有效的 」測試資料 edge case 、 corner case
- [ JS 特性 ]
    - 「淺拷貝」＆「深拷貝」的差異
    - 非同步概念
- [ 發送請求 ] 
    - 同源政策 與 CORS
    - request 跟 response 的 header 的欄位
- [ 瀏覽器 ] 瀏覽器的渲染過程

### 未完成作業
- `week2` 超級挑戰題
- `week3` 超級挑戰題
- `week5`
    - HTTP GAMES : Lv14
    - OJ 挑戰賽 #1 : 友好數 

### 可優化作業
- `week2` 綜合練習 Lv3_4 ： 改成超過 3x3 陣列也適用 
- `week3` hw5： 大數加法 ： 改成陣列寫法
- `week4` 挑戰題 & 超級挑戰題 ： 改成 callback
- `week5` curl 下載多檔 ： 改用 `parallel` 一次下載全部
    
### 許願池

有能夠看某個同學的所有學習報告的功能嗎？

---

> 最後，感謝 @Huli 用心的課程內容、以及每次發問都超即時的回答，參加第三期的計畫真是我今年最好的決定。

還有感謝 @isshin、@ChihYang41 同學第五週的心得分享，內容讓我獲益良多，寫法也參考了同學的格式。
