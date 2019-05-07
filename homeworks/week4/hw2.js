const process = require('process');
const rp = require('request-promise');

const baseUrl = 'https://lidemy-book-store.herokuapp.com/books';
const parameter = process.argv[2];
const num = process.argv[3];

function getJson(body) {
  const json = JSON.parse(body);
  if (json.length > 1) {
    json.map(element => console.log(element.id, element.name));
  } else {
    console.log(json.id, json.name);
  }
}

if (parameter === 'list') {
  rp(`${baseUrl}?_limit=${num || 20}`) // 預設 20，有丟數字進去可以改值
    .then(htmlString => getJson(htmlString));
}
if (parameter === 'read') {
  rp(`${baseUrl}/${num}`)
    .then(htmlString => getJson(htmlString));
}
