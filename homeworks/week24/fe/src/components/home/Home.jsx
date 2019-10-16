import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { getDate } from './../../utils';
import Spinner from '../spinner/Spinner';
import Img from 'react-image';

const ListContent = ({ post }) => (
  <div className="home-list__item-inner">
    <div className="home-list__title">
      <span>{getDate(post.createdAt)}</span>
      <h3>{post.title}</h3>
    </div>
    <p className="home-list__description">{post.body}</p>
  </div>
)

const ListImg = ({ src }) => (
  <div className="pic">
    <Img src={src} loader={<Spinner />} />
  </div>
);


class Home extends Component {
  componentWillMount() {
    const { getLimitPosts } = this.props;
    getLimitPosts();
  }

  render() {
    const { postList, isLoading } = this.props;

    if (isLoading) return <Spinner />;
    return (
      <div className="home-list">
        {
          postList.map(post => (
            <section key={post.id} className="home-list__item">
              <Link to={`/posts/${post.id}`}>
                <ListImg src={post.pic} />
                <ListContent post={post} />
              </Link>
            </section>
          ))
        }
      </div>
    )
  }
}

export default withRouter(Home);
