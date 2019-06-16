<?php
  require_once('./lib/DB_conn.php');
  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($username) || empty($password)) {
    $db->Redirect('login.php', 'status', 'empty');
  }

  $sql = "SELECT * FROM yakim_users 
  WHERE username = '$username' AND password = '$password'";
  
  $db->query($sql);
  $row = $db->getSingleRow();

  if (!$row) {
    $db->Redirect('login.php', 'status', 'failed');
  } else {
    setcookie("member_id", $row['id'], time()+3600*24);
    $db->Redirect('index.php');
  }
?>