<?php
session_start();
require_once('DB_conn.php');

/* ---- 檢查會員權限 ---- */
class User {
  public function __construct($db, $username = '') {
    $this->db = $db;
    $this->username = $username;
    $this->row_users = '';
    $this->id = '';
    $this->getAuthority();
  }

  // 取得會員資料
  private function getAuthority() {
    $sql_user = "SELECT U.id, U.nickname, U.username, U.authority FROM yakim_users as U LEFT JOIN yakim_users_certificate as C
    ON U.username = C.username WHERE C.username = ?";
    $this->db->stmtQuery($sql_user, 's', $this->username);
    $this->row_users = $this->db->getResult();
    $this->id = $this->row_users['id'];
    $this->nickname = $this->row_users['nickname'];
  }
  function isAdmin() {
    return strstr($this->row_users['authority'], 'admin');
  }

  function isSuperAdmin() {
    return strstr($this->row_users['authority'], 'admin_super');
  }

  function checkAdmin() {
    return $this->isAdmin() || $this->isSuperAdmin();
  }

  // 檢查操作權限
  // 非管理員 or 本人 => 立刻結束
  function chceckAuthority($user_id) {
    if (!isLogin()) exit('未登入');
    if (!$this->isAdmin() && !$this->isSuperAdmin()) {
      if ($this->id !== (int)$user_id) exit('非本人或管理員');
    }
  }

  // 更新會員權限
  function updateAuthority($authority, $id) {
    $this->chceckAuthority($id);
    $sql = "UPDATE yakim_users SET authority = '$authority' WHERE id = ?";
    $this->db->stmtQuery($sql, 'i', $id);
  }

  
}

/* ---- 測試是否已登入，已登入就建立會員資料 ---- */
function isLogin() {
  if (isset($_SESSION["username"]) && !empty($_SESSION["username"])) {
    return true;
  }
}

if (isLogin()) $user = new User($db, $_SESSION['username']);

?>


