<?php
require_once('DB_conn.php');
require_once('request_check.php');
require_once('page_control.php');
require_once('user.php');

class MsgControl {
  private $table = 'yakim_comments';

  public function __construct($db, $requestCheck, $page) {
    $this->db = $db;
    $this->page = $page;
    $this->requestCheck = $requestCheck;
    $this->checkLogin();
    $this->curentUserId = $this->user->row_users['id'];
  }

  // 有登入 => 建立使用者資料
  private function checkLogin() {
    if (isLogin()) {
      $this->user = new User($this->db, $_COOKIE['session_id']);
    }
  }

  // 檢查：刪除參數
  private function checkId() {
    if (!$this->requestCheck->getList('comment_id', 'user_id')) exit();
  }

  // 非管理員 or 本人 => 立刻結束
  private function chceckAuthority($user_id) {
    if (!isLogin()) exit('未登入');
    if (!$this->user->isAdmin() && !$this->user->isSuperAdmin()) {
      if ($this->curentUserId !== (int)$user_id) exit('非本人或管理員');
    }
    return true;
  }

  // 暫時刪除
  function delete($comment_id, $user_id) {
    $this->checkId();
    $this->chceckAuthority($user_id);
    $sql = "UPDATE $this->table SET is_deleted = 1 WHERE id = ?";
    $this->db->stmtQuery($sql, 'i', $comment_id);
  }

  // 還原刪除
  function recovery($comment_id, $user_id) {
    $this->checkId();
    $this->chceckAuthority($user_id);
    $sql = "UPDATE $this->table SET is_deleted = 0 WHERE id = ?";
    $this->db->stmtQuery($sql, 'i', $comment_id);
  }
  
  // 永久刪除
  function clean($comment_id, $user_id) {
    $this->checkId();
    $this->chceckAuthority($user_id);
    $sql = "DELETE FROM $this->table WHERE id = ?";
    $this->db->stmtQuery($sql, 'i', $comment_id);
  }

  // 新增
  function post($user_id, $content, $parent_id, $layer) {
    $this->chceckAuthority($user_id);
    if (!$this->requestCheck->postList('id','content', 'parent_id', 'layer')) exit('');
    $sql = "INSERT INTO ".$this->table."(content, user_id, parent_id, layer) VALUES(?, ?, ?, ?)";
    $this->db->stmtQuery($sql, 'siii', $content, $user_id, $parent_id, $layer);
  }
  
  // 更新
  function update($user_id, $content) {
    $this->chceckAuthority($user_id);
    if (!$this->requestCheck->postList('comment_id', 'content')) exit();
    $sql = "UPDATE $this->table SET content = ? WHERE id = ?";
    $this->db->stmtQuery($sql, 'si', $content, $user_id);
  }

}
$msg = new MsgControl($db, $requestCheck, $page);

?>