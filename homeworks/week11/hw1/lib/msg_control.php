<?php
require_once('./lib/DB_conn.php');

class MsgControl {
  public function __construct($db) {
    $this->db = $db;
  }

  // 暫時刪除
  function delete($id) {
    $sql = "UPDATE yakim_comments SET is_deleted = 1 WHERE id = $id";
    $this->db->query($sql);
  }

  // 還原刪除
  function recovery($id) {
    $sql = "UPDATE yakim_comments SET is_deleted = 0 WHERE id = $id";
    $this->db->query($sql);
  }
  
  // 永久刪除
  function clean($id) {
    $sql = "DELETE FROM yakim_comments WHERE id = $id";
    $this->db->query($sql);
  }

  // 新增
  function post($id, $content) {
    $sql = "INSERT INTO yakim_comments(content, user_id) VALUES('$content', $id)";
    $this->db->query($sql);
  }
  
  // 更新
  function update($id, $content) {
    $sql = "UPDATE yakim_comments SET content = '$content' WHERE id = $id";
    $this->db->query($sql);
  }

}
$msg = new MsgControl($db);

?>