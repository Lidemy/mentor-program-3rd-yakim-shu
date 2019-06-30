<?php
$dir = dirname(__FILE__) . './../';
require_once($dir . 'lib/page_control.php');
require_once($dir . 'lib/request_check.php');
require_once($dir . 'lib/msg_control.php');

// 新增留言
if ($requestCheck->postList('id', 'content')) {
  $msg->post($_POST['id'], $_POST['content']);
}
$page->back();
?>