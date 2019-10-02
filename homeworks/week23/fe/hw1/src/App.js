import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";


import Header from './components/header/Header'
import Nav from './components/nav/Nav';
import About from './components/about/About';
import Article from './components/post/Post';
import PostList from './components/post-list/PostList';
import Home from './components/home/Home';
import PostEdit from './components/post-edit/PostEdit';

import './scss/index.scss';



class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="wrapper" >
          <Nav />
          <Header />
          <main className="container">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route exact path="/posts" component={PostList} />
            <Route path="/posts/:id" component={Article} />
            <Route path="/add-post" component={PostEdit} />
            <Route path="/edit-post/:id" component={PostEdit} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
