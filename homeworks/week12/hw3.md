## 請說明 SQL Injection 的攻擊原理以及防範方法
## SQL Injection
```
// => 正常輸入
帳號： 123
密碼： 456
```
```sql
// 接收輸入的 SQL
SELECT * FROM users WHERE user='123' AND pwd='456';
```

以上是填帳號密碼的欄位，接收到開發者預期的**正常輸入**，再根據使用者的輸入去撈資料。

而 SQL Injection 的本質就是把「 輸入的惡意資料」 變成「 程式的一部分 」

意思是駭客可以在輸入資料時，用一些奇怪的方式（惡意字串）竄改 SQL 語法，以偷取、假冒別人資料或刪除資料庫，例如以下輸入就可以成功登入別人帳號：

```
// => SQL Injection
帳號： ' or 1=1 --
密碼： (甚至不用輸入)
```
```sql
// 接收輸入的 SQL
SELECT * FROM users HWERE user='' or 1=1 --' AND pwd =''; // => 永遠成立
```

- SQL 語法中的 `--` ： 代表註解，所以後面的條件就被忽略
- 因為條件多了 `or 1=1`，且 `pwd` 也因為註解被忽略掉，所以 `WHERE` 條件永遠成立，就可以成功登入帳號了。
- 照理來說會登入**第一個**篩選到的帳號

#### 解決方法： prepare statement
prepare statement 做的就是幫我們處理 SQL 跳脫這件事

步驟：
- 把要放的參數都改成問號
- 其實就是 SQL query 換種寫法，拿到資料後的操作是差不多
- 要注意的是 `bind_param()` 的第一個參數，有幾個參數就要寫幾個字元，字元依照參數的資料類型而定
    - `string` => `s`
    - `int` => `i`

```php
$stat = $conn->prepare("SELECT * FROM users WHERE username=? and pwd=?"); // => 把參數換成 ?
$stat->bind_param('ss', $username, $password); // => 替換成準備好的參數
$stat->execute(); // => 執行 query 語法
$result = $stat->getResult(); // => 執行結果
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc(); // => 撈資料
}
```

---
## 請說明 XSS 的攻擊原理以及防範方法

## XSS 在別人網站執行 Javascript ( Cross-Site-Scripting )

跟 SQL Injection 一樣，本質也是讓使用者「 輸入的資料」 變成「 程式的一部分 」

利用 input 欄位可以輸入內容的特性，只要使用者輸入特別的 JS 語法，且網頁有 **輸出此內容** 的時候，就可以竄改網頁或竊取資料。

XSS 漏洞分為幾種類型：

#### 儲存型 XSS ( Stored )
- 網址列看不出問題
- 最常見的例子就是網站留言板或是訊息，因為使用者可以留任何訊息。
- 存在 DB 裡，所以每個使用者打開都會看到被修改的內容
- 殺傷力最大

```html
<input type="text" placeholder="輸入內容"> // 輸入欄位
<script>alert("XSS攻擊測試");</script> // 輸入惡意碼

<p>文字文字文字</p> // => 正常輸出
<p><script>alert("XSS攻擊測試");</script></p> // => 不正常輸出，且每個使用者都會中標
```

