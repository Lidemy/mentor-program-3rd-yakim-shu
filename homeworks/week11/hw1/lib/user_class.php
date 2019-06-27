<?php

class User {
  public function __construct($session_id, $db) {
    $this->session_id = $session_id;
    $this->db = $db;
    $this->row_users = '';
    $this->init();
  }
  private function init() {
    
  }
  public function getSessionID() {
    return $this->session_id;
  }

  private function getMemberType() {
    $sql_user = "SELECT U.id, U.nickname, U.username, U.authority FROM yakim_users as U LEFT JOIN yakim_users_certificate as C
    ON U.username = C.username WHERE C.certificate_id = '". $this->session_id. "'";
    $this->db->query($sql_user);
    $this->row_users = $this->db->getSingleRow();
  }

  public function isAdmin() {
    $this->getMemberType();
    if (strstr($this->row_users['authority'], 'admin')) {
      return true;
    } else {
      return false;
    }
  }

  public function isSuperAdmin() {
    $this->getMemberType();
    if (strstr($this->row_users['authority'], 'admin_super')) {
      return true;
    } else {
      return false;
    }
  }
}

function isLogin() {
  if (isset($_COOKIE["session_id"]) && !empty($_COOKIE["session_id"])) {
    return true;
  } 
}

if (isLogin()) $user = new User($_COOKIE["session_id"], $db);

?>