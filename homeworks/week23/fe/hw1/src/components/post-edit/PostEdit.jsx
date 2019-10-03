import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const PostEditBtn = ({ id }) => (
  <>
    <button type="submit" className="add-post__submit btn-submit">Submit</button>
    {id && <Link className="btn-back" to="/posts">Back</Link>}
  </>
);


const InputText = ({ value, type, label, onChange }) => {
  return (
    <>
      <input
        type="text"
        defaultValue={value}
        name={type}
        onChange={onChange}
        required />
      <label>{label}</label>
    </>
  )
}

class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.url = 'http://blog-api.yakim.tw/posts';
  }

  state = {
    author: '',
    title: '',
    body: '',
  }

  componentWillMount() {
    if (this.id) {
      axios.get(`${this.url}/${this.id}`)
        .then(res => {
          this.setState(res.data);
        })
    }
  }

  handleChange = e => {
    console.log(this.state);
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  sendRequest = () => {
    const { history } = this.props;

    if (this.id) {
      return axios({
        method: 'PUT',
        url: `${this.url}/${this.id}`,
        data: this.state,
      })
        .then((res) => {
          console.log(res);
          history.push(`/posts/${this.id}`);
        })
    }

    return axios.post(this.url, this.state)
      .then(() => {
        history.push('/posts');
      })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.sendRequest()
      .catch(error => {
        console.log(error);
        alert('失敗惹: ', error);
      });
  }

  render() {
    const { author, title, body } = this.state;
    return (
      <section className="add-post">
        <h2>{this.id ? '編輯文章' : '新增文章'}</h2>
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li className="add-post__author">
              <InputText type={'author'} value={author} label={'文章作者'}
                onChange={this.handleChange} />
            </li>
            <li className="add-post__title">
              <InputText type={'title'} value={title} label={'文章標題'}
                onChange={this.handleChange} />
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