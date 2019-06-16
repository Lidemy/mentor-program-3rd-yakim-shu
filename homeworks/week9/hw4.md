## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

- `char` ： 長度為 0 ~ 255，當儲存字串不夠 255 的長度時，會用空格補齊剩餘的空間，因此讀取時必須把後面空格去除。
- `varchar`： 可以設定最大長度，適合用在文字量少的欄位，可以有預設值。
- `text`： 不可設定長度，適合用在文字量多的欄位，最大长度为 2 ^ 31 - 1 個字符，不可以有預設值。

查詢速度： 
- char 最快， varchar 次之，text 最慢。
- 由于 varchar 查询速度更快，所以能用 varchar 的时候就不用 text。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又會以什麼形式帶去 Server？

當瀏覽器接收到 Server 端帶有 `Set-Cookie` 指令的 Response 時，會將 cookie 的 key & value 存放在瀏覽器裡面。

當瀏覽器再次發送 Request 到 Server 端時，會比對瀏覽器的 Cookie 存放區有沒有該 domain 的 cookie，並檢查其他屬性（ 過期時間、路徑... ），如果相符合的話就會帶入 Request 一起送過去。

可以設置的屬性值：
- `name=value` 必填 
- `expires=date` 該 cookie 的有效日期
- `path=path` 路徑名
- `domain=domain` 網域名
- `secure` 指定該 cookie 只能傳送給 HTTPS 伺服器

值得一提的是因為 cookie 存放在 client 端、極為不安全，所以後來有增加一些方法來提高安全性：
- `secure` ： Secure cookie 只有在以加密的請求透過 HTTPS 協議時，傳送給伺服器。
- `HttpOnly` ： 只能夠透過 HTTP(S) 存取，不能用 JS 存取。
    - 為了避免跨站腳本攻擊 (XSS)，JavaScript 的 `Document.cookie` API 無法取得 HttpOnly cookies，他們只傳送到伺服器。
    
但即便是 Secure ，敏感的資訊絕對不該存在 cookies 內，因為他們本質上還是不安全的。
 
參考資料：
- [解釋 Cookie 的特性](https://blog.miniasp.com/post/2008/02/22/Explain-HTTP-Cookie-in-Detail)
- [十分鐘學 [ Cookie ]](https://www.csie.ntu.edu.tw/~r92092/html/tech/cookie.html)
- [HttpOnly - HTTP Headers 的資安議題 (3)](https://devco.re/blog/2014/06/11/setcookie-httponly-security-issues-of-http-headers-3/)

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

辨識使用者是設置一個會員 id 的 cookie，看得出來是流水號，因此只要打開 dev tool，去更改 cookie 的 value，就可以冒充其他會員。

目前想到的解決方法是要改成「 沒有規則性 」的 value，不能讓 client 端透過會員的帳號或流水號去試圖篡改身份。