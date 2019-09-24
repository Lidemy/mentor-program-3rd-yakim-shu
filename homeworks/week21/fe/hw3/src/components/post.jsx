import React, { Component } from 'react';

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

  render() {
    const { post } = this.state;
    return (
      <div className="article">
        <p>{post.body}</p>
      </div>
    )
  }
}

export default Post;
