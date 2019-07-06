// 離開頁面 => 儲存位置
window.addEventListener('unload', () => {
  const html = document.documentElement;
  sessionStorage.position = html.scrollTop;
  sessionStorage.page = window.location.href;
});

// 載入頁面 => 跳到儲存位置
window.addEventListener('load', () => {
  const positionLastTime = sessionStorage.position;
  const page = sessionStorage.site;
  if (positionLastTime && page === window.location.href) {
    window.scrollTo({
      top: positionLastTime,
      left: 0,
      behavior: 'smooth', // => 滑動效果
    });
    sessionStorage.position = ''; // => 消除紀錄
  }
});
