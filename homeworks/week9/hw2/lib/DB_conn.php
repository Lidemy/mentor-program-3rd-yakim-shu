<?php

require_once('./lib/DB_config.php');

class Db {
  public function __construct($servername, $user, $password, $dbname) {
    $this->server = $servername;
    $this->user = $user;
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

  public function query($str) {
    $this->result = mysqli_query($this->conn, $str);
    $this->checkQuery();
  }
  private function checkQuery() {
    if (!$this->result) {
      echo 'Failed: ' . $this->conn->error;
      return false;
    }
  }

  public function Redirect($url, $key = '', $value = '') {
    if (empty($key) && empty($value)) {
      header('Location: ./' . $url);
    } else {
      header('Location: ./' . $url . '?' . $key . '=' . $value);
    }
  }
  
  public function getSingleRow() {
    if ($this->result->num_rows > 0) return $this->result->fetch_assoc();
    else return false;
  }

}

$db = new Db($servername, $user, $password, $dbname);

?>