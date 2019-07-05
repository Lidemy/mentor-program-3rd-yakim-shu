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
  }

  // 刪除
  function delete($comment_id, $user_id = '') { // => 跟 MsgControl 的方法重複
    $sql = "DELETE FROM $this->table WHERE comment_id = ? AND user_id = ?";
    $this->db->stmtQuery($sql, 'ii', $comment_id, $user_id);
  }

  // 新增
  function add($comment_id, $user_id) {
    if (!$this->requestCheck->getList('comment_id','user_id')) exit();
    $sql = "INSERT INTO ".$this->table."(comment_id, user_id) VALUES(?, ?)";
    $this->db->stmtQuery($sql, 'ii', $comment_id, $user_id);
  }

}
$like = new likeControl($db, $requestCheck, $page, $user);

?>