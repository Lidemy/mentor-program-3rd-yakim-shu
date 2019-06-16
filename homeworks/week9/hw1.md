table: users

| 欄位名稱 | 資料資料 | 說明 | 備註  |
| --- | --- | --- | --- |
| id | int |  | Private Key，對應到 commnets 的 user_id |
| username | VARCHAR(16) | 會員帳號 | 唯一 |
| password | VARCHAR(16) | 會員密碼 |  |
| nickname | VARCHAR(32) | 會員暱稱 | 唯一 |
| created_at | datetime | 建立會員時間 | 預設值：current time |


table: commnets

| 欄位名稱 | 資料資料 | 說明 | 備註  |
| --- | --- | --- | --- |
| id | int |  | Private Key |
| user_id | int | 會員 id | 對應到 users 的 id |
| content | text | 留言內容 |  |
| created_at | datetime | 留言時間 | 預設值：current time |

