<?php
  Class showMsg { 
    public function __construct($status, $msg) {
      if ($_GET['status'] === $status) echo '<p class="member__status">'. $msg .'</p>'; 
    }
  };
?>