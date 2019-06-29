<?php
class RequestCheck {
  private $m_get = 'get';
  private $m_post = 'post';

  private function getSingle($target, $method) {
    if ($method === 'get') {
      return isset($_GET[$target]) && !empty($_GET[$target]);
    } else if ($method === 'post') {
      return isset($_POST[$target]) && !empty($_POST[$target]);
    }
  }

  // 檢查多個 query 值
  function getList(...$List) {
    foreach($List as $key => $value) {
      if (!$this->getSingle($value, $this->m_get)) return false;
    }
    return true;
  }

  function postList(...$List) {
    foreach($List as $key => $value) {
      if (!$this->getSingle($value, $this->m_post)) return false;
    }
    return true;
  }

  // 檢查單個 query 值
  function get($str) {
    return $this->getSingle($str, $this->m_get);
  }
  function post($str) {
    return $this->getSingle($str, $this->m_post);
  }
}
$requestCheck = new RequestCheck();

?>