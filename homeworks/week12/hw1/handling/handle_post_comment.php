<?php
$dir = dirname(__FILE__) . './../';
require_once($dir . 'lib/page_control.php');
require_once($dir . 'lib/msg_control.php');

// 新增留言
$msg = new MsgControl($db, $requestCheck, $page, $_POST['current_user_id']);
$msg->post($_POST['content'], $_POST['parent_id'], $_POST['layer'], $_POST['current_user_id']);
$page->back();
?>