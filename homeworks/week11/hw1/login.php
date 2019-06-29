<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Yakim_week11_登入會員</title>
  <link href="https://necolas.github.io/normalize.css/latest/normalize.css" rel="stylesheet">
  <link rel="stylesheet" href="./css/main.css">
</head>
<body class="theme-member">
  <?php include("./layout/nav.php");?>
  
  <main class="container">
    <?php
    require_once('./lib/request_check.php');
    require_once('./lib/prompt.php');
    
    if ($requestCheck->get('status')) {
      $prompt = new Prompt();
      $prompt->showMsg();
    }

    ?>
    <section class="member shadow">
      <h2 class="title_1">登入會員</h2>
      <form class="form" method="POST" action="handle_login.php">
        <ul>
          
          <li>
            <label for="username">帳號</label>
            <input type="text" name="username" id="username" required>
          </li>
          <li>
            <label for="password">密碼</label>
            <input type="password" name="password" id="password" required>
          </li>
          <button class="member__submit" type="submit">送出 →</button>
        </ul>
        
    </form>
    </section>
  </main>
</body>
</html>