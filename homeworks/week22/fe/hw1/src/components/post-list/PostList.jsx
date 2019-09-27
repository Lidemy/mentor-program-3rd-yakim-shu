import React, { Component } from 'react';
import Spinner from '../spinner/Spinner';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import getDate from './../../utils';

const Item = ({ post, history }) => {
  return (
    <div
      className="post"
      key={post.id}
      onClick={() => {
        history.push('/posts/' + post.id)
      }}>
      <p className="post__date">{getDate(post.createdAt)}</p>
      <h4 className="post__title">{post.title}</h4>
      <p className="post__description">{post.body}</p>
    </div>
  )
};


class PostList extends Component {
  state = {
    postList: null,
  }

  componentDidMount() {
    axios.get('https://qootest.com/posts?_sort=id&_order=desc')
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
          !postList ? <Spinner /> : (
            postList.map(post => (
              <Item post={post} key={post.id} history={history} />
            ))
          )
        }
      </div>
    )
  }
}
export default withRouter(PostList);
