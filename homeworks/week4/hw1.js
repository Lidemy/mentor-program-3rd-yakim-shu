const request = require('request');

const baseUrl = 'https://lidemy-book-store.herokuapp.com/books';
request(
  `${baseUrl}/?_limit=10}`,
  (error, response, body) => {
    JSON.parse(body).forEach(element => console.log(element.id, element.name));
  },
);
