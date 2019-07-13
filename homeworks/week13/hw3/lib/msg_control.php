<?php
require_once('DB_conn.php');
require_once('request_check.php');
require_once('page_control.php');
require_once('user.php');

class MsgControl {
  private $table = 'yakim_comments';

  public function __construct($db, $requestCheck, $page, $user) {
    $this->db = $db;
    $this->page = $page;
    $this->requestCheck = $requestCheck;
    $this->user = $user;
    $this->checkLogin();
    $this->adminSQL = ($this->user->checkAdmin()) ? '' : ' AND user_id = ?';
  }

  private function checkLogin() {
    if (isLogin()) $this->user = new User($this->db, $_SESSION['session_id']);
    else exit('沒有權限唷！');
  }

  private function checkId() {
    if (!$this->requestCheck->getList('comment_id')) exit('參數不足');
  }

  // => 暫時刪除
  function delete($comment_id) {
    $this->checkId();
    $sql = "UPDATE $this->table SET is_deleted = 1 WHERE id = ? $this->adminSQL";
    if ($this->user->checkAdmin()) {
      $this->db->stmtQuery($sql, 'i', $comment_id);
    } else {
      $this->db->stmtQuery($sql, 'is', $comment_id, $this->user->id);
    }
  }

  // => 還原刪除
  function recovery($comment_id) {
    $this->checkId();
    $sql = "UPDATE $this->table SET is_deleted = 0 WHERE id = ? $this->adminSQL";

    if ($this->user->checkAdmin()) {
      $this->db->stmtQuery($sql, 'i', $comment_id);
    } else {
      $this->db->stmtQuery($sql, 'is', $comment_id, $this->user->id);
    }
  }
  
  // => 永久刪除
  function clean($comment_id) {
    $this->checkId();
    $sql = "DELETE FROM $this->table WHERE id = ? $this->adminSQL";

    if ($this->user->checkAdmin()) {
      $this->db->stmtQuery($sql, 'i', $comment_id);
    } else {
      $this->db->stmtQuery($sql, 'is', $comment_id, $this->user->id);
    }
  }

  // => 新增
  function post($content, $parent_id, $layer) {
    if (!$this->requestCheck->postList('content', 'parent_id', 'layer')) exit('參數不足');
    $sql = "INSERT INTO ".$this->table."(content, user_id, parent_id, layer) VALUES(?, ?, ?, ?)";
    $this->db->stmtQuery($sql, 'siii', $content, $this->user->id, $parent_id, $layer);
    $last_id = mysqli_insert_id($this->db->conn);

    // => 回傳資料給前端
    $sql_select = "SELECT U.id as user_id, U.nickname, C.id as comment_id, C.created_at, C.content, C.layer, C.parent_id
    FROM yakim_comments as C LEFT JOIN yakim_users as U ON C.user_id = U.id
    WHERE C.id = ?";
    $this->db->stmtQuery($sql_select, 'i', $last_id);
    $row = $this->db->getResult();
    print_r(json_encode($row));
  }
  
  // => 更新
  function update($id, $content) {
    if (!$this->requestCheck->postList('id', 'content')) exit('參數不足');
    $sql = "UPDATE $this->table SET content = ? WHERE id = ? $this->adminSQL";

    if ($this->user->checkAdmin()) {
      $this->db->stmtQuery($sql, 'si', $content, $id);
    } else {
      $this->db->stmtQuery($sql, 'sis', $content, $id, $this->user->id);
    }
    
  }

}
$msg = new MsgControl($db, $requestCheck, $page, $user);
?>