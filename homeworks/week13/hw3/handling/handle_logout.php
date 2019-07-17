<?php 
session_start();
$dir = dirname(__FILE__) . './../';
require_once($dir . 'lib/user.php');
require_once($dir . 'lib/page_control.php');

unset($_SESSION['username']);
$page->redirect('../index.php');
?>