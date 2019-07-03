<?php
  $dir = dirname(__FILE__) . './../';
  require_once($dir . 'lib/DB_conn.php');
  require_once($dir . 'lib/page_control.php');
  require_once($dir . 'lib/request_check.php');
  require_once($dir . 'lib/user.php');

  // 檢查是否有空白欄位
  if (!$requestCheck->postList('username', 'password')) {
    $page->redirectQuery('../login.php', 'status', 'empty');
    exit();
  } 
  
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM yakim_users WHERE username = ?";
  $db->stmtQuery($sql, 's', $username);
  $row = $db->getResult();
  $hash = $row['password'];

  // 帳號密碼出錯
  if (!$row || !password_verify($password , $hash)) {
    $page->redirectQuery('../login.php', 'status', 'failed');
  } else {

    // 登入成功，建立 session
    $session = new Session($db, $row['username']);
    $session->checkID();
    $session->setCookie();

    $page->redirect('../index.php');
  }
?>