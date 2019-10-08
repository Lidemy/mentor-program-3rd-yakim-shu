import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import reducer from './reducers';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

const storeWithMiddleware = applyMiddleware(
  promiseMiddleware,
  logger // => logger must be the last one
)(createStore);



ReactDOM.render(
  <Provider store={storeWithMiddleware(reducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
