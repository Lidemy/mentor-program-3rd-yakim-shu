<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Yakim_week11_管理後台</title>
  <link href="https://necolas.github.io/normalize.css/latest/normalize.css" rel="stylesheet">
  <link rel="stylesheet" href="./css/main.css">
</head>
<?php
  require_once('./lib/DB_conn.php');
  require_once('./lib/user_class.php');
  $is_login = ($user->isAdmin()) ? 'login' : '';
  
  // 非管理員 => 顯示錯誤訊息、跳回登入頁
  if (!$user->isAdmin()) {
    $db->Redirect('login.php', 'status', 'not_allowed');
  }

?>
<body class="<?php echo $is_login; ?> theme-admin">

  <h1 class="title_brief">後台管理區</h1>

  <main class="container">
    <?php include("./layout/nav.php");?>

    <!-- 留言列表 -->
    <section class="comments shadow">
      <h2 class="title_2">最新留言</h2>
      <?php
        $sql = "SELECT C.id as commentID, U.id as UserID, C.content, C.created_at, C.is_deleted, U.nickname
        FROM yakim_comments as C LEFT JOIN yakim_users as U 
        ON C.user_id = U.id 
        ORDER BY C.created_at DESC 
        LIMIT 50";
        $db->query($sql);
        while ($row = $db->result->fetch_assoc()) {
          $is_deleted = ($row['is_deleted'] == 1) ? 'theme-deleted': '';
          echo "<div class='comments_item ". $is_deleted ."'>";
          echo "  <p class='comments__username'>" . $row['nickname'] . "</p>";
          echo "  <time class='comments__time'>" . $row['created_at'] . "</time>";
          echo "  <p class='comments__content'>" . $row['content'] . "</p>";
            $user_id = $row['UserID'];
            $comment_id = $row['commentID'];
            $content = $row['content'];
            echo "<a class='btn btn_1' href='update_comment.php?user_id=$user_id&comment_id=". $comment_id ."'>編輯</a>";
            if ($row['is_deleted'] == 1) {
              echo "<a class='btn btn_1' href='handle_recovery_comment.php?comment_id=$comment_id'>還原</a>";
            } else {
              echo "<a class='btn btn_1' href='handle_delete_comment.php?comment_id=$comment_id'>刪除</a>";
            }
          echo "</div>";
        }
      ?>
    </section>
  </main>
</body>
</html>