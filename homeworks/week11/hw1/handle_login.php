<?php
  require_once('./lib/DB_conn.php');
  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($username) || empty($password)) {
    $db->Redirect('login.php', 'status', 'empty');
  }

  $sql = "SELECT * FROM yakim_users WHERE username = '$username'";
  $db->query($sql);
  $row = $db->getSingleRow();
  $hash = $row['password'];

  // 帳號密碼出錯
  if (!$row || !password_verify($password , $hash)) {
    $db->Redirect('login.php', 'status', 'failed');
  } 

  // 檢查 session 表 => user 是否登入過
  $user = $row['username'];
  $sql_get_session = "SELECT * FROM yakim_users_certificate WHERE username = '$user'";
  $db->query($sql_get_session);
  $row_session = $db->getSingleRow();
  
  
  // 第一次登入 => 新增一個 session
  if (!$row_session) {
    session_start();
    session_regenerate_id(); // => 更新 session
    $id = session_id();
    $sql_set_session = "INSERT INTO yakim_users_certificate(username, certificate_id) VALUES('$user', '$id')";
    $db->query($sql_set_session);
    
  // 曾經登入過 => 從 session 表拿
  } else {
    $id = $row_session['certificate_id'];
  }

  setcookie('session_id' ,$id, time()+3600*24, '/');
  $db->Redirect('index.php');
?>