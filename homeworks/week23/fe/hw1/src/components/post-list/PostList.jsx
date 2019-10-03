import React, { Component } from 'react';
import Spinner from '../spinner/Spinner';
import { withRouter } from 'react-router-dom';
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
  componentWillMount() {
    const { getAllPosts } = this.props;
    getAllPosts();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.posts !== this.posts) return true;
  //   return false;
  // }

  render() {
    const { postList } = this.props;
    const { history } = this.props;
    console.log('list: ', postList);
    return (
      <div className="post-list">
        {
          !postList.length ? <Spinner /> : (
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
