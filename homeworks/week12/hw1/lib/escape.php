<?php
  function encode($str) {
    echo htmlspecialchars($str, ENT_QUOTES, 'utf-8');
  }
?>