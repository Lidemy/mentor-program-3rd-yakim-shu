import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from './components/nav/Nav';
import About from './components/about/About';
import Posts from './components/post/Posts';
import Home from './components/home/Home';

import './index.scss'

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="wrapper" >
          <Nav />
          <main className="cotainer">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/posts" component={Posts} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
