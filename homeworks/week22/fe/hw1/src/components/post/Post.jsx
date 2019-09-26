import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner'
import axios from 'axios';

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
      !(post.title && post.body) ? <Spinner /> :
        (
          <section className="article">
            <h2 className="article__title show">{post.title}</h2>
            <div className="article__body">
              <p>{post.body}</p>
            </div>
            <Link className="btn active" to="/posts">Back</Link>
          </section>
        )
    )
  }
};

export default Post;
