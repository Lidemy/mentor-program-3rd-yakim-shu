<?php
  $lifetime = 3600; // => 過期時間： 1小時
  session_set_cookie_params($lifetime);
  session_start();

  $dir = dirname(__FILE__) . './../';
  require_once($dir . 'lib/DB_conn.php');
  require_once($dir . 'lib/page_control.php');
  require_once($dir . 'lib/request_check.php');

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
    if (!isset($_SESSION['username']) && empty($_SESSION['username'])) {
      $_SESSION['username'] = $row['username'];
    } 

    $page->redirect('../index.php');
  }
?>