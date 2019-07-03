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

  $sql_select = "SELECT * FROM yakim_users 
  where username = '$username' OR nickname = '$nickname'";

  $db->query($sql_select);

  if ($db->result->num_rows > 0) {
    $page->redirectQuery('../register.php', 'status', 'duplicate'); // => 帳號、暱稱重複
  } else {
    $hash_password = password_hash($password, PASSWORD_DEFAULT); // => 加強密碼
    $sql = "INSERT INTO yakim_users(username, password, nickname, authority) 
    VALUES('$username', '$hash_password', '$nickname', 'normal')";

    $db->query($sql);
    $page->redirectQuery('../login.php', 'status', 'sucess');
  }
?>