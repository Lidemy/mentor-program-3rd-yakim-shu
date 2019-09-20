import { Route, IndexRoute } from 'react-router';
import App, Post, Index from './App';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="posts" component={Post} />
    <Route path="about" component={About} />
  </Route>
);