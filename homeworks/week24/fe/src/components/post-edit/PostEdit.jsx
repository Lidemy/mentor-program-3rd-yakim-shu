import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const PostEditBtn = ({ id }) => (
  <>
    <button type="submit" className="add-post__submit btn-submit">Submit</button>
    {id && <Link className="btn-back" to="/posts">Back</Link>}
  </>
);

const PostCategory = ({ category, handleChange, categoryList }) => (
  <select
    name='category'
    className='select'
    defaultValue={category}
    onChange={handleChange}>
    {
      categoryList.map((category, index) => (
        <option key={index} value={category}>{category}</option>
      ))
    }
  </select>
);

class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = {
      author: '',
      title: '',
      body: '',
      category: this.props.categoryList[0],
    }
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
    const {
      history,
      isLoadingAddPost,
      isLoadingUpdatePost,
      addPostError,
      updatePostError,
      showMsg
    } = this.props;

    // addPost
    if (prevProps.isLoadingAddPost !== isLoadingAddPost && !isLoadingAddPost) {
      if (addPostError) {
        showMsg('addPost', false);
        return;
      }

      showMsg('addPost', true);
      history.push('/posts');
    }

    // updatePost
    else if (prevProps.isLoadingUpdatePost !== isLoadingUpdatePost && !isLoadingUpdatePost) {
      if (updatePostError) {
        showMsg('updatePost', false);
        return;
      }

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
    const { addPost, updatePost } = this.props;

    if (!this.id) {
      addPost(this.state);
    } else {
      updatePost(this.state, this.id);
    }
  }

  render() {
    const { author, title, body, category } = this.state;
    const { categoryList } = this.props;
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
            <li className="add-post__category box">
              <label>分類：</label>
              <PostCategory
                category={category}
                handleChange={this.handleChange}
                categoryList={categoryList} />
            </li>
            <li className="add-post__content">
              <label className='theme--1'>文章內容</label>
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