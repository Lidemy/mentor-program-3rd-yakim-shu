<?php
  function encode($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'utf-8');
  }
?>