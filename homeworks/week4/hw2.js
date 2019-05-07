const process = require('process');
const rp = require('request-promise');

const baseUrl = 'https://lidemy-book-store.herokuapp.com/books';
const num = 20;
const method = process.argv[2];
const firstKey = process.argv[3];

function getJson(body) {
  const json = JSON.parse(body);
  if (json.length > 1) {
    json.map(element => console.log(element.id, element.name));
  } else {
    console.log(json.id, json.name);
  }
}

if (method === 'list') {
  rp(`${baseUrl}?_limit=${num || 20}`) // 預設 20，有丟數字進去可以改值
    .then(htmlString => getJson(htmlString));
}
if (method === 'read') {
  rp(`${baseUrl}/${firstKey}`)
    .then(htmlString => getJson(htmlString));
}
