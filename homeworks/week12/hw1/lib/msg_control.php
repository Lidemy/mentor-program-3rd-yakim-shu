<?php
require_once('DB_conn.php');
require_once('request_check.php');
require_once('page_control.php');
require_once('user.php');

class MsgControl {
  private $table = 'yakim_comments';

  public function __construct($db, $requestCheck, $page, $request_id) {
    $this->db = $db;
    $this->page = $page;
    $this->requestCheck = $requestCheck;
    $this->request_id = $request_id;
    $this->init();
  }

  // 權限檢查：
  // 登入 => 建立使用者資料
  // Request => 是否為本人或管理員發出
  private function init() {
    $this->checkLogin();
    $this->user->chceckAuthority($this->request_id);
  }

  private function checkLogin() {
    if (isLogin()) $this->user = new User($this->db, $_COOKIE['session_id']);
    else exit('沒有權限唷！');
  }

  private function checkId() {
    if (!$this->requestCheck->getList('comment_id', 'user_id')) exit('參數不足');
  }

  // => 暫時刪除
  function delete($comment_id) {
    $this->checkId();
    $sql = "UPDATE $this->table SET is_deleted = 1 WHERE id = ?";
    $this->db->stmtQuery($sql, 'i', $comment_id);
  }

  // => 還原刪除
  function recovery($comment_id) {
    $this->checkId();
    $sql = "UPDATE $this->table SET is_deleted = 0 WHERE id = ?";
    $this->db->stmtQuery($sql, 'i', $comment_id);
  }
  
  // => 永久刪除
  function clean($comment_id) {
    $this->checkId();
    $sql = "DELETE FROM $this->table WHERE id = ?";
    $this->db->stmtQuery($sql, 'i', $comment_id);
  }

  // => 新增
  function post($content, $parent_id, $layer, $current_user_id) {
    if (!$this->requestCheck->postList('content', 'parent_id', 'layer', 'current_user_id')) exit('參數不足');
    $sql = "INSERT INTO ".$this->table."(content, user_id, parent_id, layer) VALUES(?, ?, ?, ?)";
    $this->db->stmtQuery($sql, 'siii', $content, $current_user_id, $parent_id, $layer);
  }
  
  // => 更新
  function update($id, $content) {
    if (!$this->requestCheck->postList('id', 'content', 'user_id')) exit('參數不足');
    $sql = "UPDATE $this->table SET content = ? WHERE id = ?";
    $this->db->stmtQuery($sql, 'si', $content, $id);
  }

}

?>