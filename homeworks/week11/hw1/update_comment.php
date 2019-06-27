<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Yakim_week11</title>
  <link href="https://necolas.github.io/normalize.css/latest/normalize.css" rel="stylesheet">
  <link rel="stylesheet" href="./css/main.css">
</head>
<?php
  require_once('./lib/DB_conn.php');
  if (isset($_GET['comment_id']) && isset($_GET['user_id']) ) {

    $comment_id = $_GET['comment_id'];
    $user_id = $_GET['user_id'];

    $sql = "SELECT * FROM yakim_comments WHERE id = $comment_id";
    $db->query($sql);
    $row = $db->getSingleRow();
  }
?>
<body class="login">

  <main class="container">
    <!-- 留言區 -->
    <section class="add-comment shadow">
      <a class="comment__tip-login" href="login.php">欸欸還沒登入啦</a>
      <h2 class="title_2">寫下你的胡鬧名言</h2>
      <form action="handle_update_comment.php" method="POST">
        <textarea class="require comment__input" name="content" id="" rows="5" required><?php echo $row['content'] ?></textarea>
        <input style="display:none" name="comment_id" value="<?php echo $row['id'] ?>">
        <button class="add-comment__submit" type="submit">更改留言</button>
      </form>
    </section>

    
  </main>
</body>
</html>