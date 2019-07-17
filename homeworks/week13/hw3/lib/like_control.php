<?php
require_once('user.php');
require_once('DB_conn.php');
require_once('request_check.php');
require_once('page_control.php');
require_once('msg_control.php');
require_once('utils.php');

class likeControl extends MsgControl {
  private $table = 'yakim_likes';
  public function __construct($db, $requestCheck, $page, $user) {
    parent::__construct($db, $requestCheck, $page, $user);
    $this->user_id = $this->user->id;
  }

  // 檢查有沒有按過 like
  private function checkLiked($comment_id, $user_id) {
    $sql_check = "SELECT * FROM $this->table WHERE comment_id = ? AND user_id = ?";
    $this->db->stmtQuery($sql_check, 'ii', $comment_id, $this->user->id);
    $row = $this->db->getResult();
    return $row;
  }

  // => 移除讚
  function delete($comment_id) {
    // 檢查參數 & 是否有資料
    if (!$this->requestCheck->get('comment_id')) exit();
    if (!$this->checkLiked($comment_id, $this->user_id)) {
      header('HTTP/1.1 202 error: not found');
      sendResponseMsg('fail', '還沒按過讚');
      exit();
    }

    $sql = "DELETE FROM $this->table WHERE comment_id = ? AND user_id = ?";
    $this->db->stmtQuery($sql, 'ii', $comment_id, $this->user_id);

    if ($this->db->checkAffect()) {
      sendResponseMsg('success', '移除成功');
    } else {
      header('HTTP/1.1 202 error: not found');
      sendResponseMsg('fail', '移除失敗，無此資料');
    }
  }

  // => 新增讚
  function add($comment_id) {
    // 檢查參數 & 是否有資料
    if (!$this->requestCheck->get('comment_id')) exit();
    if ($this->checkLiked($comment_id, $this->user_id)) {
      header('HTTP/1.1 202 error: not found');
      sendResponseMsg('fail', '已經按過讚了喔！');
      exit();
    }

    $sql = "INSERT INTO ".$this->table."(comment_id, user_id) VALUES(?, ?)";
    $this->db->stmtQuery($sql, 'ii', $comment_id, $this->user_id);

    if ($this->db->checkAffect()) {
      sendResponseMsg('success', '新增成功');
    } else {
      header('HTTP/1.1 202 error: not found');
      sendResponseMsg('fail', '新增失敗，無此資料');
    }
  }

}
$like = new likeControl($db, $requestCheck, $page, $user);

?>