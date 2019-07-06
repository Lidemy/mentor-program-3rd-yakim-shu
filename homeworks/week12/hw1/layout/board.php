<?php
  require_once('lib/page_control.php');
  require_once('lib/render.php');

  // 處理按讚
  function getLikesTotal($id) {
    global $render, $db;
    $sql = "SELECT user_id, COUNT(id) FROM yakim_likes WHERE comment_id = $id GROUP BY user_id";
    $db->query($sql);
    $likes_total = 0;
    $is_liked = '';

    while ($row_check = $db->result->fetch_assoc()) {
      $likes_total += $row_check['COUNT(id)'];
      if (isLogin() && $row_check['user_id'] == $render->currentID ) $is_liked = 'liked';
    }
    return array($is_liked, $likes_total);
  }

  // 拼裝 SQL 語法
  function getSQL($layer, $parent_id) {
    global $page;
    $str = ($page->isPage('index.php')) ? " WHERE C.is_deleted = 0 AND " : ' WHERE ';
    return "SELECT C.id, U.nickname, C.content, C.is_deleted, C.created_at, U.id as user_id
    FROM yakim_comments as C LEFT JOIN yakim_users as U
    ON C.user_id = U.id ". $str ." C.layer = $layer AND C.parent_id = ?
    ORDER BY C.created_at DESC LIMIT ? OFFSET ?";
  }

  $max_layer = 5;
  // 輸出一層留言 -----------------------
  function showMsg($db, $parent_id, $layer, $nickname_layer1 = '') {
    global $page_num, $limit, $render, $user, $max_layer;
    
    if ($layer > $max_layer) return;

    $sql = getSQL($layer, $parent_id);
    $db = new Db($db->server, $db->user, $db->pass, $db->db);
    $db->stmtQuery($sql, 'iii', $parent_id, $limit, $page_num);

    while ($row = $db->stmt_result->fetch_assoc()) {
      $id = $row['id'];
      $is_deleted = ($row['is_deleted'] == 1) ? 'theme-deleted': '';

      $is_sub = ($layer > 1) ? 'comments_child' : ''; // => 子留言
      if ($layer == 1) $nickname_layer1 = $row['nickname']; // => 原 PO 暱稱
      $is_origin = ($nickname_layer1 === $row['nickname'] && $is_sub) ? 'default' : ''; // => 原 PO 標籤

      echo "<div class='comments_item $is_sub $is_deleted'>";
        $render->printContent($row, $id, $is_origin); //      => 上層留言
        $render->printEditTool($row, $id, $is_deleted); //    => 編輯區
        if (isLogin()) $render->printInput($row, $id, $layer+1); // => 輸入框
        showMsg($db, $id, $layer+1, $nickname_layer1); //     => 子留言
      echo "</div>";
    }
  }
  showMsg($db, 0, 1);
  // -------------------------------------------------

  
?>

  