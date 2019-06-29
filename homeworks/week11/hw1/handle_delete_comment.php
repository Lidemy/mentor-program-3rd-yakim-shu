<?php
require_once('./lib/page_control.php');
require_once('./lib/msg_control.php');

// 刪除留言 => 更新欄位 is_deleted 
$msg->delete($_GET['comment_id']);
$page->back();
?>