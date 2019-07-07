<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Yakim_week12_權限管理後台</title>
  <link href="https://necolas.github.io/normalize.css/latest/normalize.css" rel="stylesheet">
  <link rel="stylesheet" href="./css/main.css">
</head>
<?php
  require_once('lib/DB_conn.php');
  require_once('lib/user.php');
  require_once('lib/page_control.php');
  
  // 非超級管理員 => 顯示錯誤訊息、跳回登入頁
  if (!isLogin() || !$user->isSuperAdmin()) {
    $page->redirectQuery('login.php', 'status', 'not_allowed');
    exit();
  }
 
?>
<body class="login theme-admin theme-super">
  <?php include("./layout/nav.php");?>
  <h1 class="title_brief">權限管理區</h1>
  <main class="container">
    
    <!-- 會員列表 -->
    <section class="comments">
      <?php
        $sql = "SELECT * FROM yakim_users ORDER BY authority ASC";
        $db->query($sql);

        // 權限標籤
        function showlabel($row) {
          if (strstr($row['authority'], 'admin_super')) return 'admin super';
          else if (strstr($row['authority'], 'admin')) return 'admin';
        }

        function defaultType($row, $type) {
          if (strstr($row['authority'], $type)) return 'selected';
        }

        while ($row = $db->result->fetch_assoc()) {
        ?>

          <div class='comments_item'>
            <p class='comments__username <?= showlabel($row) ?>'><?= encode($row['username']); ?></p>
            <form method='POST' action='./handling/handle_update_authority.php?id=<?= $row['id']; ?>'>
              <!---- 下拉選單區 ----->
              <select name='authority' class='authority'>
                <option value='normal'>一般會員</option>"
                <option value='admin' <?= defaultType($row, 'admin') ?>>管理員</option>
                <option value='admin_super' <?= defaultType($row, 'admin_super') ?>>超級管理員</option>
              </select>
              <!------------------->
              <button type='submit' class='btn btn_2'>確定</button>
            </form>
          </div>

        <?php } ?>
      </form>
    </section>
  </main>
</body>
</html>