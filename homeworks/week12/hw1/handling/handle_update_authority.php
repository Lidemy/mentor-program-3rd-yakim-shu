<?php
$dir = dirname(__FILE__) . './../';
require_once($dir . 'lib/user.php');
require_once($dir . 'lib/request_check.php');
require_once($dir . 'lib/page_control.php');

// 更新權限
if ($requestCheck->get('id') && $requestCheck->post('authority')) {
  $user->chceckAuthority($_GET['id']);
  $user->updateAuthority($_POST['authority'], $_GET['id']);
}
$page->back();
?>