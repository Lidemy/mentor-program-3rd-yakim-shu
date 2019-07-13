<?php
  $dir = dirname(__FILE__) . './../';
  require_once($dir . 'lib/DB_conn.php');
  require_once($dir . 'lib/page_control.php');
  require_once($dir . 'lib/request_check.php');

  // 檢查是否有空白欄位
  if (!$requestCheck->postList('username', 'password', 'nickname')) {
    $page->redirectQuery('../register.php', 'status', 'empty');
    exit();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];

  $sql_select = "SELECT * FROM yakim_users where username = ? OR nickname = ?";
  $db->stmtQuery($sql_select, 'ss', $username, $nickname);
  $row = $db->getResult();
  
  if ($row) {
    $page->redirectQuery('../register.php', 'status', 'duplicate'); // => 帳號、暱稱重複
  } else {
    $hash_password = password_hash($password, PASSWORD_DEFAULT); // => 加強密碼
    
    $sql = "INSERT INTO yakim_users(username, password, nickname, authority) VALUES(?, ?, ?, 'normal')";
    $db->stmtQuery($sql, 'sss', $username, $hash_password, $nickname);
    $row = $db->getResult();
    $page->redirectQuery('../login.php', 'status', 'sucess');
  }
?>