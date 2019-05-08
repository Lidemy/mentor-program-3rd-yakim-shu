const request = require('request');

const token = '11gzim2pdteu8xr2p6qgotmuiur42i';
const url = 'https://api.twitch.tv/kraken/games/top';
const keyID = '_id';
const keyName = 'name';

request(
  `${url}/?client_id=${token}`,
  (error, response, body) => {
    const json = JSON.parse(body);
    json.top.forEach(element => console.log(element.game[keyID], element.game[keyName]));
  },
);
