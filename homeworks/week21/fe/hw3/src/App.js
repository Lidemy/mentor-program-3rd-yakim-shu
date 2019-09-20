import React, { Component } from 'react';
import Header from './components/header'
import Posts from './components/posts'
import Post from './components/post'
import './index.scss'

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleChangePage = this.handleChangePage.bind(this);
  // }

  state = {
    page: 'index',
    postId: null,
  }

  componentDidMount() {
    console.log(window.location.pathname.substring(1));
  }

  componentDidUpdate() {
    const { page, postId } = this.state;
    window.onpopstate = function (event) {
      event.preventDefault();
      console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
      window.history.go();
    };

    console.log('現在 page: ', this.state.page);
    const url = postId ? `${page}/${postId}` : page;
    window.history.pushState(null, '1', url);
  }

  handleChangePage = (e, page, id = null) => {
    e.preventDefault();
    this.setState({
      page,
      postId: id
    })
  }

  switchPage = (page) => {
    switch (page) {
      case 'post':
        return (
          <Post id={this.state.postId} />
        )
      case 'about':
        return (
          <p>aboutaboutaboutabout</p>
        )
      case '':
      case 'index':
      default:
        return (
          <Posts handleChangePage={this.handleChangePage} />
        )
    }
  }

  render() {
    const { page } = this.state;
    return (
      <div className="App" >
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
