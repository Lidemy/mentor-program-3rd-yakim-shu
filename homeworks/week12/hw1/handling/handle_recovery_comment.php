<?php
$dir = dirname(__FILE__) . './../';
require_once($dir . 'lib/page_control.php');
require_once($dir . 'lib/msg_control.php');

// 復原刪除的留言
$msg->recovery($_GET['comment_id']);
$page->back();
?>