<?php
  require_once('lib/page_control.php');

  // 前台編輯區
  function index_edit($id, $user_id) {
    echo "<a class='btn btn_1 btn_edit' data-id='$id'>編輯</a>";
    echo "<a class='btn btn_1' href='./handling/handle_delete_comment.php?comment_id=$id&user_id=$user_id'>刪除</a>";
  }

  // 後台編輯區
  function admin_edit($id, $is_deleted, $user_id) {
    echo "<a class='btn btn_1 btn_edit' data-id='$id'>編輯</a>";
    if (($is_deleted)) { // => 前台已刪除的留言
      echo "<a class='btn btn_1' href='./handling/handle_recovery_comment.php?comment_id=$id&user_id=$user_id'>還原</a>";
      echo "<a class='btn btn_1' href='./handling/handle_clean_comment.php?comment_id=$id&user_id=$user_id'>永久清除</a>";
    } else {
      echo "<a class='btn btn_1' href='./handling/handle_delete_comment.php?comment_id=$id&user_id=$user_id'>刪除</a>";
    }
  }

  function printContent($row, $is_liked, $id, $current_user_id, $row_like, $is_origin) {
    $str = ($is_liked)? 'delete':'add';
    echo  "<p class='comments__username $is_origin'>". encode($row['nickname']) ."</p>";
    echo  "<time class='comments__time'>". $row['created_at'] ."</time>";
    echo  "<p class='comments__content'>". encode($row['content']) ."</p>";
    if (isLogin()) {
      echo  "<a class='comments__like ". $is_liked ."' href='./handling/handle_". $str ."_like.php?comment_id=$id&user_id=$current_user_id'>$row_like</a>";
    } else {
      echo  "<a class='comments__like' href='login.php?status=not_login'>$row_like</a>";
    }
  }

  function printInput($id, $user, $layer) {
    echo "<section class='comment__inside'>";
    echo  "<form action='./handling/handle_post_comment.php' method='POST'>";
    echo    "<textarea class='comment__input comment__input-inside' name='content' rows='2' placeholder='回應' required></textarea>";
    echo    "<input type='hidden' name='parent_id' value='$id'>";
    echo    "<input type='hidden' name='layer' value='$layer'>";
    echo    "<input type='hidden' name='id' value='". $user->row_users['id'] ."'>";
    echo    "<button class='btn btn_1' type='submit'>送出</button>";
    echo  "</form>";
    echo "</section>";
  }

  function printEditTool($page, $id, $is_deleted, $row, $nickname, $current_user_nickname) {
    if ($page->isPage('admin.php')) {
      admin_edit($id, $is_deleted, $row['user_id']);
    } else if (isLogin() && $nickname === $current_user_nickname) {
      index_edit($id, $row['user_id']);
    } 
  }

  // 處理按讚
  function countLike($id, $db, $current_user_id) {
    $sql = "SELECT user_id, COUNT(id) FROM yakim_likes WHERE comment_id = $id GROUP BY user_id";
    $db->query($sql);
    $row_like = 0;
    $is_liked = '';

    while ($row_check = $db->result->fetch_assoc()) {
      $row_like += $row_check['COUNT(id)'];
      if (isLogin() && $row_check['user_id'] == $current_user_id ) $is_liked = 'liked';
    }
    return array($is_liked, $row_like);
  }


  // if (isLogin()) {
    $user = isLogin() ? $user : '';
    $current_user_id = isLogin() ? $user->row_users['id'] : '';
    $current_user_nickname  = isLogin() ? $user->row_users['nickname'] : '';
  // }


  $layer = 1;

  function subMsg($page_num, $db, $parent_id = 0, $page, $current_user_nickname, $current_user_id, $user, $layer, $nickname_layer1 = '') {

    $limit = 20;
    $str = ($page->isPage('index.php')) ? " WHERE C.is_deleted = 0 AND " : ' WHERE ';
    $sql_child = "SELECT C.id, U.nickname, C.content, C.is_deleted, C.created_at, U.id as user_id
    FROM yakim_comments as C LEFT JOIN yakim_users as U
    ON C.user_id = U.id ". $str ." C.layer = $layer AND C.parent_id = ?
    ORDER BY C.created_at DESC LIMIT $limit OFFSET $page_num";
    $db = new Db($db->server, $db->user, $db->pass, $db->db);
    $db->stmtQuery($sql_child, 'i', $parent_id);

    // 有找到資料
    while ($row = $db->stmt_result->fetch_assoc()) {
      $id = $row['id'];
      $is_deleted = ($row['is_deleted'] == 1) ? 'theme-deleted': '';
      $is_sub = ($layer > 1) ? 'comments_child' : '';

      if ($layer == 1) {
        $nickname_layer1 = $row['nickname'];
      }

      $is_origin = ($nickname_layer1 === $row['nickname'] && $is_sub) ? 'default' : '';
      list ($is_liked, $row_like) = countLike($id, $db, $current_user_id);

      echo "<div class='comments_item $is_sub $is_deleted'>";
        // 輸出主要留言
        printContent($row, $is_liked, $id, $current_user_id, $row_like, $is_origin);

        // 編輯區
        printEditTool($page, $id, $is_deleted, $row, $row['nickname'], $current_user_nickname);
        if (isLogin()) printInput($id, $user, $layer+1);
        subMsg($page_num, $db, $id, $page, $current_user_nickname, $current_user_id, $user, $layer+1, $nickname_layer1);
      echo "</div>";
    }
  }
  subMsg($page_num, $db, 0, $page, $current_user_nickname, $current_user_id, $user, $layer);

  // -------------------------------------------------

  
?>

  