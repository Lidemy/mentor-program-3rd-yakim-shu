<?php
  require_once('./lib/DB_conn.php');
  require_once('./lib/user.php');
  
  function checkActive($page){
    if ($page === basename($_SERVER['PHP_SELF'], ".php")) return ' active';
  }

  // 非管理員
  $admin_show = '';
  if (isLogin()) {
    if ($user->isAdmin()) $admin_show = 'admin_show';
    if ($user->isSuperAdmin()) $admin_show = 'admin_show super_show';
  }

?>
<nav class="nav">
  <div class="nav__inner">
    <a class="nav__btn nav__logo <?php echo checkActive('index'); ?>" href="index.php">名言大亂鬥</a>
    <div class="nav__group is-login">
        <p class="nav__username"><?php if (isLogin()) echo $user->row_users['username']; ?></p>
        <a class="nav__btn admin <?php echo $admin_show.checkActive('admin'); ?>" href="admin.php">留言管理</a>
        <a class="nav__btn admin_authority <?php echo $admin_show.checkActive('admin_authority'); ?>" href="admin_authority.php">權限管理</a>
      <a class="nav__btn" href="./handle_logout.php">登出</a>
    </div>
    <div class="nav__group is-logout">
      <a class="nav__btn <?php echo checkActive('register'); ?>" href="./register.php">註冊</a>
      <a class="nav__btn <?php echo checkActive('login'); ?>" href="./login.php">登入</a>
    </div>
  </div>
</nav>