## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

最重要的差別就在於：加密可逆、雜湊不可密。

#### 雜湊：單向生成，無法反推出原來的原碼
- 將 **不定長度** 訊息的輸入，演算成 **固定長度** 雜湊值的輸出，即輸出的長度不受原文長度影響。
- 同樣的輸入 -> 一定是同樣的輸出
- 但因為長度是有限的，所以不同輸入也「 可能有同樣的輸出 」，雖然機率非常低，而如有這種情況、又稱為「 碰撞 」Collision。
- 為了防止被攻擊破解，通常會再加鹽 (salt)，指的是再加入一組亂數（有可能是以當下時間為基底的亂數），這樣就算破解了也難以知道原碼，除非連加入亂數的方式也被破解。

最常見的攻擊方法：
- 窮舉法又稱暴力破解 ( brute-force )
    - 就是將所有可能的數列組合都丟進去跑。
    - 長度要是超過一定程度、運算時間會倍增，每增加一字元，密碼組合數量會以數十倍來指數成長。
- 字典法 ( Dictionary Attacke )
    - 嘗試所有「 常見的密碼 」或使用者的身份資料（親人姓名，電話，出生月日）當作字典資料庫，尤其是出現頻率的密碼組合，例如： password, mypassword, abc123, 1234567... 等等
    - 效率要比窮舉法好得多，特別是資安概念不佳的使用者，但對於密碼無規律者沒效。
- 彩虹表 ( rainbow table )
    - 指的是把所有可能的輸入都丟進雜湊函數，額外產生一張 hash值 輸出列表，所以本質上也算是一種暴力攻擊法。
    

#### 加密：拿到密鑰的方式就可以逆推回去
- 需要密鑰，且可以透過解密得到原文。
- 分為「 對稱式 」、「 非對稱式 」
- 對稱式加密：
    - 常見演算法： DES, 3DES, AES
    - 密鑰要是太簡單或長度太短，安全性以及在實際應用上不夠理想，所以出現安全性更高，應用範圍更廣的非對稱式加密（Asymmetric Encryption）。
- 非對稱式加密：
    - 常見演算法： RSA, DSA, ECC
    - 演算法會有兩把鑰匙，一把稱做公鑰（可以公開），另一把稱做私鑰（自己要藏好）。
    - 可以生成數位簽章，確認密文的傳送方身份真的是本人。

參考資料：
- [加密和雜湊有什麼不一樣？](https://blog.m157q.tw/posts/2017/12/25/differences-between-encryption-and-hashing/)
- [如何區分加密、壓縮、編碼](https://blog.m157q.tw/posts/2017/12/23/differences-between-encryption-compression-and-encoding/)

## 請舉出三種不同的雜湊函數
- MD5：已被破解
- SHA-1：已被破解
- SHA-512

## 請去查什麼是 Session，以及 Session 跟 Cookie 的差別

Http 協議是**無狀態協議**，他是一個 Request -> 處理 -> Response。

意指每次發 Request 的動作都是各自獨立的，並不會紀錄之前執行過的動作。每次請求都不會紀錄上次執行的動作，所以 Session 機制就是讓我們可以判斷使用者是否已經登入過。

Session 機制算是一種**概念**，所以不同語言有不同的實現方法。

簡單來說就是新訪客造訪網站時，會建立一個新 Session（週期），Server 端就可以對應 Session 表找到此 Session ID，來辨識這是以前造訪過的訪客跟訪客資料。

而要實作 Session 可以有兩種作法，一個是用 cookie 儲存 Session ID 在瀏覽器上，一個是儲存 Session ID 在伺服器上。

#### Cookie： 
- 儲存位置：Client side	 
- 發送一個「 帶有 Session ID 的 Cookie 」在瀏覽器裡，而以後同一網域、同一個瀏覽器發送的每個 Requset 都會帶上此 Cookie。

#### Session： 
- 儲存位置：Server side (通常放在 Server 記憶體或 DB)
- 新增一個 Session ID 在伺服器裡，而因為是存在伺服器裡，是個比較安全的做法。

##include、require、include_once、require_once 的差別
`require()`
- 適合用來引入靜態的內容
- 執行時，如果 require 進來的檔案發生錯誤會顯示錯誤，立刻終止程式，不再往下執行。
- 不可以用在迴圈

`include()`
- 適合用來引入動態的程式碼。
- 執行時，如果 include 進來的檔案發生錯誤的話，會顯示警告，不會立刻停止
- 可以用在迴圈

`require_once()` & `include_once()`
- 使用方法跟 `require`、`include` 一樣，差別在於在引入檔案前，會先檢查檔案是否已經在其他地方被引入過了，若有，就不會再重複引入。

#### 結論：
- 如果系統找不到引入檔案時，希望馬上停止，使用 `require_once()`
- 如果系統找不到引入檔案時，希望繼續執行，使用 `include_once()` 

#### 常見問題：
- 要注意檔案路徑：
    - 如果 `A 檔案` 引用了 `B 檔案`， `B 檔案` 又引用 `C 檔案` 進來，假設 A, B, C 三個檔案都在不同資料夾層級，這時引用路徑很有可能搞混，最好是用一個常數紀錄 根目錄 Sitebase 作絕對路徑。
    
參考資料：
- [[PHP]include 與 require 的差別](http://syunguo.blogspot.com/2013/04/phpinclude-require.html)
- [Include,require,include_once,require_once的區別](https://registerboy.pixnet.net/blog/post/24261631)