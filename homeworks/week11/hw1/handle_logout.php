<?php
session_destroy(); // => 重置 session
setcookie('session_id' , '', time()+3600*24, '/');
header('Location: ./index.php')
?>