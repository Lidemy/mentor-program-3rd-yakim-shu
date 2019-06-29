<?php  

  $dir = dirname(__FILE__) . './../';
  require_once($dir . 'lib/user.php');
  require_once($dir . 'lib/page_control.php');

  $session = new Session($db);
  $session->clearCookie();
  $page->redirect('../index.php');
?>