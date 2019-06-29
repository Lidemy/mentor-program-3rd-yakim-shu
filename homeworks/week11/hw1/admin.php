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
  require_once('./lib/user.php');
  require_once('./lib/page_control.php');
  
  // 非管理員 => 顯示錯誤訊息、跳回登入頁
  if (!isLogin() || !$user->isAdmin()) {
    $page->redirectQuery('login.php', 'status', 'not_allowed');
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

    <!-- 留言列表 -->
    <section class="comments shadow">
      <h2 class="title_2">最新留言</h2>
      <?php

        $sql = "SELECT C.id, C.content, C.created_at, C.is_deleted, U.nickname
        FROM yakim_comments as C LEFT JOIN yakim_users as U ON C.user_id = U.id 
        ORDER BY C.created_at DESC LIMIT $limit OFFSET $page";
        $db->query($sql);

        while ($row = $db->result->fetch_assoc()) {
          $is_deleted = ($row['is_deleted'] == 1) ? 'theme-deleted': '';
          $id = $row['id'];

          echo "<div class='comments_item ". $is_deleted ."'>";
          echo "<p class='comments__username'>" . $row['nickname'] . "</p>";
          echo "<time class='comments__time'>" . $row['created_at'] . "</time>";
          echo "<p class='comments__content'>" . $row['content'] . "</p>";
            echo "<a class='btn btn_1 btn_edit' data-id='". $id ."' href=''>編輯</a>";
            if ($row['is_deleted'] == 1) { // => 前台已刪除的留言
              echo "<a class='btn btn_1' href='handle_recovery_comment.php?comment_id=$id'>還原</a>";
              echo "<a class='btn btn_1' href='handle_clean_comment.php?comment_id=$id'>永久清除</a>";
            } else {
              echo "<a class='btn btn_1' href='handle_delete_comment.php?comment_id=$id'>刪除</a>";
            }
          echo "</div>";
        }
      ?>
    </section>
  </main>
  <script src="./js/update_comment.js"></script>
</body>
</html>