<?php
require_once('DB_config.php');

class Db {
  public function __construct($servername, $username, $password, $dbname) {
    $this->server = $servername;
    $this->user = $username;
    $this->pass = $password;
    $this->db = $dbname;
    $this->init();
  }
  private function init() {
    $this->conn = mysqli_connect($this->server, $this->user, $this->pass, $this->db);
    if ($this->conn->connect_error) {
      die('Failed: ' . $this->conn->connect_error);
    }
    mysqli_query($this->conn, "SET NAMES utf8");
    mysqli_query($this->conn, "SET time_zone = '+08:00'");
  }
  private function checkQuery() {
    if (!$this->result) {
      echo 'Failed: ' . $this->conn->error;
      return false;
    }
  }
  
  function query($str) {
    $this->result = mysqli_query($this->conn, $str);
    $this->checkQuery();
  }

  function stmtQuery($str, $type, ...$List) {
    $this->stmt = mysqli_prepare($this->conn, $str);
    mysqli_stmt_bind_param($this->stmt, $type, ...$List);
    $this->result = mysqli_stmt_execute($this->stmt);
    $this->checkQuery();
    $this->stmt_result = $this->stmt->get_result();
  }

  function getRow() {
    return ($this->result->num_rows > 0) ? $this->result->fetch_assoc() : "";
  }

  function getResult() {
    return $this->stmt_result ? $this->stmt_result->fetch_assoc() : '';
  }

}

$db = new Db($servername, $username, $password, $dbname);

?>