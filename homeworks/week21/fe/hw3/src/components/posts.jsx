import React, { Component } from 'react';

class Posts extends Component {
  state = {
    postList: [],
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        this.setState({
          postList: data,
        })
      })
  }

  render() {
    const { postList } = this.state;
    const { handleChangePage } = this.props;

    return (
      <div className="posts">
        {
          postList.map(post => (
            <div className="post" key={post.id} data-id={post.id}>
              <a
                href="#"
                onClick={(e) => handleChangePage(e, 'post', post.id)}
                className="post-title"
              >
                {post.title}
              </a>
              <p className="post-description">{post.body}</p>
            </div>
          ))
        }
      </div>
    )
  }
}
export default Posts;
