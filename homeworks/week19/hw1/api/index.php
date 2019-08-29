<?php
  require_once('./../lib/DB_conn.php');
  $sql = "SELECT * FROM yakim_todos WHERE id = 59";
  $this->db->stmtQuery($sql, 'i', $id);
  $result = $this->db->getResult();
  print_r($result);
?>
