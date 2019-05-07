const rp = require('request-promise');

const token = '11gzim2pdteu8xr2p6qgotmuiur42i';
const url = 'https://api.twitch.tv/helix/streams';
const id = '21779'; // game_id of LOL
const num = 100;
let keyCursor;

const options = {
  url: `${url}?game_id=${id}&first=${num}`,
  headers: {
    'Client-ID': token,
  },
  json: true,
};

const printData = (body) => {
  body.data.forEach((element, i) => console.log(`${i}: `, element.viewer_count, element.title));
};

const getItemFront = (body) => {
  printData(body);
  keyCursor = body.pagination.cursor;
};

const getItemEnd = () => {
  options.url = `${options.url}&after=${keyCursor}`; // request url 加上更新過的 cursor
  rp(options)
    .then(htmlString => printData(htmlString));
};


rp(options)
  .then(htmlString => getItemFront(htmlString)) // 抓前 100 個
  .finally(() => getItemEnd()); // 抓後 100 個
