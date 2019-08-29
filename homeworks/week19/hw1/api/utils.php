<?php
function sendResponseMsg($status, $resMsg, $result = ''){
  echo json_encode(array(
    'status' => $status,
    'result' => $result,
    'message' => $resMsg
  ), JSON_UNESCAPED_UNICODE);
}
?>