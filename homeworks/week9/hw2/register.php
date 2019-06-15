<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Yakim_week9_註冊會員</title>
  <link href="https://necolas.github.io/normalize.css/latest/normalize.css" rel="stylesheet">
  <link rel="stylesheet" href="./css/main.css">
</head>
<body class="theme-member">
  <?php include("./layout/nav.php");?>
  <main class="container">
    <?php
    require_once('./DB_conn.php');
    if (isset($_GET['is_username']) || isset($_GET['is_nickname'])) {
      $username = $_GET['is_username'] === 'unvalid' ? '帳號' : '';
      $nickname = $_GET['is_nickname'] === 'unvalid' ? ' 暱稱' : '';
      echo '<p class="member__status">'. $username . $nickname .'有人用過囉！</p>';
    }
    ?>
    <section class="member shadow">
      <h2 class="title_1">註冊會員</h2>
      <form class="form" method="POST" action="handle_register.php">
        <ul>
          <li>
            <label for="username">帳號</label>
            <input type="text" name="username" id="username" required>
          </li>
          <li>
            <label for="password">密碼</label>
            <input type="password" name="password" id="password" required>
          </li>
          <li>
            <label for="nickname">暱稱</label>
            <input type="text" name="nickname" id="nickname" required>
          </li>
          <button class="member__submit" type="submit">送出 →</button>
        </ul>
    </form>
    </section>
  </main>
  <script src="./js/index.js"></script>
</body>
</html>