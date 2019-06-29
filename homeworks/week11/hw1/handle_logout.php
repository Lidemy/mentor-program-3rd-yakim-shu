<?php  
require_once('./lib/user.php');
require_once('./lib/page_control.php');

$session = new Session($db);
$session->clearCookie();
$page->redirect('index.php');
?>