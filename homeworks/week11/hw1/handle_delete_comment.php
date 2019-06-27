<?php
require_once('./lib/DB_conn.php');

// 檢查是不是管理員
$id = $_COOKIE["session_id"];
$sql_user = "SELECT U.authority FROM yakim_users as U LEFT JOIN yakim_users_certificate as C
ON U.username = C.username WHERE C.certificate_id = '$id'";
$db->query($sql_user);
$row_users = $db->getSingleRow();

// 刪除留言
$id = $_GET['comment_id'];
$sql = "UPDATE yakim_comments SET is_deleted = 1 WHERE id = $id";
$db->query($sql);

// 管理員會跳回 admin
if (strstr($row_users['authority'], 'admin')) {
  $db->Redirect('admin.php');
} else if (isset($_GET['comment_id'])) {
  $db->Redirect('index.php');
}
?>