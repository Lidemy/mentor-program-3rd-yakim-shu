<?php
require_once('./lib/page_control.php');
require_once('./lib/request_check.php');
require_once('./lib/msg_control.php');

// 新增留言
if ($requestCheck->postList('id', 'content')) {
  $msg->post($_POST['id'], $_POST['content']);
}
$page->redirect('index.php');
?>