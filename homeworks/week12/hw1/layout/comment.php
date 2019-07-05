<?php
$layer_num++;

$sql_child = "SELECT C.id, U.nickname, C.content, C.is_deleted, C.created_at, U.id as user_id
FROM yakim_comments as C LEFT JOIN yakim_users as U
ON C.user_id = U.id ". $str ." layer = $layer_num AND parent_id = ?";
// echo $sql_child;
// echo 'parent_id: '. $id;
// echo 'layer: '. $layer_num;
$db_2 = new Db($servername, $username, $password, $dbname);
$db_2->stmtQuery($sql_child, 'i', $id);


// 有找到資料
while ($row_child = $db_2->stmt_result->fetch_assoc()) {
  // echo $layer_num;
  // print_r($row_child);

  $id_child = $row_child['id'];
  $is_deleted = ($row_child['is_deleted'] == 1) ? 'theme-deleted': '';
  $is_origin = ($nickname == $row_child['nickname']) ? 'default' : ''; 
  echo '在子留言';
?>
  
  <div class='comments_item <?= $is_deleted ?>'>
    <p class='comments__username'><?= encode($row_child['nickname']) ?></p>
    <time class='comments__time'><?= encode($row_child['created_at']) ?></time>
    <p class='comments__content'><?php encode($row_child['content']) ?></p>
    <a class='comments__like <?= $is_liked ?>' href='./handling/handle_<?= ($is_liked)? 'delete':'add' ?>_like.php?comment_id=<?= $id ?>&user_id=<?= $user_id; ?>'><?= $row_like ?></a>
      <?php
        if ($page->isPage('admin.php')) {
          admin_edit($id, $is_deleted, $row_child['user_id']);
        } else if (isLogin() && $nickname === $user_nickname) {
          index_edit($id, $row_child['user_id']);
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
  </div>

<?php } ?>
