const req = require('request');

const token = '11gzim2pdteu8xr2p6qgotmuiur42i';
const url = 'https://api.twitch.tv/helix/streams';
const id = '21779'; // game_id of LOL
const num = 5;

const options = {
  url: `${url}?game_id=${id}&first=${num}`,
  headers: {
    'Client-ID': token,
  },
  json: true, // auto transform to JSON
};

function getData(body) {
  body.data.forEach(element => console.log(element.id, element.title));
  return body.pagination.cursor;
}

function sendRequest(key) {
  if (key) options.url = `${options.url}&after=${key}`; // 有拿到 key 就更新
  return new Promise((resolve, reject) => {
    req(options, (error, response, body) => {
      if (error) reject(error);
      else resolve(getData(body));
    });
  });
}
sendRequest().then(key => sendRequest(key));
