const rp = require('request-promise');
const process = require('process');

const token = '11gzim2pdteu8xr2p6qgotmuiur42i';
const url = 'https://api.twitch.tv/helix/streams';
const num = 100;
const name = process.argv[2];
let keyCursor;
let keyGamdId;

const options = {
  url: `https://api.twitch.tv/helix/games?name=${name}`,
  headers: {
    'Client-ID': token,
  },
  json: true,
};

const printData = (body) => {
  body.data.forEach(element => console.log(element.id, element.title));
};

const getId = (body) => {
  keyGamdId = body.data[0].id;
  options.url = `${url}?game_id=${keyGamdId}&first=${num}`;
};

const getItemFront = (body) => {
  printData(body);
  keyCursor = body.pagination.cursor;
};

const getItemEnd = () => {
  options.url = `${options.url}&after=${keyCursor}`; // request url 加上更新過的 cursor
  rp(options)
    .then(body => printData(body));
};

rp(options)
  .then((htmlString) => {
    getId(htmlString);
    rp(options)
      .then(body => getItemFront(body)) // 抓前 100 個
      .finally(() => getItemEnd()); // 抓後 100 個
  });
