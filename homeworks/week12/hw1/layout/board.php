<?php
  require_once('lib/page_control.php');

  // index.php => 只出現未刪除留言
  $str = ($page->isPage('index.php')) ? " WHERE C.is_deleted = 0 " : ' ';
  $sql = "SELECT C.id, C.content, C.created_at, U.nickname, C.is_deleted 
  FROM yakim_comments as C LEFT JOIN yakim_users as U 
  ON C.user_id = U.id ". $str ." ORDER BY C.created_at DESC LIMIT $limit OFFSET $page_num";
  $db->query($sql);

  // 前台編輯區
  function index_edit($id) {
    echo "<a class='btn btn_1 btn_edit' data-id='$id' href=''>編輯</a>";
    echo "<a class='btn btn_1' href='./handling/handle_delete_comment.php?comment_id=$id'>刪除</a>";
  }

  // 後台編輯區
  function admin_edit($id, $is_deleted) {
    echo "<a class='btn btn_1 btn_edit' data-id='". $id ."' href=''>編輯</a>";
    if (($is_deleted)) { // => 前台已刪除的留言
      echo "<a class='btn btn_1' href='./handling/handle_recovery_comment.php?comment_id=$id'>還原</a>";
      echo "<a class='btn btn_1' href='./handling/handle_clean_comment.php?comment_id=$id'>永久清除</a>";
    } else {
      echo "<a class='btn btn_1' href='./handling/handle_delete_comment.php?comment_id=$id'>刪除</a>";
    }
  }

  while ($row = $db->result->fetch_assoc()) {
    $id = $row['id'];
    $is_deleted = ($row['is_deleted'] == 1) ? 'theme-deleted': '';
?>

  <div class='comments_item <?= $is_deleted ?>'>
    <p class='comments__username'><?= encode($row['nickname']) ?></p>
    <time class='comments__time'><?= encode($row['created_at']) ?></time>
    <p class='comments__content'><?php encode($row['content']) ?></p>
      <?php
        if ($page->isPage('admin.php')) {
          admin_edit($id, $is_deleted);
        } else if (isLogin() && $row['nickname'] === $user->row_users['nickname']) {
          index_edit($id);
        } 
      ?>
  </div>

<?php } ?>