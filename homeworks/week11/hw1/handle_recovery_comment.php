<?php
require_once('./lib/page_control.php');
require_once('./lib/msg_control.php');

// 復原刪除的留言
$msg->recovery($_GET['comment_id']);
$page->redirect('admin.php');
?>