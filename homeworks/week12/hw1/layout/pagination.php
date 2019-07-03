<?php
  require_once('./lib/request_check.php');
  
  // 每頁的留言數
  $limit = 20;

  // 計算頁數
  $db->query($sql_count);
  $row_count = $db->getRow();

  $total_page = ceil($row_count['COUNT(id)'] / $limit); // => 總頁數
  $page = $requestCheck->get('page') ? (int)$_GET['page'] : 1; // => 抓 page 參數
  $current_page = basename($_SERVER['PHP_SELF']); // => 當前頁 url

  // 當前分頁高亮
  function isActive($num, $page) {
    if($page === $num) return 'active';
  }

  $prev = ($page == 1)? "unvalid" : "' href='".$current_page . "?page=". ($page - 1);
  $next = ($page == $total_page )? "unvalid" : "' href='".$current_page . "?page=". ($page + 1);

  /* ---- 分頁結構 start ---- */
  echo "<div class='pagination'>";
    
    echo "<a class='btn' href='". $current_page . "?page=". 1 ."'>第一頁</a>"; // => 第一頁
    echo "<a class='btn " .$prev. "'>&lt</a>";

    // 中間數字頁
    for ($i = 1; $i <= $total_page; $i++) {
      echo "<a class='btn " .isActive($i ,$page). "' href='". $current_page . "?page=$i'>$i</a>";
    }

    echo "<a class='btn " .$next. "'>&gt</a>";
    echo "<a class='btn' href='". $current_page . "?page=". $total_page ."'>最後頁</a>"; // => 最後頁

  echo "</div>";
  echo "<p class='pagination-summary'>共 ". $row_count['COUNT(id)'] ." 筆 - 在 ".$page." 頁 - 共 ". $total_page ." 頁</p>";
  /* ---- 分頁結構 end ---- */

  // 計算篩資料起始點
  $page_num = ($page - 1) * $limit;

?>
