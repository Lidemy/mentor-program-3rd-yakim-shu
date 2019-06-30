<?php
class PageControl {
  private $location = 'Location: ';
  
  // 跳轉頁
  function redirect($url) {
    header($this->location. './' . $url);
  }

  // 跳轉帶 query string 的頁面
  function redirectQuery($url, $key = '', $value = '') {
    header($this->location. './' . $url . '?' . $key . '=' . $value);
  }
  
  // 回上頁
  function back() {
    header($this->location . $_SERVER['HTTP_REFERER']);
  }
}
$page = new PageControl();

?>