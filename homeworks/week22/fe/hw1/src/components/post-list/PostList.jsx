import React, { Component } from 'react';
import Spinner from '../spinner/Spinner'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class PostList extends Component {
  state = {
    postList: [],
  }

  componentDidMount() {
    axios.get('https://qootest.com/posts')
      .then(res => {
        this.setState({
          postList: res.data,
        })
      })
  }

  render() {
    const { postList } = this.state;
    const { history } = this.props;
    return (
      <div className="post-list">
        {
          postList.length === 0 ? <Spinner /> : (
            postList.map(post => (
              <div className="post" key={post.id} data-id={post.id}
                onClick={() => {
                  history.push('/posts/' + post.id)
                }}>
                <h4 className="post__title">
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
}
export default withRouter(PostList);
