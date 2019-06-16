<?php
  require_once('./lib/DB_conn.php');
  $currentPage = basename($_SERVER['PHP_SELF'], ".php");
  function checkActive($page, $str){
    if ($page === $str) echo 'active';
  }
?>
<nav class="nav">
  <div class="nav__inner">
    <a class="nav__logo <?php checkActive('index', $currentPage); ?>" href="index.php">名言大亂鬥</a>
    <div class="nav__group is-login">
      <p class="nav__username"><?php echo $row_users['username']; ?></p>
      <a href="./handle_logout.php">登出</a>
    </div>
    <div class="nav__group is-logout">
      <a class="<?php checkActive('register', $currentPage); ?>" href="./register.php">註冊</a>
      <a class="<?php checkActive('login', $currentPage); ?>" href="./login.php">登入</a>
    </div>
  </div>
</nav>