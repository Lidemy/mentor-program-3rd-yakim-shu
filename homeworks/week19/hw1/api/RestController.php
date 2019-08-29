<?php
  require_once('./lib/DB_conn.php');

  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PATCH,DELETE");
  header("Access-Control-Allow-Credentials: true"); // => for preflight


  function sendResponseMsg($status, $resMsg, $result = ''){
    echo json_encode(array(
      'status' => $status,
      'result' => $result,
      'message' => $resMsg
    ), JSON_UNESCAPED_UNICODE);
  }

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
              if (isset($_GET['id'])) {
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

      if (isset($this->input['content'])) { // => 內容
        $sql = "UPDATE $this->table SET content = ? WHERE id = ?";
        $this->db->stmtQuery($sql, 'si', $this->input['content'], $id);
      } 
      
      if (isset($this->input['status'])) { // => 狀態
        $sql_status = "UPDATE $this->table SET status = ? WHERE id = ?";
        $this->db->stmtQuery($sql_status, 'si', $this->input['status'], $id);
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