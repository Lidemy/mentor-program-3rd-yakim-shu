<?php
$dir = dirname(__FILE__) . './../';
require_once($dir . 'lib/page_control.php');
require_once($dir . 'lib/like_control.php');

// 新增讚
$like->add($_GET['comment_id']);
$page->back();
?>