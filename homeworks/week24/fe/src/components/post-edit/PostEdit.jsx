import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const PostEditBtn = ({ id }) => (
  <>
    <button type="submit" className="add-post__submit btn-submit">Submit</button>
    {id && <Link className="btn-back" to="/posts">Back</Link>}
  </>
);

class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
  }

  state = {
    author: '',
    title: '',
    body: '',
  }

  // 編輯文章頁面，把 store.post 當成 state 預設值
  componentWillMount() {
    if (this.id) {
      const { getPost, post } = this.props;
      getPost(this.id);
      this.setState(post);
    }
  }

  componentDidUpdate(prevProps) {
    const { history, isLoadingAddPost, isLoadingUpdatePost, addPostError, showMsg } = this.props;
    if (prevProps.isLoadingAddPost !== isLoadingAddPost && !isLoadingAddPost) {
      // if (addPostError) {
      //   showMsg('addPost', false);
      // }

      showMsg('addPost', true);
      history.push('/posts');
    }

    else if (prevProps.isLoadingUpdatePost !== isLoadingUpdatePost && !isLoadingUpdatePost) {
      // if (addPostError) {
      //   showMsg('addPost', false);
      // }

      showMsg('updatePost', true);
      history.push('/posts');
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history, addPost, updatePost, showMsg } = this.props;

    if (!this.id) {
      addPost(this.state, history, showMsg);
    } else {
      updatePost(this.id, this.state, history, showMsg);
    }
  }

  render() {
    const { author, title, body } = this.state;
    return (
      <section className="add-post">
        <h2>{this.id ? '編輯文章' : '新增文章'}</h2>

        <form onSubmit={this.handleSubmit}>
          <ul>
            <li className="add-post__author">
              <input type="text" name='author'
                defaultValue={author} onChange={this.handleChange} required />
              <label>文章作者</label>
            </li>
            <li className="add-post__title">
              <input type="text" name='title'
                defaultValue={title} onChange={this.handleChange} required />
              <label>文章標題</label>
            </li>
            <li className="add-post__content">
              <label>文章內容</label>
              <textarea className="input-textarea" cols="30" rows="5"
                name="body" onChange={this.handleChange}
                value={body} required></textarea>
            </li>
          </ul>
          <PostEditBtn id={this.id} />
        </form>
      </section>
    )
  }
};

export default PostEdit;