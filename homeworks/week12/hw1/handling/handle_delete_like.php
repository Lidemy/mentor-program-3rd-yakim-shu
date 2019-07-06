<?php
$dir = dirname(__FILE__) . './../';
require_once($dir. 'lib/page_control.php');
require_once($dir. 'lib/like_control.php');

// 刪除留言 => 更新欄位 is_deleted 
$like->delete($_GET['comment_id']);
$page->back();
?>