import React, { Component } from 'react';
import Spinner from './../spinner/Spinner'
import './Posts.scss'

const Post = ({ post, handleBack }) => {
  return (
    <div className="article">
      <section className="article__body">
        {
          !(post.title && post.body) ? <Spinner /> :
            (
              <React.Fragment>
                <h2 className="article__title show">{post.title}</h2>
                <p>{post.body}</p>
              </React.Fragment>
            )
        }
      </section>
      <button onClick={handleBack}>Back</button>
    </div >
  )
}

class Posts extends Component {
  state = {
    postList: [],
    postId: null,
    post: {},
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(json => {
        this.setState({
          postList: json,
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.postId && prevState.postId !== this.state.postId) {
      this.getPost();
    }
  }

  handleBack = () => {
    this.setState({
      postId: null,
      post: {}
    })
  }

  getPost = () => {
    const { postId } = this.state;
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          post: data,
        })
      })
  }

  renderPostList = (postList) => {
    return (
      postList.length === 0 ? <Spinner /> : (
        postList.map(post => (
          <div className="post" key={post.id} data-id={post.id}>
            <h4
              onClick={() => {
                this.setState({ postId: post.id })
              }}
              className="post__title">
              {post.title}
            </h4>
            <p className="post__description">{post.body}</p>
          </div>
        ))
      )
    )
  }

  renderPost = () => {
    const { post } = this.state;
    return (
      <Post post={post} handleBack={this.handleBack} />
    )
  }

  render() {
    const { postId, postList, onChangePageId } = this.state;

    return (
      <div className="post-list">
        {!postId && this.renderPostList(postList, onChangePageId)}
        {postId && this.renderPost()}
      </div>
    )
  }
}
export default Posts;
