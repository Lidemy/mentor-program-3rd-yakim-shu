<?php
$dir = dirname(__FILE__) . './../';
require_once($dir . 'lib/page_control.php');
require_once($dir . 'lib/msg_control.php');

// 新增留言
$msg->post($_POST['id'], $_POST['content']);
$page->back();
?>