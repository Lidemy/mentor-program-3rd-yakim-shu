import React, { Component } from 'react';
import Header from './components/header'
import Posts from './components/posts'
import Post from './components/post'
import About from './components/about'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'

class App extends Component {
  constructor(props) {
    super(props);
    this.posdId = null;
  }

  state = {
    page: 'index',
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.page === this.state.page) return false;
    return true;
  }

  componentDidUpdate() {
    const { page } = this.state;
    const url = this.postId ? `${page}/${this.postId}` : page;
    window.history.pushState(null, null, url);
  }

  handleChangePage = (e, page, id = null) => {
    e.preventDefault();
    this.postId = id;
    this.setState({
      page,
    })
  }

  switchPage = (page) => {
    switch (page) {
      case 'post':
        return <Post id={this.postId} />;
      case 'about':
        return <About />;

      case '': default:
        return <Posts handleChangePage={this.handleChangePage} />
    }
  }

  render() {
    const { page } = this.state;
    return (
      <div className="wrapper" >
        <Header
          handleChangePage={this.handleChangePage}
        />
        <main className="cotainer">
          {this.switchPage(page)}
        </main>
      </div>
    );
  }
}

export default App;
