<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Yakim_week13_管理後台</title>
  <link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap" rel="stylesheet">
  <link href="https://necolas.github.io/normalize.css/latest/normalize.css" rel="stylesheet">
  <link rel="stylesheet" href="./css/main.css">
  <script src="https://code.jquery.com/jquery-2.2.4.min.js" crossorigin="anonymous"></script>
</head>
<?php
  require_once('lib/DB_conn.php');
  require_once('lib/user.php');
  require_once('lib/page_control.php');
  
  // 非管理員 => 顯示錯誤訊息、跳回登入頁
  if (!isLogin() || !$user->isAdmin()) {
    $page->redirectQuery('login.php', 'status', 'not_allowed');
    exit();
  }

?>
<body class="login theme-admin">
  <h1 class="title_brief">後台管理區</h1>
  <main class="container">
    
    <!-- 導覽列 -->
    <?php include("./layout/nav.php");?>

    <!-- 分頁 -->
    <?php 
      $sql_count = "SELECT COUNT(id) FROM yakim_comments";
      include("./layout/pagination.php");
    ?>

    <section class="comments shadow">
      <h2 class="title_2">最新留言</h2>
      <!-- 留言列表 -->
      <?php include("./layout/board.php");?>

    </section>
  </main>
  
  <script src="./js/update_comment.js"></script>
  <script src="./js/input_toggle.js"></script>
  <script src="./js/msg.js"></script>
</body>
</html>