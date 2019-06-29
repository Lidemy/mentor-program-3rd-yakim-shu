<?php
  require_once('./lib/DB_conn.php');
  require_once('./lib/page_control.php');
  require_once('./lib/request_check.php');
  require_once('./lib/user.php');

  // 檢查是否有空白欄位
  if (!$requestCheck->postList('username', 'password')) {
    $page->redirectQuery('login.php', 'status', 'empty');
    die();
  } 
  
  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = "SELECT * FROM yakim_users WHERE username = '$username'";
  $db->query($sql);
  $row = $db->getRow();
  $hash = $row['password'];

  // 帳號密碼出錯
  if (!$row || !password_verify($password , $hash)) {
    $page->redirectQuery('login.php', 'status', 'failed');
  } else {

    // 登入成功，建立 session
    $session = new Session($db, $row['username']);
    $session->checkID();
    $session->setCookie();

    $page->redirect('index.php');
  }
?>