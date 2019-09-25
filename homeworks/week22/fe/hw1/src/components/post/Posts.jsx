import React, { Component } from 'react';
import Spinner from './../spinner/Spinner'
import axios from 'axios';
import './Posts.scss'

const Post = ({ post, handleBack }) => (
  !(post.title && post.body) ? <Spinner /> :
    (
      <section className="article">
        <h2 className="article__title show">{post.title}</h2>
        <p>{post.body}</p>
        <button onClick={handleBack}>Back</button>
      </section>
    )
);

class Posts extends Component {
  state = {
    postList: [],
    postId: null,
    post: {},
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        this.setState({
          postList: res.data,
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
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => {
        this.setState({
          post: res.data,
        })
      })
  }

  renderPostList = (postList) => {
    return (
      <div className="post-list">
        {
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
        }
      </div>
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
      <>
        {!postId && this.renderPostList(postList, onChangePageId)}
        {postId && this.renderPost()}
      </>
    )
  }
}
export default Posts;
