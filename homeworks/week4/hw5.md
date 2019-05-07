# 作業
## 請以自己的話解釋 API 是什麼
全名為 Application Programming Interface，中文翻譯為「應用程式介面」

> 簡單來說就是方便溝通、交換資料的管道。

怎麼說方便溝通呢？ 我自己覺得中國的翻譯：「接口」，比較容易想像。

就像是把家裡的 **插頭 (開發者)** 插進 **插座(API)** 就 **有電(資料交換)**。

而 API 有分很多種：
- 軟硬體廠商的 API
- 有作業系統用的 API ，用於傳輸、寫入、讀取資料...等等電腦上一切的操作
- 自己團隊內部用的 API 
- 而對於網頁來說就是 Web API
  - 是基於 http 協定下運作的 API

以網頁用的 Web API 來舉例，就像是對方定義好了插座的規格，我們只要照著規格、把形狀合適的插頭插上去，就可以得到我要的資料，而你不會知道資料是怎麼來的，就像你不知道電是怎麼傳過來的（ 或許你知道 ）

> 你只是呼叫 function 加上參數，就會得到一個結果，中間的商業邏輯與資料篩選是提供 API 的 Server 端來處理。

#### Web API 實際上最常應用的場景
一般來說，Web API 就是只透過 HTTP 協定的 API，有幾個常見的應用：

- 會員登入
- 社群嵌入
    - 分享、按讚按鈕、嵌入貼文、留言板、影音
    - 例如：[Facebook Graphic](https://developers.facebook.com/docs/graph-api?locale=zh_TW)
- 資料嵌入
    - 例如：[Yahoo 氣象](https://developer.yahoo.com/weather/)、[Google 地圖](https://developers.google.com/maps/documentation/timezone/start?hl=zh-tw)
    
以網站來說，最常用的應該是登入系統，現在不管哪個網站，在會員登入頁，大部分都會有 Facebook 跟 Google 登入按鈕，**這麼做對開發者、用戶、甚至是供應商，都是有利的狀況**：
- 開發者： 取自大神的登入功能，安全又省力
- 用戶： 幾乎每個人都有帳號，無須花時間填寫會員資料
- API 供應者： 
    - 免費的廣告
    - 獲取使用者操作與使用習慣的資料，再進行分析，以方便投放更精準的廣告
    
#### 一個好的 API 應該要有下列條件
- 完整的 API 文件說明與規範
- 有範例程式，解釋如何運用於應用程式中
- 有教學指引，一步一步帶領開發者學習使用 API
- 合理的命名規則
- 適當的防呆措施、必須預防開發者在錯誤使用時，也不會造成嚴重的傷害
- 一開始就要有清楚的規劃、使用情境，因為一但更新或改動，客戶端都要做相對的審視與修改。

參考資料：
- [What is an API? - Application Programming Interface](https://www.youtube.com/watch?v=B9vPoCOP7oY)
- [什么是API，接口？](https://www.youtube.com/watch?v=Pbx4elFAXR0)
- [API設計和應用程式設計的不同？](https://www.ithome.com.tw/voice/87207)
- [API ? SDK? 傻傻分清楚](https://blog.jyny.tw/2013/01/api-sdk.html)
- [什麼是API?](https://cola.workxplay.net/what-is-an-api/) ( 販賣機例子非常好懂 )

---


## 請找出三個課程沒教的 HTTP status code 並簡單介紹

`418` 居然是官方的 Status Code，原來無聊的協定裡還是可以找出一些有趣鬧劇，覺得很有希望！
`7xx` 開頭的都是非官方、後來被擴充的，應該也沒人在乎啥時用得到，幽默感拯救世界！

- `418` I’m a teapot：我是一個茶壺，不會泡咖啡。
- `747` Motherfucking Snakes on the Motherfucking plane： 他媽的蛇在他媽的飛機上
- `767` Drunk： 喝醉了


參考資料：
- [常見與不常見的 HTTP Status Code](https://noob.tw/http-status-code/) 

---

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

## Awesome Restaurant API

> 最新版本為： v1.0

Awesome Restaurant API 為幫助開發者，獲取及使用全台的餐廳資料，如果需要進行新增、刪除、更改資料的功能，必須要先申請 **token** 以獲得權限。

### 使用說明

| 說明     | Method | token  | path       | 參數                   |
|--------|--------|---------|----------|----------------------|
| 獲取所有餐廳 | GET || /restaurant | _limit:限制回傳資料數量，上限 100  | /restaurant?_limit=5 |
| 獲取單一餐廳 | GET   |  | /restaurant/:id | 無  | /restaurant/10 |
| 新增餐廳   | POST   | 必須 | /restaurant | name: 餐廳名 |            
| 刪除餐廳   | DELETE | 必須 | /restaurant/:id  | 無 |            
| 更改餐廳資訊| PATCH   | 必須 | /restaurant/:id  | name: 餐廳名 |   

### Request 參數說明

- `_limit` ： `int`
- `name` ： `string`

### 範例
- `GET` 獲取所有餐廳： `/restaurant`
- `GET` 獲取前 `n` 個餐廳： `/restaurant?_limit=<n>`
- `GET` 獲取 `id 為 10` 的餐廳： `/restaurant/10`
- `POST` 新增餐廳： `/restaurant?name=<new-restaurant>`
- `DELETE` 刪除 `id 為 10` 的餐廳： `/restaurant/10`
- `PATCH` 更改 `id 為 10` 的餐廳名： `/restaurant/10?name=<new-name>`
    
---
## Get Start

Base URL： `https://awesome-restaurant.com`

#### Example GetResturant Request

你可以選擇其中一種方式，獲得前 3 家餐廳的資料。

1. 在終端機用 curl 發 request

```shell
curl -X GET "https://awesome-restaurant.com/restaurant?_limit=3"
```

1. 在 Node.js 環境下，使用 npm 套件：`request` 發 HTTP request

```javascript
const request = require('request');
request.get(
  'https://awesome-restaurant.com/restaurant?_limit=3', (error, response, body) => {
    console.log(JSON.parse(body));
  },
);
```

#### Example GetResturant Response
Response 欄位說明

- `id` ： 餐廳編號
- `name` ： 餐廳名
- `phone` ： 餐廳電話
- `address` ： 餐廳地址
- `price`： 餐廳價位

```json
[
  {
    "id": "1",
    "name": "Just Awesome Pizza",
    "phone": "0987123456",
    "address": "台北市好棒棒街25號",
    "price": "$$$"
  },
  {
    "id": "2",
    "name": "Less Awesome Bistro",
    "phone": "0971234856",
    "address": "台北市沒那麼棒街1號",
    "price": "$"
  },
  {
    "id": "3",
    "name": "Not Awesome at all Bakery",
    "phone": "0934353950",
    "address": "台北市掰不下去街10號",
    "price": "$$$$$"
  },
]
```
