import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner'
import axios from 'axios';
import getDate from './../../utils';

class Post extends Component {
  state = {
    post: {},
  }

  componentDidMount() {
    const postId = this.props.match.params.id;
    axios.get(`https://qootest.com/posts/${postId}`)
      .then(res => {
        this.setState({
          post: res.data,
        })
      })
  }

  render() {
    const { post } = this.state;
    return (
      <section className="article">
        <h2 className="article__title">{post.title}</h2>
        {
          !post.body ? <Spinner /> : (
            <div className="article__body">
              <p>{post.body}</p>
            </div>
          )
        }
        <div className="article__info">
          <p className="article__author">{post.author}</p>
          <p className="article__date">{getDate(post.createdAt)}</p>
        </div>
        <Link className="btn active" to="/posts">Back</Link>
      </section>
    )
  }
};

export default Post;
