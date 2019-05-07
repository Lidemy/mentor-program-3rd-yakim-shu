const request = require('request');
const process = require('process');
const rp = require('request-promise');

const baseUrl = 'https://lidemy-book-store.herokuapp.com/books';
const method = process.argv[2];
const firstKey = process.argv[3];
const secondKey = process.argv[4];

function getJson(body) {
  const json = JSON.parse(body);
  if (json.length > 1) {
    json.map(element => console.log(element.id, element.name));
  } else {
    console.log(json.id, json.name);
  }
}

if (method === 'list') {
  rp(`${baseUrl}?_limit=${firstKey || 20}`)
    .then(htmlString => getJson(htmlString));
}
if (method === 'read') {
  rp(`${baseUrl}/${firstKey}`)
    .then(htmlString => getJson(htmlString));
}
if (method === 'delete') request.delete(`${baseUrl}/${firstKey}`);
if (method === 'create') request.post(baseUrl).form({ name: firstKey });
if (method === 'update') request.patch(`${baseUrl}/${firstKey}`).form({ name: secondKey });
