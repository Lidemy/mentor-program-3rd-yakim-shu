import React, { Component } from 'react';
import Spinner from '../spinner/Spinner';
// import getHomeData from './home-list';
import { withRouter } from 'react-router-dom';
import getDate from './../../utils';
import axios from 'axios';

const ListImg = ({ item, handleLoad }) => (
  <div className="pic">
    {!item.isLoaded ? <Spinner /> : null}
    <img
      src={item.pic}
      className={`${item.isLoaded ? 'show' : ''}`}
      onLoad={handleLoad} alt="" />
  </div>
)

const ListContent = ({ item }) => (
  <div className="home-list__item-inner">
    <div className="home-list__title">
      <span>{getDate(item.createdAt)}</span>
      <h3>{item.title}</h3>
    </div>
    <p className="home-list__description"> {item.body} </p>
  </div>
)

class Home extends Component {
  state = {
    lists: []
  };

  componentDidMount() {
    axios.get('https://yakim-blog-api.herokuapp.com/posts?_limit=5')
      .then(res => {
        this.setState({
          lists: res.data,
        })
      })
  }

  handleImgLoad = (id) => {
    const { lists } = this.state;
    this.setState({
      lists: lists.map((item, index) => (id !== index ? item : {
        ...item,
        isLoaded: true,
      }))
    })
  }

  render() {
    const { lists } = this.state;
    const { history } = this.props;
    console.log(lists);
    return (
      <div className="home-list">
        {
          lists.map((item, id) => (
            <section
              key={id}
              className="home-list__item"
              onClick={() => {
                history.push('/posts/' + item.id)
              }}>
              <ListImg
                item={item}
                handleLoad={() => this.handleImgLoad(id)}
              />
              <ListContent item={item} />
            </section>
          ))
        }
      </div>
    )
  }
}

export default withRouter(Home);