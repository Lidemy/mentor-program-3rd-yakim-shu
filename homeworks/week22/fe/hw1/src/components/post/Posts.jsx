/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Spinner from './../spinner/Spinner'

class Posts extends Component {
  state = {
    postList: [],
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

  render() {
    const { postList } = this.state;
    const { onChangePage } = this.props;

    return (
      <div className="post-list">
        {
          postList.length === 0 ? <Spinner /> : (
            postList.map(post => (
              <div className="post" key={post.id} data-id={post.id}>
                <h5 onClick={(e) => onChangePage(e, 'post', post.id)}
                  className="post__title">
                  {post.title}
                </h5>
                <p className="post__description">{post.body}</p>
              </div>
            ))
          )
        }
      </div>
    )
  }
}
export default Posts;
