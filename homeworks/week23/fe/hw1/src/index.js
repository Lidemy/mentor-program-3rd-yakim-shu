import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import App from './containers/App';
import postsReducer from './reducers/post-list';

const storeWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={storeWithMiddleware(postsReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
