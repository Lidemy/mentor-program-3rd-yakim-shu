const request = require('request');

const baseUrl = 'https://lidemy-book-store.herokuapp.com/books';
const num = 10;
request(
  `${baseUrl}/?_limit=${num}}`,
  (error, response, body) => {
    JSON.parse(body).forEach(element => console.log(element.id, element.name));
  },
);
