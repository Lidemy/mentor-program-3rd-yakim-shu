<?php
require_once('./DB_conn.php');
if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['nickname'])){ 
  $username = $_POST['username'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];
  
  $sql_select = "SELECT * FROM yakim_users";
  $db->query($sql_select);
  while ($row = $db->result->fetch_assoc()) {
    if ($username === $row['username'] || $nickname === $row['nickname']) {
      $is_username = $username === $row['username'] ? 'unvalid': 'valid';
      $is_nickname = $nickname === $row['nickname'] ? 'unvalid': 'valid';
      $db->Redirect('register.php?is_username='. $is_username . '&is_nickname=' . $is_nickname);
      die();
    }
  }
  $sql = "INSERT INTO yakim_users(username, password, nickname) VALUES('$username', '$password', '$nickname')";
  $db->query($sql);
  $db->Redirect('login.php?status=sucess');
}
?>