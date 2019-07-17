<?php
$dir = dirname(__FILE__) . './../';
require_once($dir. 'lib/page_control.php');
require_once($dir. 'lib/like_control.php');

// 移除讚 
$like->delete($_GET['comment_id']);
?>