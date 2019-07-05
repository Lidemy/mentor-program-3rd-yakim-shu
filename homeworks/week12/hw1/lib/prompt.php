<?php
  Class Prompt { 
    public function __construct() {
      $this->page = basename($_SERVER['PHP_SELF']);
      $this->status = $_GET['status'];
    }

    // 登入頁訊息
    private function loginMsg() {
      switch ($this->status) {
        case 'failed':
          return '帳號或密碼出錯囉！'; break;
        case 'sucess':
          return '註冊成功，請登入'; break;
        case 'empty':
          return '資料要填完喔'; break;
        case 'not_allowed':
          return '要有管理權限才可以登入後台喔'; break;
        case 'not_login':
          return '要先登入喔!'; break;
        default :
          return false;
      }
    }

    // 註冊頁訊息
    private function registerMsg() {
      switch ($this->status) {
        case 'duplicate':
          return '帳號或暱稱有人用過囉！'; break;
        case 'empty':
          return '資料要填完喔'; break;
        default :
          return false;
      }
    }

    // 判斷是哪個頁面，輸出相應訊息
    function showMsg() {
      switch ($this->page) {
        case 'login.php':
          $msg = $this->loginMsg(); break;
        case 'register.php':
          $msg = $this->registerMsg(); break;
        default: break;
      }
      if ($msg) echo '<p class="member__status">'. $msg .'</p>'; 
    }
  };
?>