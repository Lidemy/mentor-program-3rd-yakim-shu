# hw1：API 設計

## 行前準備

為彌補 13 週沒試出 RESTful API 的遺憾，這週目標以實現 RESTful 為目的找資料。

### 先看 PHP 的實現方法
- 參考資料：[Build a Simple REST API in PHP](https://developer.okta.com/blog/2019/03/08/simple-rest-api-php)

看起來滿好懂的，一樣先寫好 CRUD 的 function，再由 `path` & `method` 去判斷呼叫哪個 function


---

## 設計 URI & 改寫 .htaccess


### 如何寫 .htaccess Rewrite ( Controller )

寫 `.htaccess` 轉址

```
# Turn rewrite engine on
RewriteEngine on

# map neat URL to internal URL
RewriteRule ^list/$  RestController.php  [nc,qsa]
RewriteRule ^list/([0-9]+)/$  RestController.php?id=$1 [nc,qsa]
```

參考資料:
- [PHP RESTful Web Service API – Part 1 – Introduction with Step-by-step Example](https://phppot.com/php/php-restful-web-service/)
- [Apache Rewrite with Htaccess 理解與技巧](https://medium.com/@awonwon/htaccess-with-rewrite-3dba066aff11)

---

### 新建一張 table Todos

- 列出 Todo 的 schema

table: Todos

| 欄位名稱 | 資料資料 | 說明 | 備註  |
| --- | --- | --- | --- |
| id | int | Todo id | Private Key |
| content | varchar(512) | Todo 內容 | |
| status | int | Todo 狀態 | `完成: 1 | 未完成: 0` ( 預設 0 ) |
| created_at | datetime | 建立 Todo 時間 | 預設值：current time |


---

## 寫 CRUD 的 Class

設計一個 `TodoHander` 的 Class，裡面包含：
- CRUD
    - `getAll()`
    - `get($id)`
    - `delete($id)`
    - `create`
    - `update($id)`
- 路由 `processRequest`
    - 判斷不同 request method 、呼叫不同 CRUD
        - `GET` => `getAll()`
        - `GET / id` => `get($id)`
        - `DELETE / id` => `delete($id)`
        - `POST` => `create()`
        - `PATCH / id` => `update($id)`

---

## 遇到的問題

#### ☞ Q1: 如何取的 POST、PATCH method 的 request body 內容？

> `(array) json_decode(file_get_contents('php://input'), TRUE);`

- 取得 request json 格式，再轉成 array
- 有點神奇，看不太懂，就是直接 copy 教學
---

#### ☞ Q2: 部署到遠端網址，如何讓 `.htaccess` 生效？

- 先 ssh 登入遠端主機
- 修改 `000-default.conf`

```shell
vim /etc/apache2/sites-available/000-default.conf
```

- 加入以下內容

```
<Directory /var/www/html>
    AllowOverride all
</Directory>
```

- 重啟 apache

```
service apache2 restart
```
    
參考資料：
- [.htaccess doesn't work on ubuntu droplet](https://www.digitalocean.com/community/questions/htaccess-doesn-t-work-on-ubuntu-droplet)

---

#### ☞ Q3: 為什麼 API 回傳值的格式全都變成字串？

```javascript
// GET : http://yakim.tw/todos/api/list/57
// 格式不對，前端還要再處理，心很累
{
    status: "success",
    result: {
        id: "57",
        content: "使用者體驗不好",
        status: "0",
        created_at: "2019-08-28 18:21:14",
    },
    message: "查詢成功",
}
```

這問題找了很久，`id` 跟 `status` 都變成字串，前端必須再處理格式很麻煩，找了半天以為是 `echo json_encode(...)` 那邊的問題，**結果後來發現是只要有做 prepare statement 就會回傳正常格式。**

```javascript
// GET : http://yakim.tw/todos/api/list/57
// 有做 prepare statement 的回傳，格式變正常了
{
    status: "success",
    result: {
        id: 57,
        content: "使用者體驗不好",
        status: 0,
        created_at: "2019-08-28 18:21:14",
    },
    message: "查詢成功",
}
```

到底是為什麼我至今還不明白，屬於一個很謎的現象。

本來回傳全部 Todo-list 的 API 沒做 prepare statement，就這樣硬生生養成好習慣了！

----

#### ☞ Q4: 在 localhost 測試會出現 CORS 問題 

用 `GET`、`POST` 都沒有問題，但當有 `PATCH`、`DELETE` 請求會出現以下錯誤訊息：


> Access to XMLHttpRequest at 'http://yakim.tw/todos/api/list/60' from origin 'http://localhost:8080' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.


但 Response Header 看起來該設的都有設（ `Access-Control-Allow-Origin: *` ），Network 也沒看到 preflight 的請求，不是很懂，煩請大大解惑。 🙇

附上 Response 截圖 ：
##### ➜ 成功的 GET 回應
![螢幕快照 2019-08-29 下午2.33.20](https://i.imgur.com/U6bKT48.jpg)


##### ➜ 失敗的 PATCH 回應
![螢幕快照 2019-08-29 下午2.34.09](https://i.imgur.com/fbyPTZa.jpg)



---

#### ☞ 修改內容 & 狀態的 SQL 指令幾乎一樣，想辦法優化

##### ➜ 原來的修改 todo SQL 指令

```php
if (isset($this->input['content'])) { // => 內容
    $sql = "UPDATE $this->table SET content = ? WHERE id = ?";
    $this->db->stmtQuery($sql, 'si', $this->input['content'], $id);
} 
  
if (isset($this->input['status'])) { // => 狀態
    $sql_status = "UPDATE $this->table SET status = ? WHERE id = ?";
    $this->db->stmtQuery($sql_status, 'si', $this->input['status'], $id);
}
```

#### 嘗試（ 一 ）： 用 php `foreach` 跑 SQL query

但跑兩次 `$sql` 會出錯，所以直接把 SQL 字串放進 `stmtQuery()` 導致不好閱讀，但暫時想不到好解法，先這樣

> 成功！

##### ➜ 用 foreach 跑指令

```php
foreach($this->input as $key => $value) {
    $this->db->stmtQuery("UPDATE $this->table SET $key = ? WHERE id = ?", 'si', $value, $id);
}
```



---

### 測試

- 如何用 postman 發 request: [【Postman - 測試Web Service的工具】](https://medium.com/@mikru168/postman-%E6%B8%AC%E8%A9%A6web-service%E7%9A%84%E5%B7%A5%E5%85%B7-c7726997868a)

---

### 最後成果： API 

```php
<?php
  require_once('utils.php');
  require_once('./lib/DB_conn.php');

  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
  header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PATCH,DELETE");
  header("Access-Control-Allow-Credentials: true"); // => for preflight

  // Handler Class
  class TodoHander {
    private $table = 'yakim_todos';

    public function __construct($db) {
      $this->db = $db;
      $this->input = (array) json_decode(file_get_contents('php://input'), TRUE);
      $this->getId();
    }

    private function getId() {
      if (isset($_GET['id'])) {
        $this->id = $_GET['id'];
      }
    }

    public function processRequest($requestMethod)
    {
      switch ($requestMethod) {
        case 'GET':
          if ($this->id) {
            $response = $this->get($this->id);
          } else {
            $response = $this->getAll();
          };
          break;
        case 'POST':
          $response = $this->create();
          break;
        case 'PATCH':
          $response = $this->update($this->id);
          break;
        case 'DELETE':
          $response = $this->delete($this->id);
          break;
        default:
          $response = $this->notFoundResponse();
          break;
      }
    }

    // => 列出全部
    function getAll(){
      $sql = "SELECT * FROM $this->table ORDER BY id ASC";
      $this->db->stmtQuery($sql, '', '');
      $arr = array();
      while ($result = $this->db->getResult()) {
        array_push($arr, $result);
      }
      sendResponseMsg('success', '查詢成功', $arr);
    }

    // => 列出單個
    function get($id){
      $sql = "SELECT * FROM $this->table WHERE id = ?";
      $this->db->stmtQuery($sql, 'i', $id);
      $result = $this->db->getResult();

      if ($result) {
        sendResponseMsg('success', '查詢成功', $result);
      } else {
        sendResponseMsg('fail', '查詢失敗，無此資料');
      }
    }

    // => 新增
    function create(){
      if (empty($this->input['content'])) {
        header('HTTP/1.1 400 error: bad request');
        sendResponseMsg('fail', '新增失敗，參數不足');
        die();
      }

      $sql = "INSERT INTO $this->table(content) VALUES(?) ";
      $this->db->stmtQuery($sql, 's', $this->input['content']);
      $last_id = mysqli_insert_id($this->db->conn);

      if ($this->db->checkAffect()) {
        sendResponseMsg('success', '新增成功', $last_id);
      }
    }

    // => 刪除
    function delete($id){
      $sql = "DELETE FROM $this->table WHERE id = ?";
      $this->db->stmtQuery($sql, 'i', $id);
      if ($this->db->checkAffect()) {
        sendResponseMsg('success', '刪除成功');
      } else {
        sendResponseMsg('fail', '刪除失敗，無此資料');
      }
    }

    // => 修改
    function update($id){
      if (!isset($this->input['content']) && !isset($this->input['status'])) {
        header('HTTP/1.1 400 error: bad request');
        sendResponseMsg('fail', '更新失敗，參數不足');
        die();
      }

      foreach($this->input as $key => $value) {
        $this->db->stmtQuery("UPDATE $this->table SET $key = ? WHERE id = ?", 'si', $value, $id);
      }

      if ($this->db->checkAffect()) {
        sendResponseMsg('success', '更新成功');
      } else {
        sendResponseMsg('fail', '更新失敗，無此資料');
      }
    }

}

$handler = new TodoHander($db);
$handler->processRequest($_SERVER["REQUEST_METHOD"]);
?>
```
