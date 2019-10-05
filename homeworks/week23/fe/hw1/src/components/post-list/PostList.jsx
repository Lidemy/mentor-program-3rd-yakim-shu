import React, { Component } from 'react';
import Spinner from '../spinner/Spinner';
import { withRouter } from 'react-router-dom';
import { getDate, getYear } from './../../utils';
import { Link } from 'react-router-dom';

const Item = ({ post }) => {
  return (
    <Link to={`/posts/${post.id}`} className='post'>
      <p className="post__date">
        <span>{getDate(post.createdAt)}</span>
        {getYear(post.createdAt)}
      </p>
      <h4 className="post__title">{post.title}</h4>
      <p className="post__description">{post.body}</p>
    </Link>
  )
};

class PostList extends Component {
  componentWillMount() {
    const { getAllPosts } = this.props;
    getAllPosts();
  }

  render() {
    const { postList } = this.props;
    return (
      <div className="post-list">
        {
          !postList.length ? <Spinner /> : (
            postList.map(post => (
              <Item post={post} key={post.id} />
            ))
          )
        }
      </div>
    )
  }
}
export default withRouter(PostList);
