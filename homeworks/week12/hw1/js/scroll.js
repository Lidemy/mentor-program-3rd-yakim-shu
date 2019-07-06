// 離開頁面 => 儲存位置
window.addEventListener('unload', () => {
  const html = document.documentElement;
  sessionStorage.position = html.scrollTop;
  sessionStorage.page = window.location.href;
});

// 載入頁面 => 跳到儲存位置
window.addEventListener('load', () => {
  const positionLast = sessionStorage.position;
  const pageLast = sessionStorage.page;
  if (positionLast && pageLast === window.location.href) {
    window.scrollTo({
      top: positionLast,
      left: 0,
      behavior: 'smooth', // => 滑動效果
    });
  }
});
