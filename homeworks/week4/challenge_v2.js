const rp = require('request-promise');

const token = '11gzim2pdteu8xr2p6qgotmuiur42i';
const url = 'https://api.twitch.tv/helix/streams';
const id = '21779'; // game_id of LOL
const num = 5;
let keyNext;

const options = {
  url: `${url}?game_id=${id}&first=${num}`,
  headers: {
    'Client-ID': token,
  },
  json: true, // auto transform to JSON
};

const printData = (body) => {
  body.data.forEach(element => console.log(element.id, element.title));
};
const getItemFront = (body) => {
  printData(body);
  keyNext = body.pagination.cursor;
};
const getItemEnd = () => {
  options.url = `${options.url}&after=${keyNext}`; // request url 加上更新過的 cursor
  rp(options)
    .then(body => printData(body));
};

rp(options)
  .then(body => getItemFront(body)) // 抓前 100 個
  .finally(() => getItemEnd()); // 抓後 100 個
