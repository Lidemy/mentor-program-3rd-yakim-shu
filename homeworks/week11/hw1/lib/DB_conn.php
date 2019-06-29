<?php

require_once('./lib/DB_config.php');

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
  function getRow() {
    if ($this->result->num_rows > 0) return $this->result->fetch_assoc();
    else return false;
  }

}

$db = new Db($servername, $username, $password, $dbname);

?>