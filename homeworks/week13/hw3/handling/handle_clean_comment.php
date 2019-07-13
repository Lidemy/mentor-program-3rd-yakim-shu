<?php
$dir = dirname(__FILE__) . './../';
require_once($dir . 'lib/page_control.php');
require_once($dir . 'lib/msg_control.php');

// 永久清除留言
$msg->clean($_GET['comment_id']);
// $page->back();
?>