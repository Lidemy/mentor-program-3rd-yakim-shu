import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner'
import axios from 'axios';
import getDate from '../../utils';
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";


const ArticleInfo = ({ post }) => (
  <div className="article__info">
    <p className="article__author">{post.author}</p>
    <p className="article__date">{getDate(post.createdAt)}</p>
  </div>
)

const ArticleOperate = ({ id, handleDelete }) => (
  <div className="article__operate">
    <Link className="btn btn-back active" to="/posts">Back</Link>
    <Link className="btn btn-edit" to={`/edit-post/${id}`}>Edit</Link>
    <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
  </div>
)

class Article extends Component {

  componentWillMount() {
    const { getPost } = this.props;
    const postId = this.props.match.params.id;
    getPost(postId);
  }

  handleDelete = () => {
    const { id } = this.state.post;
    const { history } = this.props;
    axios({
      method: 'delete',
      url: `http://blog-api.yakim.tw/posts/${id}`
    })
      .then(() => {
        history.push('/posts');
      })
      .catch(error => {
        alert('失敗惹: ', error);
      });
  }

  render() {
    const { post } = this.props;
    return (
      <section className="article">
        <h2 className="article__title">{post.title}</h2>
        {post.pic && (
          <div className="pic article__cover">
            <img src={post.pic} alt="" />
          </div>
        )}
        {!post.body ? <Spinner /> : (
          <div className="article__body">
            <ReactMarkdown
              source={post.body}
              renderers={{ code: CodeBlock }}
            />
          </div>
        )}
        <ArticleInfo post={post} />
        <ArticleOperate id={post.id} handleDelete={this.handleDelete} />
      </section>
    )
  }
};

export default Article;
