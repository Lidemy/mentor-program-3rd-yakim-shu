<?php
require_once('user.php');

class Render {
  public function __construct($db, $page, $user= '') {
    $this->db = $db;
    $this->page = $page;
    $this->user = $user;
    $this->currentID = isLogin() ? $user->id : '';
    $this->currentNickname = isLogin() ? $user->nickname : '';
  }

  // 編輯區：前台
  private function index_edit($id, $user_id) {
    echo "<a class='btn btn_1 btn_edit'>編輯</a>";
    echo "<a class='btn btn_1 btn_delete'>刪除</a>";
  }

  // 編輯區：後台
  private function admin_edit($id, $is_deleted, $user_id) {
    echo "<a class='btn btn_1 btn_edit'>編輯</a>";
    if (($is_deleted)) { // => 前台已刪除的留言
      echo "<a class='btn btn_1 btn_recovery'>還原</a>";
      echo "<a class='btn btn_1 btn_clean'>永久清除</a>";
    } else {
      echo "<a class='btn btn_1 btn_delete'>刪除</a>";
    }
  }

  // 編輯區：控制前後台
  function editArea($row, $id, $is_deleted) {
    if ($this->page->isPage('admin.php')) {
      $this->admin_edit($id, $is_deleted, $row['user_id']);
    } else if (isLogin() && $row['nickname'] === $this->currentNickname) {
      $this->index_edit($id, $row['user_id']);
    } 
  }

  // 訊息區塊
  function contentArea($row, $id, $is_origin) {
    list ($is_liked, $row_like) = getLikesTotal($id);
    $method = ($is_liked)? 'remove':'add';

    echo  "<p class='comments__username $is_origin'>". encode($row['nickname']) ."</p>";
    echo  "<time class='comments__time'>". $row['created_at'] ."</time>";
    echo  "<p class='comments__content'>". encode($row['content']) ."</p>";
    if (isLogin()) {
      echo  "<a class='comments__like btn btn_".$method."_like ". $is_liked ."'>$row_like</a>";
    } else {
      echo  "<a class='comments__like' href='login.php?status=not_login'>$row_like</a>";
    }
  }

  // 新增訊息區
  function inputArea($row, $id, $layer) {
    global $user, $max_layer;
    $is_Last = $layer > $max_layer ? 'last' : '';

    echo "<section class='comment__inside $is_Last'>";
    echo  "<form action='./handling/handle_post_comment.php' method='POST'>";
    echo    "<textarea class='comment__input comment__input-inside' name='content' rows='2' placeholder='回應 ". encode($row['nickname']) ."' required></textarea>";
    echo    "<a class='btn btn_1 btn_post' data-parent='$id' data-layer='$layer'>送出</a>";
    echo  "</form>";
    echo "</section>";
  }
}

$render = isLogin() ? new Render($db, $page, $user) : new Render($db, $page);

?>