<?php
  function sendResponseMsg($result, $resMsg){
    echo json_encode(array(
      'result' => $result,
      'message' => $resMsg
    ), JSON_UNESCAPED_UNICODE);
  }

  function encode($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'utf-8');
  }
?>