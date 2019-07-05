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
      echo "<a class='btn btn_1' href='./handling/handle_recovery_comment.php?comment_id=$id'>還原</a>";
      echo "<a class='btn btn_1' href='./handling/handle_clean_comment.php?comment_id=$id'>永久清除</a>";
    } else {
      echo "<a class='btn btn_1' href='./handling/handle_delete_comment.php?comment_id=$id&user_id=$user_id'>刪除</a>";
    }
  }


  function printContent($row, $is_liked, $id, $user_id, $row_like, $is_deleted) {
    $str = ($is_liked)? 'delete':'add';
    // echo "<div class='comments_item ". $is_deleted ."'>";
    echo  "<p class='comments__username'>". encode($row['nickname']) ."</p>";
    echo  "<time class='comments__time'>". $row['created_at'] ."</time>";
    echo  "<p class='comments__content'>". encode($row['content']) ."</p>";
    echo  "<a class='comments__like ". $is_liked ."' href='./handling/handle_". $str ."_like.php?comment_id=$id&user_id=$user_id'>$row_like</a>";
    // echo "<div>";
  }

  function printInput($id, $user) {
    echo "<section class='comment__inside'>";
    echo  "<form action='./handling/handle_post_comment.php' method='POST'>";
    echo    "<textarea class='comment__input comment__input-inside' name='content' rows='2' placeholder='回應' required></textarea>";
    echo    "<input type='hidden' name='parent_id' value='$id'>";
    echo    "<input type='hidden' name='id' value='". $user->row_users['id'] ."'>";
    echo    "<button class='btn btn_1' type='submit'>送出</button>";
    echo  "</form>";
    echo "</section>";
  }

  function printEditTool($page, $id, $is_deleted, $row, $nickname, $user_nickname) {
    if ($page->isPage('admin.php')) {
      admin_edit($id, $is_deleted, $row['user_id']);
    } else if (isLogin() && $nickname === $user_nickname) {
      index_edit($id, $row['user_id']);
    } 
  }

  // 處理按讚
  function countLike($id, $db, $user_id) {
    $sql = "SELECT user_id, COUNT(id) FROM yakim_likes WHERE comment_id = $id GROUP BY user_id";
    $db->query($sql);
    $row_like = 0;
    $is_liked = '';

    while ($row_check = $db->result->fetch_assoc()) {
      $row_like += $row_check['COUNT(id)'];
      if (isLogin() && $row_check['user_id'] == $user_id ) $is_liked = 'liked';
    }
    return array($is_liked, $row_like);
  }


  $layer_num = 1;
  $id_store = 0;



  function printMsg($page, $db, $limit, $page_num, $user, $layer_num, $id_store, $db_2 = '') {
    echo $layer_num;
    if ($layer_num > 2) return;
    // index.php => 只出現未刪除留言
    $str = ($page->isPage('index.php')) ? " WHERE C.is_deleted = 0 " : ' ';
    // $strLayer = ($layer_num > 1) ? " AND parent_id = $id_store " : "";

    $sql = "SELECT C.id, C.content, C.created_at, U.nickname, C.layer, C.is_deleted, U.id as user_id
    FROM yakim_comments as C LEFT JOIN yakim_users as U
    ON C.user_id = U.id ". $str ." ORDER BY C.created_at DESC LIMIT ? OFFSET ?";
    $db->stmtQuery($sql, 'ii', $limit, $page_num);
    
    if (isLogin()) {
      $user_id = $user->row_users['id'];
      $user_nickname = $user->row_users['nickname'];
    }

    if ($layer_num === 2) {
      $db_2 = new Db($db->server, $db->user, $db->pass, $db->db);
      $db_2->stmtQuery($sql, 'ii', $limit, $page_num);
      // $test = $db_2;
    }

    // 處理按讚 -----
    while ($row = $db->stmt_result->fetch_assoc()) {
      if ($row['layer'] == 1) {

        $id = $row['id'];
        $id_store = $id;
        $is_deleted = ($row['is_deleted'] == 1) ? 'theme-deleted': '';
        $nickname = $row['nickname'];
  
        list ($is_liked, $row_like) = countLike($id, $db, $user_id);
        
        echo "<div class='comments_item ". $is_deleted ."'>";

          // 輸出主要留言
          printContent($row, $is_liked, $id, $user_id, $row_like, $is_deleted);

          // 編輯區
          printEditTool($page, $id, $is_deleted, $row, $nickname, $user_nickname);

          // 子輸入框
          if (isLogin()) printInput($id, $user);
          
          // 子留言
          // printMsg($page, $db, $limit, $page_num, $user, $layer_num + 1, $id_store, $db_2);
          

        echo "<div>";
      }
      
    } 
  }
  
  printMsg($page, $db, $limit, $page_num, $user, 1, $id_store);
?>