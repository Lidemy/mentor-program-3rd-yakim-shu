<?php
require_once('DB_conn.php');

/* ---- 設置 session ---- */
class Session {
  private $table = 'yakim_users_certificate';
  private $session_name = 'session_id';
  private $id = '';
  private $row = '';

  public function __construct($db, $user = '') {
    $this->db = $db;
    $this->user = $user;
    $this->lifeTime = time()+3600*24; // => 一天
  }
  // 曾經登入過，取id
  private function getID() {
    return $this->row['certificate_id'];
  }
  
  // 第一次登入，設 id
  private function setID() {
    session_start();
    session_regenerate_id(); // => 更新 session id，但這樣 Server 端的 session 好像會一直增加 (?)，待優化
    $id = session_id();
    $sql_set_session = "INSERT INTO $this->table(username, certificate_id) VALUES('$this->user', '$id')";
    $this->db->query($sql_set_session);
    return $id;
  }

  // 檢查 session 表 => user 是否登入過
  function checkID() {
    $sql_get_session = "SELECT * FROM $this->table WHERE username = '$this->user'";
    $this->db->query($sql_get_session);
    $this->row = $this->db->getRow();
    $this->id = ($this->row) ? $this->getID() : $this->setID();
  }

  function setCookie() {
    setcookie($this->session_name ,$this->id, $this->lifeTime, '/', null, null, true);
  }
  function clearCookie() {
    setcookie($this->session_name , '', $this->lifeTime, '/');
    session_destroy(); // => 清除所有 session（ 目前好像是加心酸的 ）
  }
}

/* ---- 檢查會員權限 ---- */
class User {
  public function __construct($db, $session_id = '') {
    $this->db = $db;
    $this->session_id = $session_id;
    $this->row_users = '';
    $this->getAuthority();
  }

  // 取得會員資料
  private function getAuthority() {
    $sql_user = "SELECT U.id, U.nickname, U.username, U.authority FROM yakim_users as U LEFT JOIN yakim_users_certificate as C
    ON U.username = C.username WHERE C.certificate_id = '". $this->session_id. "'";
    $this->db->query($sql_user);
    $this->row_users = $this->db->getRow();
  }

  function isAdmin() {
    return strstr($this->row_users['authority'], 'admin');
  }

  function isSuperAdmin() {
    return strstr($this->row_users['authority'], 'admin_super');
  }

  // 更新會員權限
  function updateAuthority($authority, $id) {
    $sql = "UPDATE yakim_users SET authority = '$authority' WHERE id = $id";
    $this->db->query($sql);
  }

  
}

/* ---- 測試是否已登入，已登入就建立會員資料 ---- */
function isLogin() {
  if (isset($_COOKIE["session_id"]) && !empty($_COOKIE["session_id"])) {
    return true;
  } 
}

if (isLogin()) $user = new User($db, $_COOKIE['session_id']);

?>


