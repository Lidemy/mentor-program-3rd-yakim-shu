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

  // index.php => 只出現未刪除留言
  $str = ($page->isPage('index.php')) ? " WHERE C.is_deleted = 0 AND " : ' WHERE ';
  $sql = "SELECT C.id, C.content, C.created_at, U.nickname, C.is_deleted, U.id as user_id
  FROM yakim_comments as C LEFT JOIN yakim_users as U
  ON C.user_id = U.id ". $str ." layer = 1 ORDER BY C.created_at DESC LIMIT ? OFFSET ?";
  $db->stmtQuery($sql, 'ii', $limit, $page_num);

  if (isLogin()) {
    $user_id = $user->row_users['id'];
    $user_nickname = $user->row_users['nickname'];
  }

  // 處理按讚 -----
  while ($row = $db->stmt_result->fetch_assoc()) {
    $id = $row['id'];
    $is_deleted = ($row['is_deleted'] == 1) ? 'theme-deleted': '';
    $nickname = $row['nickname'];

    $sql = "SELECT user_id, COUNT(id) FROM yakim_likes WHERE comment_id = $id GROUP BY user_id";
    $db->query($sql);
    
    $is_liked = '';
    $row_like = 0;
    while ($row_check = $db->result->fetch_assoc()) {
      $row_like += $row_check['COUNT(id)'];
      if (isLogin() && $row_check['user_id'] == $user_id ) $is_liked = 'liked';
    }
  // --------

?>

  <div class='comments_item <?= $is_deleted ?>'>
    <p class='comments__username'><?= encode($row['nickname']) ?></p>
    <time class='comments__time'><?= encode($row['created_at']) ?></time>
    <p class='comments__content'><?php encode($row['content']) ?></p>
    <a class='comments__like <?= $is_liked ?>' href='./handling/handle_<?= ($is_liked)? 'delete':'add' ?>_like.php?comment_id=<?= $id ?>&user_id=<?= $user_id; ?>'><?= $row_like ?></a>
      <?php
        if ($page->isPage('admin.php')) {
          admin_edit($id, $is_deleted, $row['user_id']);
        } else if (isLogin() && $nickname === $user_nickname) {
          index_edit($id, $row['user_id']);
        } 

          // <!-- 子輸入框 -->
          if (isLogin()) {
          ?>
          <section class="comment__inside">
            <form action="./handling/handle_post_comment.php" method="POST">
              <textarea class="comment__input comment__input-inside" name="content" rows="2" placeholder="回應" required></textarea>
              <input type='hidden' name='parent_id' value='<?= $id ?>'>
              <input type="hidden" name="id" value="<?= $user->row_users['id'] ?>">
              <button class="btn btn_1" type="submit">送出</button>
            </form>
          </section>
          <?php
          }
          ?>

          <?php
          // 子留言
          $sql_child = "SELECT C.id, U.nickname, C.content, C.is_deleted, C.created_at, U.id as user_id
          FROM yakim_comments as C LEFT JOIN yakim_users as U
          ON C.user_id = U.id ". $str ." parent_id = ?";
          $db_2 = new Db($servername, $username, $password, $dbname);
          $db_2->stmtQuery($sql_child, 'i', $id);

          // 有找到資料
          while ($row_child = $db_2->stmt_result->fetch_assoc()) {
            $id_child = $row_child['id'];
            $is_deleted = ($row_child['is_deleted'] == 1) ? 'theme-deleted': '';
            $is_origin = ($nickname == $row_child['nickname']) ? 'default' : '';
          ?>
              <section class='comment__child <?= $is_deleted ?>'>
                <p class='comments__username <?= $is_origin ?>'><?= encode($row_child['nickname']) ?></p>
                <time class='comments__time'><?= encode($row['created_at']) ?></time>
                <p class='comments__content'><?= $row_child['content'] ?></p>
                <?php
                  if ($page->isPage('admin.php')) {
                    admin_edit($id_child, $is_deleted, $row_child['user_id']);
                  } else if (isLogin() && $row_child['nickname'] === $user_nickname) {
                    index_edit($id_child, $row_child['user_id']);
                  } 
                ?>
              </section>
          
              
          
      <?php
        }
      ?>
      
  </div>


<?php } ?>

  