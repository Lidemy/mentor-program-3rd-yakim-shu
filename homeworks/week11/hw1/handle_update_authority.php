<?php
require_once('./lib/user.php');
require_once('./lib/request_check.php');
require_once('./lib/page_control.php');

// 更新權限
if ($requestCheck->get('id') && $requestCheck->post('authority')) {
  $user->updateAuthority($_POST['authority'], $_GET['id']);
}
$page->redirect('admin_authority.php');
?>