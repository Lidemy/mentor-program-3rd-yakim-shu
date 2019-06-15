<?php
require_once('./DB_conn.php');
if (isset($_POST['username']) && isset($_POST['password'])){ 
  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = "SELECT * FROM yakim_users WHERE username = '$username' AND password = '$password'";
  $db->query($sql);
  if ($db->result->num_rows > 0) {
    $row = $db->result->fetch_assoc();
    setcookie("member_id", $row['id'], time()+3600*24);
    $db->Redirect('index.php');
  } else {
    $db->Redirect('login.php?status=failed');
  }
}
?>