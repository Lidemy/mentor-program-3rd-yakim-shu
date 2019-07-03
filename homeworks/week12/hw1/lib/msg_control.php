<?php
require_once('DB_conn.php');
require_once('request_check.php');
require_once('page_control.php');

class MsgControl {
  private $table = 'yakim_comments';
  public function __construct($db, $requestCheck, $page) {
    $this->db = $db;
    $this->page = $page;
    $this->requestCheck = $requestCheck;
  }
  
  private function checkId() {
    if (!$this->requestCheck->get('comment_id')) exit();
  }

  private function checkContent() {
    if (!$this->requestCheck->post('content')) exit();
  }

  // 暫時刪除
  function delete($id) {
    $this->checkId();
    $sql = "UPDATE $this->table SET is_deleted = 1 WHERE id = ?";
    if ($stmt = mysqli_prepare($this->db->conn, $sql)) {
      mysqli_stmt_bind_param($stmt, "i", $id);
      print_r($stmt);
      mysqli_stmt_execute($stmt);
    }
    // $sql = "UPDATE $this->table SET is_deleted = 1 WHERE id = $id";
    // $this->db->query($sql);
  }

  // 還原刪除
  function recovery($id) {
    $this->checkId();
    $sql = "UPDATE $this->table SET is_deleted = 0 WHERE id = $id";
    $this->db->query($sql);
  }
  
  // 永久刪除
  function clean($id) {
    $this->checkId();
    $sql = "DELETE FROM $this->table WHERE id = $id";
    $this->db->query($sql);
  }

  // 新增
  function post($id, $content) {
    if (!$this->requestCheck->postList('id','content')) exit();
    $sql = "INSERT INTO ".$this->table."(content, user_id) VALUES('$content', $id)";
    $this->db->query($sql);
  }
  
  // 更新
  function update($id, $content) {
    if (!$this->requestCheck->postList('comment_id', 'content')) exit();
    $sql = "UPDATE $this->table SET content = '$content' WHERE id = $id";
    $this->db->query($sql);
  }

}
$msg = new MsgControl($db, $requestCheck, $page);

?>