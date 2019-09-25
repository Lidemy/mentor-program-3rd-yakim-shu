import React, { Component } from 'react';
import Nav from './components/nav/Nav'
import About from './components/about/About'
import Posts from './components/post/Posts'
import Post from './components/post/Post'

import './index.scss'

class App extends Component {
  state = {
    page: 'index',
    postId: null,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.page === this.state.page) return false;
    return true;
  }

  componentDidUpdate() {
    const { page } = this.state;
    const url = this.postId ? `${page}/${this.postId}` : page;
    // window.history.pushState(null, null, url);
    console.log(page);
  }

  handleChangePage = (e, page, id = null) => {
    e.preventDefault();
    this.setState({
      page,
      postId: id
    })
  }

  render() {
    const { page, postId } = this.state;
    return (
      <div className="wrapper" >
        <Nav
          page={page}
          onChangePage={this.handleChangePage} />
        <main className="cotainer">
          {page === 'about' && <About />}
          {page === 'post' && <Post id={postId} onChangePage={this.handleChangePage} />}
          {page === 'posts' && <Posts onChangePage={this.handleChangePage} />}
          {page === 'index' && <p>index</p>}
        </main>
      </div>
    );
  }
}

export default App;
