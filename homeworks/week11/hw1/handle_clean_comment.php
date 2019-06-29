<?php
require_once('./lib/page_control.php');
require_once('./lib/msg_control.php');

// 永久清除留言
$msg->clean($_GET['comment_id']);
$page->redirect('admin.php');
?>