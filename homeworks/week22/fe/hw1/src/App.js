import React, { Component } from 'react';
import Nav from './components/nav/Nav'
import About from './components/about/About'
import Posts from './components/post/Posts'

import './index.scss'

const removeHashTag = str => {
  return str.slice(1);
}

class App extends Component {
  state = {
    page: removeHashTag(window.location.hash) || 'index',
    postId: null,
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.page === this.state.page) return false;
    return true;
  }

  handleHashChange = () => {
    this.setState({
      page: removeHashTag(window.location.hash),
    })
  }

  render() {
    const { page } = this.state;
    return (
      <div className="wrapper" >
        <Nav
          page={page} />
        <main className="cotainer">
          {page === 'about' && <About />}
          {page === 'posts' && <Posts />}
          {page === 'index' && <p>index</p>}
        </main>
      </div>
    );
  }
}

export default App;
