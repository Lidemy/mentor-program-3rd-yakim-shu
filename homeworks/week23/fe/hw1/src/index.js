import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import App from './containers/App';
import reducer from './reducers';
import logger from 'redux-logger'

const storeWithMiddleware = applyMiddleware(
  promise,
  logger // => logger must be the last one
)(createStore);

ReactDOM.render(
  <Provider store={storeWithMiddleware(reducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
