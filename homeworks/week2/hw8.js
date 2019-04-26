// << 其實只適用範例的迷宮...我盡力了Q_____Q >>
// 1. 先畫出地圖 find Map
//      找出最右邊位置，寫入 map
// 2. 計算 map 步數
//      只要計算往左右走幾步就好，再加上 往下走的 10 步

function countMap(map) {
  const MOVE_DOWN = 10; // 往下走總共 10 步
  let gap = 0;
  let count = 0;
  for (let i = 0; i < map.length - 1; i += 1) {
    gap = Number(map[i + 1]) - Number(map[i]); // 計算左右位移步數
    count += gap < 0 ? gap * -1 : gap; // 左右位移轉成正數
  }
  return count + MOVE_DOWN;
}

function findMap(arr) {
  let map = '';
  const temp = [];
  const LINE_H = arr[0].length; // 橫排
  const LINE_V = arr.length; // 直排

  for (let i = 0; i < LINE_H; i += 1) {
    for (let j = 0; j < LINE_V; j += 1) {
      if (arr[i][j] === '.') {
        temp[1] = j; // 找出最右邊位置
      }
    }
    map += temp[1];
  }
  return countMap(map);
}

console.log(findMap([
  '#.########',
  '#........#',
  '########.#',
  '#........#',
  '#.########',
  '#........#',
  '########.#',
  '#........#',
  '#.######.#',
  '########.#',
]));

console.log(findMap([
  '#.########',
  '#........#',
  '#........#',
  '#........#',
  '#........#',
  '#........#',
  '#........#',
  '#........#',
  '#........#',
  '########.#',
]));
