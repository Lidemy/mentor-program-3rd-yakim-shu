<?php
require_once('./lib/DB_conn.php');
if (isset($_POST['content'])) {
  $content = $_POST['content'];
  $id = $_POST['id'];
  $sql = "INSERT INTO yakim_comments(content, user_id) VALUES('$content', $id)";
  $db->query($sql);
  $db->Redirect('index.php');
}
?>