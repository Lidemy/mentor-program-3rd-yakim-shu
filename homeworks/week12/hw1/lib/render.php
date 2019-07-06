<?php
require_once('user.php');

class Render {
  public function __construct($db, $page, $user= '') {
    $this->db = $db;
    $this->page = $page;
    $this->user = $user;
    $this->currentID = isLogin() ? $user->row_users['id'] : '';
    $this->currentNickname = isLogin() ? $user->row_users['nickname'] : '';
  }

  // 編輯區：前台
  function index_edit($id, $user_id) {
    echo "<a class='btn btn_1 btn_edit' data-id='$id' data-user='$user_id'>編輯</a>";
    echo "<a class='btn btn_1' href='./handling/handle_delete_comment.php?comment_id=$id&user_id=$user_id'>刪除</a>";
  }

  // 編輯區：後台
  function admin_edit($id, $is_deleted, $user_id) {
    echo "<a class='btn btn_1 btn_edit' data-id='$id' data-user='$user_id'>編輯</a>";
    if (($is_deleted)) { // => 前台已刪除的留言
      echo "<a class='btn btn_1' href='./handling/handle_recovery_comment.php?comment_id=$id&user_id=$user_id'>還原</a>";
      echo "<a class='btn btn_1' href='./handling/handle_clean_comment.php?comment_id=$id&user_id=$user_id'>永久清除</a>";
    } else {
      echo "<a class='btn btn_1' href='./handling/handle_delete_comment.php?comment_id=$id&user_id=$user_id'>刪除</a>";
    }
  }

  // 編輯區：控制前後台
  function printEditTool($row, $id, $is_deleted) {
    // global $currentNickname;
    if ($this->page->isPage('admin.php')) {
      $this->admin_edit($id, $is_deleted, $row['user_id']);
    } else if (isLogin() && $row['nickname'] === $this->currentNickname) {
      $this->index_edit($id, $row['user_id']);
    } 
  }

  // 訊息區塊
  function printContent($row, $id, $is_origin) {
    list ($is_liked, $row_like) = getLikesTotal($id);
    $method = ($is_liked)? 'delete':'add';

    echo  "<p class='comments__username $is_origin'>". encode($row['nickname']) ."</p>";
    echo  "<time class='comments__time'>". $row['created_at'] ."</time>";
    echo  "<p class='comments__content'>". encode($row['content']) ."</p>";
    if (isLogin()) {
      echo  "<a class='comments__like ". $is_liked ."' href='./handling/handle_". $method ."_like.php?comment_id=$id&user_id=$this->currentID'>$row_like</a>";
    } else {
      echo  "<a class='comments__like' href='login.php?status=not_login'>$row_like</a>";
    }
  }

  // 新增訊息區
  function printInput($row, $id, $layer) {
    global $user, $lauer, $max_layer;
    $is_Last = $layer > $max_layer ? 'last' : '';

    echo "<section class='comment__inside $is_Last'>";
    echo  "<form action='./handling/handle_post_comment.php' method='POST'>";
    echo    "<textarea class='comment__input comment__input-inside' name='content' rows='2' placeholder='回應 ". $row['nickname'] ."' required></textarea>";
    echo    "<input type='hidden' name='parent_id' value='$id'>";
    echo    "<input type='hidden' name='layer' value='$layer'>";
    echo    "<input type='hidden' name='current_user_id' value='". $user->row_users['id'] ."'>";
    echo    "<button class='btn btn_1' type='submit'>送出</button>";
    echo  "</form>";
    echo "</section>";
  }
}

$render = isLogin() ? new Render($db, $page, $user) : new Render($db, $page);



?>