<?php 
session_start();
$dir = dirname(__FILE__) . './../';
require_once($dir . 'lib/user.php');
require_once($dir . 'lib/page_control.php');

// $session = new Session($db);
// $session->clearCookie();
unset($_SESSION['session_id']);
$page->redirect('../index.php');
?>