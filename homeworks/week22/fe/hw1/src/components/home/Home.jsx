import React, { Component } from 'react';
import Spinner from '../spinner/Spinner';
import getHomeData from './home-list';

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
      <span>{item.date}</span>
      <h3>{item.title}</h3>
    </div>
    <p className="home-list__description"> {item.description} </p>
  </div>
)

class Home extends Component {
  state = getHomeData();

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
    return (
      <div className="home-list">
        {
          lists.map((item, id) => (
            <section key={id} className="home-list__item">
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

export default Home;
