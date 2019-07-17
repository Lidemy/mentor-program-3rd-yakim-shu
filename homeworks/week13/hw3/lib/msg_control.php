<?php
require_once('user.php');
require_once('DB_conn.php');
require_once('request_check.php');
require_once('page_control.php');
require_once('utils.php');

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
    if (isLogin()) $this->user = new User($this->db, $_SESSION['username']);
    else $this->showError('user');
  }

  private function showError($type) {
    header("Cache-Control: no-cache, must-revalidate");
    switch ($type) {
      case 'no-para' :
        header('HTTP/1.1 404 Not Found');
        sendResponseMsg('fail', '參數不足');
        exit();
      case 'user' :
        header('HTTP/1.1 401 Unauthorized');
        sendResponseMsg('fail', '沒有權限唷！');
        exit();
    }
  }

  // => 暫時刪除
  function delete($comment_id) {
    if (!$this->requestCheck->get('comment_id')) $this->showError('no-para');

    $sql = "UPDATE $this->table SET is_deleted = 1 WHERE id = ? $this->adminSQL";
    if ($this->user->checkAdmin()) {
      $this->db->stmtQuery($sql, 'i', $comment_id);
    } else {
      $this->db->stmtQuery($sql, 'is', $comment_id, $this->user->id);
    }

    if ($this->db->checkAffect()) {
      sendResponseMsg('success', '刪除成功');
    } else {
      header('HTTP/1.1 202 error: not found');
      sendResponseMsg('fail', '刪除失敗，無此資料');
    }
  }

  // => 還原刪除
  function recovery($comment_id) {
    if (!$this->requestCheck->get('comment_id')) $this->showError('no-para');

    $sql = "UPDATE $this->table SET is_deleted = 0 WHERE id = ? $this->adminSQL";
    if ($this->user->checkAdmin()) {
      $this->db->stmtQuery($sql, 'i', $comment_id);
    } else {
      $this->db->stmtQuery($sql, 'is', $comment_id, $this->user->id);
    }

    if ($this->db->checkAffect()) {
      sendResponseMsg('success', '還原成功');
    } else {
      header('HTTP/1.1 202 error: not found');
      sendResponseMsg('fail', '還原失敗，無此資料');
    }
  }
  
  // => 永久刪除
  function clean($comment_id) {
    if (!$this->requestCheck->get('comment_id')) $this->showError('no-para');

    $sql = "DELETE FROM yakim_comments WHERE id = ? $this->adminSQL";
    if ($this->user->checkAdmin()) {
      $this->db->stmtQuery($sql, 'i', $comment_id);
    } else {
      $this->db->stmtQuery($sql, 'is', $comment_id, $this->user->id);
    }

    if ($this->db->checkAffect()) {
      sendResponseMsg('success', '永久刪除成功');
    } else {
      header('HTTP/1.1 202 error: not found');
      sendResponseMsg('fail', '永久刪除失敗，無此資料');
    }
  }

  // => 新增
  function post($content, $parent_id, $layer) {
    if (!$this->requestCheck->postList('content', 'parent_id', 'layer')) $this->showError('no-para');
    $sql = "INSERT INTO ".$this->table."(content, user_id, parent_id, layer) VALUES(?, ?, ?, ?)";
    $this->db->stmtQuery($sql, 'siii', $content, $this->user->id, $parent_id, $layer);
    $last_id = mysqli_insert_id($this->db->conn);

    // => 回傳資料給前端
    $sql_select = "SELECT U.id as user_id, U.nickname, C.id as comment_id, C.created_at, C.content, C.layer, C.parent_id
    FROM yakim_comments as C LEFT JOIN yakim_users as U ON C.user_id = U.id
    WHERE C.id = ?";
    $this->db->stmtQuery($sql_select, 'i', $last_id);
    $row = $this->db->getResult();

    sendResponseMsg($row, '新增成功');
  }
  
  // => 更新
  function update($id, $content) {
    if (!$this->requestCheck->postList('id', 'content')) $this->showError('no-para');
    $sql = "UPDATE $this->table SET content = ? WHERE id = ? $this->adminSQL";

    if ($this->user->checkAdmin()) {
      $this->db->stmtQuery($sql, 'si', $content, $id);
    } else {
      $this->db->stmtQuery($sql, 'sis', $content, $id, $this->user->id);
    }
    
    if ($this->db->checkAffect()) {
      sendResponseMsg('success', '更新成功');
    } else {
      header('HTTP/1.1 202 error: not found');
      sendResponseMsg('fail', '更新失敗，無此資料');
    }
  }

}
$msg = new MsgControl($db, $requestCheck, $page, $user);
?>