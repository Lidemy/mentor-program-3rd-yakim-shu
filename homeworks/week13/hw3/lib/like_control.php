<?php
require_once('DB_conn.php');
require_once('request_check.php');
require_once('page_control.php');
require_once('msg_control.php');
require_once('user.php');

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

  // => 刪除
  function delete($comment_id) {
    if (!$this->requestCheck->get('comment_id')) exit();

    $sql = "DELETE FROM $this->table WHERE comment_id = ? AND user_id = ?";
    $this->db->stmtQuery($sql, 'ii', $comment_id, $this->user_id);
  }

  // => 新增
  function add($comment_id) {
    if (!$this->requestCheck->get('comment_id')) exit();
    if ($this->checkLiked($comment_id, $id)) exit('已經按過讚了喔！');

    $sql = "INSERT INTO ".$this->table."(comment_id, user_id) VALUES(?, ?)";
    $this->db->stmtQuery($sql, 'ii', $comment_id, $this->user_id);
  }

}
$like = new likeControl($db, $requestCheck, $page, $user);

?>