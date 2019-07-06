<?php
$dir = dirname(__FILE__) . './../';
require_once($dir. 'lib/page_control.php');
require_once($dir. 'lib/msg_control.php');

// 刪除留言 => 更新欄位 is_deleted 
$msg = new MsgControl($db, $requestCheck, $page, $_GET['user_id']);
$msg->delete($_GET['comment_id']);
$page->back();
?>