<?php
  require_once('./lib/DB_conn.php');
  $username = $_POST['username'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];

  if (empty($username) || empty($password) || empty($nickname)) {
    $db->Redirect('register.php', 'status', 'empty');
  }

  $sql_select = "SELECT * FROM yakim_users 
  where username = '$username' OR nickname = '$nickname'";

  $db->query($sql_select);

  // 檢查 username、nickname 是否重複
  if ($db->result->num_rows > 0) {
    $db->Redirect('register.php', 'status', 'duplicate');
  } else {
    $sql = "INSERT INTO yakim_users(username, password, nickname) 
    VALUES('$username', '$password', '$nickname')";

    $db->query($sql);
    $db->Redirect('login.php', 'status', 'sucess');
  }
?>