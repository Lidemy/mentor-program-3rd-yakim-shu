
// 取中間數當作參照值
function searchIndex(start, end) {
  return Math.floor((start + end) / 2);
}
// 主程式
function search(arr, target) {
  let start = 0;
  let end = arr.length;
  let index = searchIndex(start, end);
  // 起始點 與 終點 中間沒有其他數就跳出
  while (end > start + 1) {
    if (arr[index] === target) return index; // 找到目標
    if (arr[index] > target) {
      end = index;
    } else {
      start = index;
    }
    index = searchIndex(start, end); // 更新參照值
  }
  return -1;
}

console.log(search([1, 3, 10, 14, 39], 14));
console.log(search([1, 3, 10, 14, 39], 99));

// 設 start = 0; end = length-1;
// index 代表參照值 = (start+end)/2;
// 判斷 if (arr[index] == target) 回傳 index
// else if (arr[index] > target)
//      代表 target 比較小，往左找
//      設 end = index, start 不動
// else if (arr[index] < target)
//      代表 target 比較大，往右找
//      設 start = index, end 不動
// 直到前後交叉： start >= end，回傳 -1
