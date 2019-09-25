import React, { Component } from 'react';
import Spinner from './../spinner/Spinner'
import './Post.scss'

class Post extends Component {
  state = {
    post: '',
  }
  componentDidMount() {
    const { id } = this.props;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          post: data,
        })
      })
  }

  handleBack = () => {
  }

  render() {
    const { post } = this.state;
    const { onChangePage } = this.props;
    return (
      <div className="article">
        <section class="article__body">
          {
            !post.title || !post.body ? <Spinner /> : (
              <>
                <h2 class="article__title show">{post.title}</h2>
                <p>{post.body}</p>
              </>
            )
          }

        </section>
        <button onClick={(e) => onChangePage(e, 'posts')}>Back</button>
      </div>
    )
  }
}

export default Post;
