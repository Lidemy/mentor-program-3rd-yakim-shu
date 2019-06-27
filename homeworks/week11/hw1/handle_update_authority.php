<?php
require_once('./lib/DB_conn.php');

// 更新權限
if (isset($_GET['id']) && isset($_POST['authority']) ) {
  $id = $_GET['id'];
  $authority = $_POST['authority'];
  echo $id;
  echo $authority;

  $sql = "UPDATE yakim_users SET authority = '$authority' WHERE id = $id";
  $db->query($sql);
}

$db->Redirect('admin_authority.php');
?>