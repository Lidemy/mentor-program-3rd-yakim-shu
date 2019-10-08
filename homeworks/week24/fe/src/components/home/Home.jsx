import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { getDate } from './../../utils';
import Spinner from '../spinner/Spinner';
import Img from 'react-image';

const ListContent = ({ item }) => (
  <div className="home-list__item-inner">
    <div className="home-list__title">
      <span>{getDate(item.createdAt)}</span>
      <h3>{item.title}</h3>
    </div>
    <p className="home-list__description"> {item.body} </p>
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
    return (
      <div className="home-list">
        {
          !isLoading && postList.map((item, id) => (
            <section key={id} className="home-list__item">
              <Link to={`/posts/${item.id}`}>
                <ListImg src={item.pic} />
                <ListContent item={item} />
              </Link>
            </section>
          ))
        }
      </div>
    )
  }
}

export default withRouter(Home);
