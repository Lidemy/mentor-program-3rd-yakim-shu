# 簡答題

## 什麼是 DNS？

當我們在上網的時候，實際上是造訪網頁的 IP 位置，但由於 IP 位置不好記憶，所以會輸入網址替代，而 DNS Server 提供把網址指向 IP 位置的功能，使用者就不用記住 IP 位置。

一般來說如果沒有特別指定 DNS，預設會是 ISP 業者提供（可能是中華電信 `168.95.1.1`），Google 有推出免費的 DNS `8.8.8.8`，而 Cloudflare 也提出號稱更安全且更快的 DNS `1.1.1.1`。

挑選 DNS 的重點：
- 速度
    - DNS 也影響到了網路速度，就算網速再快，DNS 解析速度慢也是枉然
- 安全性
    - 在選擇 DNS 伺服器時除了速度要快外，還需要注意伺服器本身的安全性，避免被駭客隨手竄改 DNS 紀錄做些壞壞的事。

## Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

對大眾來說：
- 照理來說，Google 的 DNS 應該會比一般 ISP 業者提供的 DNS 速度更快（ 實際上不一定，當地 DNS也有可能更快，要經過實測 ）
- 比較穩定，不用怕 ISP 業者的 DNS 壞掉

對 Google 來說：
- 搜集更多使用者資料，進而加強廣告演算法精確度


參考資料：
- [Google Public DNS上網跑更快，用戶端趕快更換IPv4 DNS設定8.8.8.8與8.8.4.4](http://www.pcdiy.com.tw/detail/1412)
- [教學】簡單設定DNS立即提升iOS、macOS和win網路速度技巧](https://mrmad.com.tw/cloudflare-dns-1111)
 
## 什麼是資料庫的 lock？為什麼我們需要 lock？
在更新之前，把資料先鎖起來，避免有另一筆 query 同時操作

( lock 要放在 transaction 裡面才有用 )

- 優點：
    - 解決 Race condition 有可能造成的超賣問題
- 缺點：
    - 因為欄位會被暫時鎖住，後面來的操作需要等待，所以會有效能上的損耗
- 有分兩種等級：
    - Row lock: 只鎖定某欄位（ 建議 ）
    - Table lock: 鎖定整個 table ( 不建議，因為很耗效能 )


## NoSQL 跟 SQL 的差別在哪裡？

最大的差別在於，SQL 需要事前嚴謹的定義欄位、進行正規化，以及符合 ACID 規則以保持數據完整性。而 NoSQL 比較彈性，可接受零散的資料，基本原則是是 CAP 定理 (選擇其中兩項)。

以下是 NoSQL 的特性：
1. SQL 使用事先定義好的 schema 結構，而 NoSQL 則使用 key-value 存資料，可以想像成是 JSON 檔存在資料庫
2. 每筆資料之間沒有關聯，所以可以任意切割或調整，具有很大的彈性，不像 SQL 上線以後要進行欄位變更非常麻煩
3. 不支援 JOIN、以及 schema 的資訊跟功能，例如：primary key、index、triggers、stored procedures...
4. 適合儲存結構不固定且大量的資料，例如：程式 log、搜集使用者資料
5. 不適合應用在資料嚴謹的專案，例如：銀行

參考資料：
- [SQL vs NoSQL: The Differences](https://wiki.kshuang.xyz/doku.php/database:sql_vs_nosql)
- [從 SQL 到 NoSQL 悟人生](https://medium.com/@diagonalyang/https-medium-com-diagonalyang-sqlvsnosql-11b65f2e1659)
- [閃開！讓專業的來：SQL 與 NoSQL](https://ithelp.ithome.com.tw/articles/10187443)


## 資料庫的 ACID 是什麼？

在 SQL 資料庫的 Trasaction (交易) 中，為確保每筆交易都是可靠的，必須要符合 ACID 原則：

#### Atomicity (原子性）
- 每一筆 transaction 都是 all or nothing，不是全部成功、就是全部失敗
- 一但有錯誤就立刻停止，且回復到交易前的狀態 (Rollback)，不會發生部分失敗的問題
    - 全部 SQL 執行成功 -> `commit`
    - 只要有一個 SQL 失敗 -> `rollback`
    
#### Consistency (一致性）
- 在交易前後，資料庫欄位必須處於合法狀態，意思是必須遵守資料庫所強制的規則以及資料的精確性。
- 以資料為例：
    - A 有 100 元、 B 有 200 元
    - A 轉帳給 B : 50 元
    - 此時 A 剩 50 元、B 有 250 元
    - 而不論交易前後，總額都是 300 元

#### Isolation (隔離性）
- 防止不同 transaction 彼此干擾，所以如果有兩筆 (A, B) 同時操作到同一區域的資料，B 要等 A 結束才能進行（或相反），所以可以確保 B 不會拿到 A 操作到一半的資料。

#### Durability (持續性）
- 交易完成後對資料的修改是永久性的，資料不會因為系統重啟或錯誤而改變。

參考資料：
- [[SQL Server] 了解ACID](https://retrydb.blogspot.com/2017/04/sql-server-acid.html)
- [Database Transaction第一話: ACID](http://karenten10-blog.logdown.com/posts/192629-database-transaction-1-acid)
