<?php
$dir = dirname(__FILE__) . './../';
require_once($dir . 'lib/page_control.php');
require_once($dir . 'lib/request_check.php');
require_once($dir . 'lib/msg_control.php');

// 更新留言
if ($requestCheck->postList('content', 'comment_id')) {
  $msg->update($_POST['comment_id'], $_POST['content']);
}

// 跳回上一頁 admin.php or index.php
$page->back();
?>