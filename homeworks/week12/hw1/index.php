<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Yakim_week12</title>
  <link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap" rel="stylesheet">
  <link href="https://necolas.github.io/normalize.css/latest/normalize.css" rel="stylesheet">
  <link rel="stylesheet" href="./css/main.css">
</head>
<?php
  require_once('lib/DB_conn.php');
  require_once('lib/user.php');
  require_once('lib/escape.php');

  $is_login = isLogin() ? 'login' : '';
?>
<body class="<?php echo $is_login ?>">
  
  <!-- 導覽列 -->
  <?php include("./layout/nav.php");?>
  
  <h4 class="title_warning">本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時<span>「 請勿使用 」</span>任何真實的帳號或密碼</h4>
  <h1 class="title_brief">HELLO, <span><?= encode($user->row_users['nickname']); ?></span> </h1>

  <main class="container">
    <!-- 留言區 -->
    <section class="add-comment shadow">
      <a class="comment__tip-login" href="login.php">欸欸還沒登入啦</a>
      <h2 class="title_2">寫下你的胡鬧名言</h2>
      <form action="./handling/handle_post_comment.php" method="POST">
        <textarea class="require comment__input" name="content" id="" rows="5" placeholder="巴啦巴啦巴啦 ✍" required></textarea>
        <input type="hidden" name="id" value="<?= $user->row_users['id'] ?>">
        <button class="add-comment__submit" type="submit">送出留言</button>
      </form>
    </section>

    <!-- 分頁 -->
    <?php 
      $sql_count = "SELECT COUNT(id) FROM yakim_comments WHERE is_deleted = 0";
      include("./layout/pagination.php");
    ?>

    <section class="comments shadow">
      <h2 class="title_2">最新留言</h2>
      <!-- 留言列表 -->
      <?php include("./layout/board.php");?>

    </section>

  </main>
  <script src="./js/update_comment.js"></script>
</body>
</html>