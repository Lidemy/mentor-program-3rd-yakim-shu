# API 文件說明

( 以下直接拿 week4 作業來改 )

### API 設計

| 說明     | Method   | path       | Request body         |
|--------|---------|----------|----------------------|
| 獲取所有 todo | GET | `/api/list/` |   |
| 讀取單一 todo | GET  | `/api/list/{id}` |   |
| 新增 todo   | POST   | `/api/list/` | `content: 內容` |            
| 刪除 todo   | DELETE  | `/api/list/{id}`  |  |            
| 修改 todo | PATCH    | `/api/list/{id}`  | `content: 內容`、 `status: {完成: 1 | 未完成: 0}` |  

---
## Get Start

Base URL： `http://yakim.tw/todos/api/list`

### Example GetTodos Request

- 獲得全部 Todo-list

```shell
curl -X GET "http://yakim.tw/todos/api/list"
```

- 獲得 id 為 80 的 Todo

```shell
curl -X GET "http://yakim.tw/todos/api/list/80"
```

- 新增 Todo

```shell
curl -X POST http://yakim.tw/todos/api/list -i -H "Content-Type:application/json" -H "Accept:application/json" -d '{"content" : "use curl"}'
```

- 刪除 id = 80 的 Todo

```shell
curl -X DELETE http://yakim.tw/todos/api/list/80
```

- 更新 id = 80 的 Todo 

```shell
curl -X PATCH http://yakim.tw/todos/api/list/80 -i -H "Content-Type:application/json" -H "Accept:application/json" -d '{ "content" : "啊囉哈", "status" : 1 }'
```

## Example GetResturant Response
Response 欄位說明

- `id` ： todo-id
- `content` ： todo 內容
- `status` ： todo 狀態 ( `完成: 1 | 未完成: 0` )
- `created_at` ： todo 建立時間

```javascript
{
    "status": "success",
    "result": [
        {
            "id": 1,
            "content": "關心一下隔壁小貓",
            "status": 0,
            "created_at": "2019-08-28 12:07:59"
        },
        {
            "id": 2,
            "content": "認真之餘也要記得認真耍廢",
            "status": 1,
            "created_at": "2019-08-28 12:20:24"
        }
    ],
    "message": "查詢成功"
}
```
