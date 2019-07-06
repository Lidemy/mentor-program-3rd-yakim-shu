<?php
$dir = dirname(__FILE__) . './../';
require_once($dir . 'lib/request_check.php');
require_once($dir . 'lib/msg_control.php');

// 更新留言
$msg = new MsgControl($db, $requestCheck, $page, $_POST['user_id']);
$msg->update($_POST['id'], $_POST['content']);
$page->back();
?>