#### 反射型 XSS ( Reflected )
- 把惡意程式藏在網址列裡，放在 GET 參數傳遞
- 必須誘導使用者點到假連結才有用
    - 但網址列看起來會很可疑，可用短網址或[特殊編碼](https://meyerweb.com/eric/tools/dencoder/)魚目混珠

如果網頁是在網址上用參數判斷狀態：`login.php?status='登入失敗'`，且輸出錯誤訊息的方式是 **直接把 value 印在網頁上**，那麼只要把 value 換成 js 語法就可以攻擊成功

```php
// 網頁程式
if (isset($_GET['status']) && !empty($_GET['status'])) {
    echo $_GET['status'];
}

// 網址列
http://www.example.com?status='新增成功'  => 印出新增成功
http://www.example.com?status=<script>alert(1)</script>  => 執行惡意程式
``` 
        
#### DOM 型 XSS
- 可能是頁面上有使用到 `.html()` 或 `.innerHTML()` 的語法 
- 所以就可以直接放 JS 語法
- 跟前兩種 XSS 不一樣，此漏洞要在前端檢查
- 最好都改成 `.innerText()`=> 只會輸出純文字



---

### 所以要是能注入 JS 能幹嘛？

最常見的是偷 cookie 資料：
- 通常會放在一張隱藏圖片 `<img>` (因為不受同源政策影響)，然後在 `src` 裡面發送一個 **帶著 cookie 資訊的 reqeust，傳送到自己的 Server**，這樣就可以拿到點此網址的使用者 cookie 了

```javascript
<img src="" onerror="sendRequest('document.cookie')";  
// src 讀取失敗，執行 onerror
// sendRequest() => 只是拿來說明可以送 request 到自己 Server，單純舉例用
```

---

#### 要在哪裡檢查？輸入 or 輸出
檢查有無惡意碼的時機，可以分為在「輸入之前」跟「輸出之前」，一般建議是**無論如何、輸出端的檢查一定要做！**

#### 輸入驗證：

因為 XSS 有太多漏洞可以鑽： HTML, JavaScript, CSS, XML, URL，要很完整對輸入做防範非常困難。

例如刪除所有 `<script>`、 `onerror` 及其他可以執行 JS 的字串，但設黑名單也不是一個理想的方式，因為有太多種變形可以換，白名單是比較推薦的作法，只是要寫的完整也是非常麻煩。

#### 輸出驗證：
## 使用跳脫字元 escape
- 如果「 輸出內容 」使用者可以操作，絕對不能輸出原碼（ 未經處理 ）
- 把內容轉譯成純文字，而不是程式碼

```php
// php 跳脫字元的內建函式 htmlspecialchars
echo htmlspecialchars($str, ENT_QUOTES, 'utf-8')
```

```html
// 輸出時需要 encoding
& --> &amp;
< --> &lt;
> --> &gt;
" --> &quot;
' --> &#x27;     
/ --> &#x2F;
```

參考資料：
- [XSS攻擊的深入探討與防護之道](https://www.qa-knowhow.com/?p=2992)
- [XSS攻擊的原理與防範措施](https://beautyofprogram.com/2018/10/xss%E6%94%BB%E6%93%8A%E7%9A%84%E5%8E%9F%E7%90%86%E8%88%87%E9%98%B2%E7%AF%84%E6%8E%AA%E6%96%BD/)
- [駭客如何用XSS讀取 Cookie?](https://www.qa-knowhow.com/?p=2951) => 列出許多 XSS 輸入碼，有興趣可以看看


---

## 請說明 CSRF 的攻擊原理以及防範方法

### CSRF 原理
其實跟 XSS 有點像，CSRF 的原理是，駭客在其他網頁塞入一個「 目標 domain 」 的連結，偷偷發 request（ 利用隱藏圖片或隱藏表單 ）。

所以假設你點入駭客提供的 A 網站，其實背後已經發了個 B 網站的 request 而渾然不知。

而這漏洞最可怕的是，如果**你曾造訪過 B 網站，且 B 網站的 session 週期還沒過期（換言之，還在登入狀態）**，同時 B 網站的 Server 驗證機制不夠全面，B 網站很可能就會認為此 request 是來自本人**造訪 B網站** 。

結論：如果你在某網站是保持登入狀態，就存在 CSRF 的風險，其手法是欺騙瀏覽器、讓網站以為是使用者本人的操作。

聽起來還是不知道可怕在哪，只要試想把 B 網站換成「 我們常用的網路銀行 」，有可能你默默就把錢轉出去也沒發現，就知道 CSRF 是很危險的。

## 防範方法

以下內容完全就是大大的 [讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/) 筆記內容，原來有這麼多方法，其實還滿有趣的，簡直就是開發者跟駭客之間角力戰的歷史過程。



#### 不推薦做法

☞ 比對 request 參數 & session_id （不安全）
- 漏洞：典型的 CSRF 漏洞，有可能從別的 domain 發出惡意 request，如果我是登入狀態，一樣會被攻擊

☞ 傳送方式從 GET 改為 POST（不安全）
- 漏洞： 開一個隱藏 iframe，把 form 藏在裡面，一載入自動 submit

☞ 把 API 改成只接收 JSON（不安全）
- 漏洞： 把 `content type` 改成 `text/plain`，一樣可以用 form 傳送 JSON 
- 雖然 Server 可以擋 `text/plain`，但如果 Server 的 `Access-Control-Allow-Origin: *`，代表別的 domain 的 request 都可以發過來 

☞ 檢查 request 的 header Referer，擋掉不合法 domain（不安全）
- 漏洞：url 變形方法很多，且 user 有可能不會帶上 Referer，不是很保險

---
#### 推薦做法
##### ☞ 加上圖形驗證碼、簡訊驗證碼
- 安全但麻煩，通常有金流操作的網站才會用

### ☞ 加上 CSRF token
- 產生： Server
- 儲存： Server 

在 form 裡新增一個 `name='csrftoken' value='<亂碼>'`，比對 Server 端的 session
- 漏洞：攻擊者可以先發一個 request 取得 csrftoken

#### ☞ Double Submit Cookie
- 產生： Server
- 儲存： Client
 
一樣在表單放 CSRF token，但這次參照值不是存在 Server 裡，而是存在 cookie 裡

這方法利用的是 cookie 只會從相同 domain 帶上來，攻擊者無法從不同 domain 帶上此 cookie

- 漏洞： 攻擊者如果掌握了你底下任何一個 subdomain，就可以幫你來寫 cookie

#### ☞ Client 端生成的 Double Submit Cookie
- 產生： Client
- 儲存： Client

之前提的 Double Submit Cookie，是由 Server 產生、存在 Client 的 Cookie

但由於 SPA 在拿取 CSRF token 會有困難，所以可以改成 Client 端生成，此 cookie 只是要確保攻擊者無法取得、沒有包含任何敏感資訊，所以不避擔心安全性考量
- 某些 library（如：axios），只要設定好 cookie 的值，會幫你自動在 request 的 header 填上 cookie 值，就不用每個表單都要手動加。

---

### ☞ 瀏覽器端的防禦：SameSite cookie ( 最推薦 )

其原理就是**幫 Cookie 再加上一層驗證**，不允許跨站請求。

意思是除了在 B 網站這個 domain 發出的請求，其他 domain（如 A 網站）的發出的 request 都不會帶上此 Cookie，等於是張更安全的通行證。

只要在設置 Cookie 加上：

```php
Set-Cookie: session_id=<id>; SameSite=strict
```

SameSite 有兩種模式：`Strict` 、`Lax`
#### `strict` 嚴格
- `<a href="">, <form>, new XMLHttpRequest`... 等標籤，只要不同 domain 都不會帶上此 Cookie
    
#### `Lax` 寬鬆
- 上述標籤可以帶上 cookie
- 除了 `Get` 方法，其他的 `POST`、`DELETE`、`PUT`... 都不會帶上 Cookie 
- 意思是 Lax 模式之下就沒辦法擋掉 `GET` 形式的 CSRF


所以某些網站會準備兩種 cookie，一般瀏覽網頁時、帶上**沒有 `samesite` 的 Cookie**。

當使用者有敏感操作（如：購買、帳戶...等），會帶上 `SameSite=strict` 的 Cookie，所以如果從外部網站發 B 網站的 request 就會要求重新登入，讓攻擊者無法 CSRF（ 常用購物網站的人一定超有感 ）
