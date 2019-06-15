<?php
$activePage = basename($_SERVER['PHP_SELF'], ".php");
function checkActive($page, $str){
  if ($page === $str) echo 'active';
}
?>
<nav class="nav">
  <div class="nav__inner">
    <a class="nav__logo <?php checkActive('index', $activePage); ?>" href="index.php">留言板</a>
    <div class="nav__group is-login">
      <p class="nav__username">yakim</p>
      <a href="./handle_logout.php">登出</a>
    </div>
    <div class="nav__group is-logout">
      <a class="<?php checkActive('register', $activePage); ?>" href="./register.php">註冊</a>
      <a class="<?php checkActive('login', $activePage); ?>" href="./login.php">登入</a>
    </div>
  </div>
</nav>