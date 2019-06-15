<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Yakim_week9</title>
  <link href="https://necolas.github.io/normalize.css/latest/normalize.css" rel="stylesheet">
  <link rel="stylesheet" href="./css/main.css">
</head>
<?php
  require_once('./DB_conn.php');
  

  if(isset($_COOKIE["member_id"])) {
    $is_login = 'login';
    $id = $_COOKIE["member_id"];
    $sql_user = "SELECT * FROM yakim_users WHERE id = " . $id;
    $db->query($sql_user);
    $row_users = $db->result->fetch_assoc();
    $username = $row_users['username'];
    $nickname = $row_users['nickname'];
  }
?>
<body class="<?php echo $is_login; ?>">
  <?php include("./layout/nav.php");?>

  <h4 class="title_warning">本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時<span>「 請勿使用 」</span>任何真實的帳號或密碼</h4>
  <h1 class="title_brief">HELLO, <span><?php echo $nickname; ?></span> </h1>

  <main class="container">
    <section class="add-comment shadow">
      <p class="comment__tip-login">還沒登入唷 !</p>
      <h2 class="title_2">寫下你的留言</h2>
      <form action="handle_add_comment.php" method="POST">
        <textarea class="require comment__input" name="content" id="" rows="5" placeholder="巴拉巴拉巴拉 ✍"></textarea>
        <button class="add-comment__submit" type="submit">送出留言</button>
      </form>
    </section>
    <section class="comments shadow">
      <h2 class="title_2">留言板</h2>
      <?php
        $sql_col = "SELECT C.content, C.created_at, U.nickname FROM yakim_comments as C LEFT JOIN yakim_users as U ";
        $sql_related = "ON C.user_id = U.id ORDER BY C.created_at DESC LIMIT 50";
        $db->query($sql_col . $sql_related);
        while ($row = $db->result->fetch_assoc()) {
          echo "<div class='comments_item'>";
          echo "  <p class='comments__username'>" . $row['nickname'] . "</p>";
          echo "  <time class='comments__time'>" . $row['created_at'] . "</time>";
          echo "  <p class='comments__content'>" . $row['content'] . "</p>";
          echo "</div>";
        }
      ?>
    </section>
  </main>
  <script src="./js/index.js"></script>
</body>
</html>